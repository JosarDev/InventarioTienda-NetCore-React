using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class GenerateDescriptionController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public GenerateDescriptionController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost("generate-description")]
        public async Task<ActionResult<GenerateDescriptionResponseDto>> GenerateDescription([FromBody] GenerateDescriptionRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest("El nombre del producto es requerido");

            var apiKey = _configuration["Gemini:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
                return StatusCode(500, "API Key de Gemini no configurada");

            var prompt = $"Escribe una descripción atractiva y comercial para un producto de tienda llamado '{request.Name}'. " +
                         "Máximo 2 párrafos, lenguaje persuasivo, enfocado en beneficios y emociones. " +
                         "Ideal para venta online. Responde SOLO la descripción, sin títulos ni introducciones.";

            var requestBody = new
            {
                contents = new[]
                {
                    new { role = "user", parts = new[] { new { text = prompt } } }
                },
                generationConfig = new
                {
                    temperature = 0.9,
                    maxOutputTokens = 250
                }
            };

            var jsonContent = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}";

            try
            {
                var response = await _httpClient.PostAsync(url, content);

                if (!response.IsSuccessStatusCode)
                    return StatusCode((int)response.StatusCode, "Error al contactar con Gemini");

                var responseText = await response.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(responseText);
                var generatedText = doc.RootElement
                    .GetProperty("candidates")[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();

                return Ok(new GenerateDescriptionResponseDto
                {
                    Description = generatedText?.Trim() ?? "No se pudo generar la descripción."
                });
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno al generar descripción con IA");
            }
        }
    }
}