using DeltaDriveBE.DTO.RideDTO;

namespace DeltaDriveBE.Interfaces
{
    public interface IRideService
    {
        BookRideResponseDTO BookRide(BookRideRequestDTO request, Guid id);
        RateRideResponseDTO RateRide(Guid rideId, RateRideRequestDTO request);
    }
}
