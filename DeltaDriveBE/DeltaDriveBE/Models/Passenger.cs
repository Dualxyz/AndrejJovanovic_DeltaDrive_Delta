namespace DeltaDriveBE.Models
{
    public class Passenger
    {
        //Core Fields
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Birthdate { get; set; } = string.Empty;

        //Additional fields?
        public List<Ride> Rides { get; set; } = default!;
    }
}
