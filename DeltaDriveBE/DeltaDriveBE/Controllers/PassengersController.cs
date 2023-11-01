using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.DTO.PassengerDTO;
using DeltaDriveBE.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDriveBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly static int AMOUNT_OF_NEARBY_DRIVERS = 10;
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

        [HttpPost("NearbyDrivers")]
        [Authorize]
        public IActionResult GetNearbyDrivers([FromBody] GetNearbyDriversRequestDTO requestDTO)
        {
            string userResponse;
            try
            {
                userResponse = _passangerService.GetClosestDrivers(AMOUNT_OF_NEARBY_DRIVERS, requestDTO.Latitude, requestDTO.Longitude);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Content(userResponse, "application/json");
        }

        [HttpGet("GetDriverRating/{id}")]
        public IActionResult GetDriverRating(Guid id)
        {
            string userResponse;
            try
            {
                userResponse = _passangerService.GetDriverRating(id);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Content(userResponse, "application/json");
        }
    }
}
