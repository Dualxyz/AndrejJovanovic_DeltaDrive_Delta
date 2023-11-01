namespace DeltaDriveBE.DTO.RideDTO
{
    public class BookRideRequestDTO
    {
        //public Guid PassengerId { get; set; }
        public Guid DriverId { get; set; }
        public double StartLatitude { get; set; }
        public double StartLongitude { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
    }
}
