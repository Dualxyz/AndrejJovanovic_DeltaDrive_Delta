using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.DTO.PassengerDTO;
using DeltaDriveBE.Infrastructure;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace DeltaDriveBE.Repository
{

    public class PassengerRepository : IPassengerRepository
    {
        private readonly APIDBContext _dbContext;

        public PassengerRepository(APIDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Passenger? AddPassanger(Passenger passanger)
        {
            _dbContext.Passangers.Add(passanger);
            _dbContext.SaveChanges();
            return passanger;
        }

        public Passenger? FindPassenger(LoginPassengerRequestDTO passenger)
        {
            //return _dbContext.Passangers.Include(x => x.Rides).FirstOrDefault(u => u.Email == passenger.Email);
            return _dbContext.Passangers.FirstOrDefault(u => u.Email == passenger.Email);
        }

        public Passenger? FindPassengerById(Guid id)
        {
            return _dbContext.Passangers.Find(id);
        }

        public List<Driver>? GetDrivers(int amount, float latitude, float longitude)
        {
            //throw new NotImplementedException();
            string query = $@"
        DECLARE @targetLocation geography;
        SET @targetLocation = geography::Point({latitude}, {longitude}, 4326);
        
        SELECT TOP {amount}
            Id,
            Brand,
            FirstName,
            LastName,
            Latitude,
            Longitude,
            StartPrice,
            PricePerKm
        FROM dbo.Drivers
        ORDER BY @targetLocation.STDistance(geography::Point(Latitude, Longitude, 4326))";
            var result = _dbContext.Drivers.FromSqlRaw(query).ToList();
            return result;
        }
    }
}
