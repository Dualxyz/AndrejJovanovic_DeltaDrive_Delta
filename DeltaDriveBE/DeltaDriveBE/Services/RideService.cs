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
using Newtonsoft.Json;

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

        private static double CalculateDistance(Ride ride)
        {
            const double earthRadius = 6371; // Earth's radius in kilometers

            // Convert latitude and longitude from degrees to radians
            double startLatRad = ToRadians(ride.StartLatitude);
            double startLonRad = ToRadians(ride.StartLongitude);
            double destLatRad = ToRadians(ride.DestinationLatitude);
            double destLonRad = ToRadians(ride.DestinationLongitude);

            // Calculate the differences between latitudes and longitudes
            double latDiff = destLatRad - startLatRad;
            double lonDiff = destLonRad - startLonRad;

            // Calculate the Haversine formula
            double a = Math.Sin(latDiff / 2) * Math.Sin(latDiff / 2) +
                       Math.Cos(startLatRad) * Math.Cos(destLatRad) *
                       Math.Sin(lonDiff / 2) * Math.Sin(lonDiff / 2);
            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            // Calculate the distance
            double distance = earthRadius * c;

            return distance;
        }
        private static double ToRadians(double degrees)
        {
            return degrees * (Math.PI / 180);
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
            double distanceInKm = CalculateDistance(ride);

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

        public string GetHistory(Guid id)
        {
            List<Ride>? userHistory = _rideRepository.GetHistoryById(id);
            if (userHistory != null && userHistory.Count > 0)
            {
                //double? averageRating = (double?)userHistory.Sum(rating => rating.Rating) / userHistory.Count;
                string json = JsonConvert.SerializeObject(new { userHistory = userHistory });
                return json;
            }
            else
            {
                return string.Empty;
            }
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
