using DeltaDriveBE.DTO.RideDTO;
using DeltaDriveBE.Models;

namespace DeltaDriveBE.Interfaces
{
    public interface IRideService
    {
        BookRideResponseDTO BookRide(BookRideRequestDTO request, Guid id);
        RateRideResponseDTO RateRide(Guid rideId, RateRideRequestDTO request);
        string GetHistory(Guid id);
    }
}
