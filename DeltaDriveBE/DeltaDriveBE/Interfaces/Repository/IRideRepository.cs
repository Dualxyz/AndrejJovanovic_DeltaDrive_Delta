using DeltaDriveBE.Models;

namespace DeltaDriveBE.Interfaces.Repository
{
    public interface IRideRepository
    {
        public Ride? GetRideById(Guid id);
        public List<Ride>? GetDriverRating(Guid id);
        public Ride CreateRide(Ride ride);
        public Ride UpdateRide(Ride ride);
    }
}
