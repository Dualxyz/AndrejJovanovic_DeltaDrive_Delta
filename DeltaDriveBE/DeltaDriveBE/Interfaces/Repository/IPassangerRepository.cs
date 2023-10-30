using DeltaDriveBE.Models;

namespace DeltaDriveBE.Interfaces.Repository
{
    public interface IPassangerRepository
    {
        Passanger? AddPassanger(Passanger passangers);
    }
}
