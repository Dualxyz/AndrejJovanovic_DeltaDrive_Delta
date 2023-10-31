using DeltaDriveBE.DTO.AuthDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDriveBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        //[HttpPost]
        //[Authorize]
        //U DTO -> ID Vozaca i Passenger ID
        //public IActionResult BookRide([FromBody] LoginPassengerRequestDTO req)
        //{
        //    //long userId = long.Parse(User.Claims.FirstOrDefault(x => x.Type == "Id").Value);
        //    LoginPassengerResponseDTO resp;

        //    try
        //    {
        //        resp = _passangerService.LoginUser(req);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //    return Ok(resp);
        //}

        //public IActionResult RateRide([FromBody] LoginPassengerRequestDTO req)
        //{

        //}
    }
}
