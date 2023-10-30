using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDriveBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly IPassengerService _passangerService;

        public PassengersController(IPassengerService passangerService)
        {
            _passangerService = passangerService;
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginPassengerRequestDTO req)
        {
            LoginPassengerResponseDTO resp;

            try
            {
                resp = _passangerService.LoginUser(req);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(resp);
        }

        [HttpPost("Register")]
        public IActionResult RegisterPassanger([FromBody] RegisterPassengerRequestDTO user)
        {
            RegisterPassengerResponseDTO userResponse;

            try
            {
                userResponse = _passangerService.RegisterUser(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(userResponse);
        }

        [HttpGet("NearbyDrivers")]
        public IActionResult GetNearbyDrivers()
        {
            string userResponse = "";
            try
            {
                userResponse = _passangerService.GetClosestDrivers(10, 45.2164541400741f, 19.848281178208f);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(userResponse);
        }
    }
}
