using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<User, LoginReqDto>().ReverseMap();
            CreateMap<User, LoginResDto>().ReverseMap();
            //CreateMap<CityDto, City>();
        }
    }
}
