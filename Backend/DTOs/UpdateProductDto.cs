using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class UpdateProductDto
    {
        [Range(0, double.MaxValue, ErrorMessage = "El precio no puede ser negativo")]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "El stock no puede ser negativo")]
        public int Stock { get; set; }
    }
}
