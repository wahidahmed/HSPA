using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data.Repo;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        //api/City
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            //throw new UnauthorizedAccessException();
            var cities = await unitOfWork.CityRepository.GetCitiesAsync();
            var cityDto = mapper.Map<IEnumerable<CityDto>>(cities);
            //var cityDto = from c in cities
            //              select new CityDto()
            //              {
            //                  Id = c.Id,
            //                  Name = c.Name
            //              };
            return Ok(cityDto);
        }


        //api/City/Add/rajshari
        //[HttpPost("Add/{cityName}")]

        //api/City/Add?cityName=rajshari
        [HttpPost("Add")]
        public async Task<IActionResult> Add(string cityName)
        {
            return StatusCode(201);
        }

        //api/City/post
        [HttpPost("post")]
        public async Task<IActionResult> Add(CityDto city)
        {
            var data = mapper.Map<City>(city);
            data.LastUpdatedBy = 1;
            data.LastUpdatedOn = DateTime.Now;
            unitOfWork.CityRepository.AddCity(data);
            await unitOfWork.SaveAsync();
            return StatusCode(201);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,CityDto cityDto)
        {
            if (id != cityDto.Id)
                return BadRequest("update is not allowed");
            var city = await unitOfWork.CityRepository.FindCityAsync(id);
            if (city == null)
                return BadRequest("update is not allowed");
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
             mapper.Map(cityDto,city);
            await unitOfWork.SaveAsync();
            return StatusCode(201);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Patch(int id,JsonPatchDocument<City> cityPatch)
        {
            var city = await unitOfWork.CityRepository.FindCityAsync(id);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            cityPatch.ApplyTo(city,ModelState);
            await unitOfWork.SaveAsync();
            return StatusCode(201);
        }
        //api/City/delete/1
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok("");
        }
    }
}
