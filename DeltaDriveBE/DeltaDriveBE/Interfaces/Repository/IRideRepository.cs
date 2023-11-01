using DeltaDriveBE.DTO.RideDTO;

namespace DeltaDriveBE.Interfaces.Repository
{
    public interface IRideRepository
    {
        bool AddRide(BookRideRequestDTO req, Guid id);
    }
}
