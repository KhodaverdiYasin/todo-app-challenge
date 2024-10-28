using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The Name field is required.")]
        public string Name { get; set; } = string.Empty;
        public bool IsComplete { get; set; }
    }
}
