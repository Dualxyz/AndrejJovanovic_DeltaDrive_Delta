namespace DeltaDriveBE.DTO.AuthDTO
{
    public class RegisterPassangerRequestDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Birthdate { get; set; } = string.Empty;
    }
}
