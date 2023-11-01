using DeltaDriveBE.Enums;

namespace DeltaDriveBE.Models
{
    public class Ride
    {
        public Guid Id { get; set; }
        public Guid DriverId { get; set; }
        public Driver? Driver { get; set; }
        public Guid PassengerId { get; set; }
        public Passenger? Passenger { get; set; }

        public VehicleStatus VehicleStatus { get; set; } = Enums.VehicleStatus.PENDING;

        public int Ocena {  get; set; }

    }
}
