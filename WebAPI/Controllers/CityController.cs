using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        //api/City
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            return Ok("");
        }


        //api/City/Add/rajshari
        //[HttpPost("Add/{cityName}")]

        //api/City/Add?cityName=rajshari
        [HttpPost("Add")]
        public async Task<IActionResult> Add(string cityName)
        {
            return Ok("");
        }

        //api/City/post
        [HttpPost("post")]
        public async Task<IActionResult> Add(City city)
        {
            return Ok("");
        }
        //api/City/delete/1
        [HttpDelete("delete/{}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok("");
        }
    }
}
