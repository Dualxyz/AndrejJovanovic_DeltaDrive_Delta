using DeltaDriveBE.DTO.AuthDTO;

namespace DeltaDriveBE.Interfaces
{
    public interface IPassangerService
    {
        LoginPassangerResponseDTO LoginUser(LoginPassangerRequestDTO requestDTO);
        RegisterPassangerResponseDTO RegisterUser(RegisterPassangerRequestDTO requestDTO);
    }
}
