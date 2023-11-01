using DeltaDriveBE.Enums;

namespace DeltaDriveBE.Models
{
    public class Ride
    {
        //public Guid Id { get; set; }
        //public Guid DriverId { get; set; }
        //public Driver? Driver { get; set; }
        //public Guid PassengerId { get; set; }
        //public Passenger? Passenger { get; set; }

        //public VehicleStatus VehicleStatus { get; set; } = Enums.VehicleStatus.PENDING;

        //public int Ocena {  get; set; }
        public Guid Id { get; set; }
        public Guid DriverId { get; set; }
        public Driver Driver { get; set; } = default!;
        public Guid PassengerId { get; set; }
        public Passenger Passenger { get; set; } = default!;
        public RideStatus RideStatus { get; set; } = RideStatus.Pending;
        public double StartLatitude { get; set; }
        public double StartLongitude { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public double TotalPrice { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; }

    }
}
