namespace DeltaDriveBE.DTO.AuthDTO
{
    public class LoginPassengerResponseDTO
    {
        public Guid Id { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
