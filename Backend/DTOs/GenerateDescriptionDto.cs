namespace Backend.DTOs
{
    public class GenerateDescriptionRequestDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class GenerateDescriptionResponseDto
    {
        public string Description { get; set; } = string.Empty;
    }
}