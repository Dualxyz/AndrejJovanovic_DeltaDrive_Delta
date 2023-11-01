using DeltaDriveBE.DTO.RideDTO;
using DeltaDriveBE.Interfaces;
using DeltaDriveBE.Interfaces.Repository;

namespace DeltaDriveBE.Services
{
    public class RideService : IRideService
    {
        private readonly IRideRepository _rideRepository;

        public RideService(IRideRepository rideRepository)
        {
            _rideRepository = rideRepository;
        }

        public BookRideResponseDTO BookRide(BookRideRequestDTO request, Guid id)
        {

            throw new NotImplementedException();
        }

        public RateRideResponseDTO RateRide(RateRideRequestDTO request)
        {
            throw new NotImplementedException();
        }
    }
}
