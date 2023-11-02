namespace DeltaDriveBE.DTO.PassengerDTO
{
    public class PassengerResponseDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public DateTime Birthday { get; set; }
        //public List<Ride> RideHistory { get; set; } = default!;
    }
}
