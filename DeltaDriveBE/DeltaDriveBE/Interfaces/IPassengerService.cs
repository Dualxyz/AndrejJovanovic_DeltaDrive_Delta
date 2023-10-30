using DeltaDriveBE.DTO.AuthDTO;

namespace DeltaDriveBE.Interfaces
{
    public interface IPassengerService
    {
        LoginPassengerResponseDTO LoginUser(LoginPassengerRequestDTO requestDTO);
        RegisterPassengerResponseDTO RegisterUser(RegisterPassengerRequestDTO requestDTO);
    }
}
