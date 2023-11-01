using DeltaDriveBE.DTO.RideDTO;
using DeltaDriveBE.Infrastructure;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;
using Microsoft.EntityFrameworkCore;

namespace DeltaDriveBE.Repository
{
    public class RideRepository : IRideRepository
    {
        private readonly APIDBContext _dbContext;

        public RideRepository(APIDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Ride? GetRideById(Guid id)
        {
            return _dbContext.Rides.Find(id);
        }

        public Ride CreateRide(Ride ride)
        {
            try
            {
                _dbContext.Rides.Add(ride);
                _dbContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return ride;
        }

        public Ride UpdateRide(Ride ride)
        {
            try
            {
                _dbContext.Entry(ride).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return ride;
        }

        public List<Ride>? GetDriverRating(Guid id)
        {
            string query = $@"
                SELECT *
                FROM dbo.Rides
                WHERE DriverId = '{id}';
            ";
            List<Ride>? result = _dbContext.Rides.FromSqlRaw(query).ToList();
            return result;
        }
    }
}
