using DeltaDriveBE.Infrastructure;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;

namespace DeltaDriveBE.Repository
{
    public class PassangerRepository : IPassangerRepository
    {
        private readonly APIDBContext _dbContext;

        public PassangerRepository(APIDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Passanger? AddPassanger(Passanger passanger)
        {
            _dbContext.Passangers.Add(passanger);
            _dbContext.SaveChanges();
            return passanger;
        }
    }
}
