// Services/TodoService.cs
using TodoApi.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Services
{
    public class TodoService : ITodoService
    {
        private readonly ApplicationDbContext _context;

        public TodoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TodoItem>> GetAllTodosAsync(string search)
        {
            IQueryable<TodoItem> query = _context.TodoItems;

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(t => t.Name.ToLower().Contains(search.ToLower()));
            }

            return await query.ToListAsync();
        }

        public async Task<TodoItem?> GetTodoByIdAsync(int id)
        {
            return await _context.TodoItems.FindAsync(id);
        }

        public async Task<TodoItem> AddTodoAsync(TodoItem item)
        {
            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task UpdateTodoAsync(int id, TodoUpdate item)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                throw new KeyNotFoundException($"No todo item found with ID {id}.");
            }

            todoItem.IsComplete = item.IsComplete;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public async Task DeleteTodoAsync(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem != null)
            {
                _context.TodoItems.Remove(todoItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
