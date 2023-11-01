using DeltaDriveBE.Models;

namespace DeltaDriveBE.Interfaces.Repository
{
    public interface IDriverRepository
    {
        public Driver? GetDriverById(Guid id);
        public Driver UpdateDriver(Driver driver);
    }
}
