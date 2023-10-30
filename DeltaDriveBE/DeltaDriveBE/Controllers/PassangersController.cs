using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDriveBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassangersController : ControllerBase
    {
        private readonly IPassangerService _passangerService;

        public PassangersController(IPassangerService passangerService)
        {
            _passangerService = passangerService;
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginPassangerRequestDTO req)
        {
            LoginPassangerResponseDTO resp;

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
        public IActionResult RegisterPassanger([FromBody] RegisterPassangerRequestDTO user)
        {
            RegisterPassangerResponseDTO userResponse;

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
    }
}
