using AutoMapper;
using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.Exceptions;
using DeltaDriveBE.Interfaces;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Models;
using EntityFramework.Exceptions.Common;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DeltaDriveBE.Services
{
    public class PassengerService : IPassengerService
    {
        private readonly IPassengerRepository _passangerRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IConfigurationSection _secretKey;

        public PassengerService(IConfiguration config,IPassengerRepository passangerRepository, IMapper mapper, IConfiguration configuration)
        {
            _passangerRepository = passangerRepository;
            _mapper = mapper;
            _configuration = configuration;
            _secretKey = config.GetSection("secret");
        }

        public string GetClosestDrivers(int amount, float latitude, float longitude)
        {
            List<Driver>? nearbyDrivers = _passangerRepository.GetDrivers(amount, latitude, longitude);
            string json = JsonConvert.SerializeObject(nearbyDrivers);
            return json;
        }

        public LoginPassengerResponseDTO LoginUser(LoginPassengerRequestDTO requestDTO)
        {
            Passenger? user = _passangerRepository.FindPassenger(requestDTO);
            if (user == null)
            {
                throw new InvalidCredentialsException("Incorrect login credentials");
            }

            if (!BCrypt.Net.BCrypt.Verify(requestDTO.Password, user.Password))
            {
                throw new InvalidCredentialsException("Incorrect login credentials");
            }

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("Id", user.Id.ToString()));
            //claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));

            //if (user.VerificationStatus == VerificationStatus.Accepted && user.Role == UserRole.Seller)
            //{
            //    claims.Add(new Claim("VerificationStatus", user.VerificationStatus.ToString()));
            //}

            string? secretKeyValue = _secretKey.Value;
            if (secretKeyValue == null)
            {
                throw new Exception("Secret key is not set properly");
            }

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKeyValue));
            SigningCredentials signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken securityToken = new JwtSecurityToken(
                issuer: "http://localhost:44319",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signingCredentials
            );

            LoginPassengerResponseDTO responseDto = new LoginPassengerResponseDTO()
            {
                Id = user.Id,
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken)
            };

            return responseDto;
        }

        public RegisterPassengerResponseDTO RegisterUser(RegisterPassengerRequestDTO requestDTO)
        {
            Passenger passenger = _mapper.Map<Passenger>(requestDTO);
            //hash the pw with bcrypt
            passenger.Password = BCrypt.Net.BCrypt.HashPassword(passenger.Password, BCrypt.Net.BCrypt.GenerateSalt());

            if (string.IsNullOrWhiteSpace(passenger.FirstName) || string.IsNullOrWhiteSpace(passenger.LastName) ||
                string.IsNullOrWhiteSpace(passenger.Email) || string.IsNullOrWhiteSpace(passenger.Password) ||
                string.IsNullOrWhiteSpace(passenger.Birthdate))
            {
                throw new InvalidFieldsException("One of more fields are missing");
            }

            try
            {
                _passangerRepository.AddPassanger(passenger);
            }
            catch (UniqueConstraintException)
            {
                throw new InvalidCredentialsException("User with specified username and/or email already exists!");
            }
            catch (Exception)
            {
                throw; //new Exception(ex.InnerException?.Message);
            }

            return _mapper.Map<RegisterPassengerResponseDTO>(passenger);
        }
    }
}
