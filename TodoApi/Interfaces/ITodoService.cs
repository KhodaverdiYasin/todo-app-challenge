using TodoApi.Models;

namespace TodoApi.Services
{
    public interface ITodoService
    {
        Task<List<TodoItem>> GetAllTodosAsync(string search);
        Task<TodoItem?> GetTodoByIdAsync(int id);
        Task<TodoItem> AddTodoAsync(TodoItem item);
        Task UpdateTodoAsync(int id, TodoUpdate item);
        Task PatchTodoAsync(int id, TodoItem item);
        Task DeleteTodoAsync(int id);
    }
}
