using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET: api/products
        // =========================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products
                .Where(p => p.IsActive)
                .ToListAsync();

            return Ok(products);
        }

        // =========================
        // GET: api/products/{id}
        // =========================
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null || !product.IsActive)
                return NotFound("Producto no encontrado");

            return Ok(product);
        }

        // =========================
        // POST: api/products
        // =========================
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            if (product.Price < 0 || product.Stock < 0)
                return BadRequest("Precio y stock no pueden ser negativos");

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetProduct),
                new { id = product.Id },
                product
            );
        }

        // =========================
        // PUT: api/products/{id}
        // =========================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, UpdateProductDto dto)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null || !product.IsActive)
                return NotFound("Producto no encontrado");

            product.Price = dto.Price;
            product.Stock = dto.Stock;

            await _context.SaveChangesAsync();

            return Ok(product);
        }

        // =========================
        // DELETE: api/products/{id}
        // (Eliminación lógica)
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null || !product.IsActive)
                return NotFound();

            product.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}