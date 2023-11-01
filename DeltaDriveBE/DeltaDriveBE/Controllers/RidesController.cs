using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.DTO.RideDTO;
using DeltaDriveBE.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDriveBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        private readonly IRideService _rideService;

        public RidesController(IRideService rideService)
        {
            _rideService = rideService;
        }

        [HttpPost]
        [Authorize]
        //U DTO -> ID Vozaca i Passenger ID
        public IActionResult BookRide([FromBody] BookRideRequestDTO req)
        {
            Guid passengerId = Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
            BookRideResponseDTO resp;

            try
            {
                resp = _rideService.BookRide(req, passengerId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(resp);
        }

        //public IActionResult RateRide([FromBody] LoginPassengerRequestDTO req)
        //{

        //}
    }
}
