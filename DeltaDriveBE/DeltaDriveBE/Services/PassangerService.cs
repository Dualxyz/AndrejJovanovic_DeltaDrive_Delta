using AutoMapper;
using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.Interfaces;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;

namespace DeltaDriveBE.Services
{
    public class PassangerService : IPassangerService
    {
        private readonly IPassangerRepository _passangerRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public PassangerService(IPassangerRepository passangerRepository, IMapper mapper, IConfiguration configuration)
        {
            _passangerRepository = passangerRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public LoginPassangerResponseDTO LoginUser(LoginPassangerRequestDTO requestDTO)
        {
            throw new NotImplementedException();
        }

        public RegisterPassangerResponseDTO RegisterUser(RegisterPassangerRequestDTO requestDTO)
        {
            Passanger passanger = _mapper.Map<Passanger>(requestDTO);
            //hash the pw with bcrypt

            try
            {
                _passangerRepository.AddPassanger(passanger);
            } catch(Exception ex)
            {
                throw new Exception(ex.InnerException?.Message);
            }

            return _mapper.Map<RegisterPassangerResponseDTO>(passanger);
        }
    }
}
