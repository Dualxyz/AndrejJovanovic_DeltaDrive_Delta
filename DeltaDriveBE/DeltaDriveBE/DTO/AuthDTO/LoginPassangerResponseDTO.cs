namespace DeltaDriveBE.DTO.AuthDTO
{
    public class LoginPassangerResponseDTO
    {
        public Guid Id { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
