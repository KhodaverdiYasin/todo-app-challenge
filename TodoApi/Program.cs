using TodoApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TodoApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register your TodoService
builder.Services.AddScoped<ITodoService, TodoService>();

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", policy =>
{
    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Urls.Add("http://localhost:5000");

app.Run();
