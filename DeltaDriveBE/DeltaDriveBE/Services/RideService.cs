using AutoMapper;
using DeltaDriveBE.DTO.RideDTO;
using DeltaDriveBE.Enums;
using DeltaDriveBE.Exceptions;
using DeltaDriveBE.Interfaces;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;
using System.Configuration;
using FluentValidation;
using FluentValidation.Results;

namespace DeltaDriveBE.Services
{
    public class RideService : IRideService
    {
        private readonly IRideRepository _rideRepository;
        private readonly IDriverRepository _driverRepository;
        private readonly IValidator<Ride> _validator;
        private readonly IMapper _mapper;


        public RideService(IRideRepository rideRepository, IDriverRepository driverRepository, IValidator<Ride> validator, IMapper mapper)
        {
            _rideRepository = rideRepository;
            _driverRepository = driverRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public BookRideResponseDTO BookRide(BookRideRequestDTO requestDto, Guid id)
        {

            Ride ride = _mapper.Map<Ride>(requestDto);
            ride.PassengerId = id;

            ValidationResult validationResult = _validator.Validate(ride);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            // Check if driver with specified driverId exists
            Driver? driver = _driverRepository.GetDriverById(ride.DriverId);

            if (driver == null)
            {
                throw new ResourceNotFoundException("Driver with specified id doesn't exist");
            }

            // TODO - Calculate distance in km between start and destination
            double distanceInKm = 0;

            // Calculate total price based on distance and prices of driver
            ride.TotalPrice = driver.StartPrice + driver.PricePerKm * distanceInKm;

            // Set random ride status
            Random random = new Random();
            int randomNumber = random.Next(100);
            ride.RideStatus = randomNumber < 25 ? RideStatus.Rejected : RideStatus.Accepted;

            try
            {
                ride = _rideRepository.CreateRide(ride);
            }
            catch (Exception ex)
            {
                throw;
            }


            return _mapper.Map<BookRideResponseDTO>(ride);
        }

        public RateRideResponseDTO RateRide(Guid rideId, RateRideRequestDTO requestDto)
        {
            Ride? existingRide = _rideRepository.GetRideById(rideId);

            // Check if ride exists
            if (existingRide == null)
            {
                throw new ResourceNotFoundException("Ride with specified id doesn't exist");
            }

            Ride updatedRide = _mapper.Map<Ride>(requestDto);

            ValidationResult validationResult = _validator.Validate(updatedRide, options =>
            {
                options.IncludeRuleSets("RatingRuleSet");
            });

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            existingRide.Rating = updatedRide.Rating;
            existingRide.Comment = updatedRide.Comment;

            try
            {
                existingRide = _rideRepository.UpdateRide(existingRide);
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<RateRideResponseDTO>(existingRide);
        }
    }
}
