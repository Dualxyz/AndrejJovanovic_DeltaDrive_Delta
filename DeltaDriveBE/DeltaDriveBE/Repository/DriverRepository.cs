using DeltaDriveBE.Infrastructure;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;
using Microsoft.EntityFrameworkCore;

namespace DeltaDriveBE.Repository
{
    public class DriverRepository : IDriverRepository
    {
        private readonly APIDBContext _dbContext;

        public DriverRepository(APIDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Driver? GetDriverById(Guid id)
        {
            return _dbContext.Drivers.Include(x => x.RideHistory).FirstOrDefault(x => x.Id == id);
        }

        public Driver UpdateDriver(Driver driver)
        {
            try
            {
                _dbContext.Entry(driver).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return driver;
        }
    }
}
