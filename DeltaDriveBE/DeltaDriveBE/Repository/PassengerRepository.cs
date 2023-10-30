using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.Infrastructure;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;

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
            return _dbContext.Passangers.FirstOrDefault(u => u.Email == passenger.Email);
        }
    }
}
