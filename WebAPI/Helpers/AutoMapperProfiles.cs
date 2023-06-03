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
            CreateMap<Property, PropertyListDto>()
                .ForMember(x=>x.City,opt=>opt.MapFrom(x=>x.City.Name))
                .ForMember(x=>x.FurnishingType,opt=>opt.MapFrom(x=>x.FurnishingType.Name))
                .ForMember(x => x.PropertyType, opt => opt.MapFrom(x => x.PropertyType.Name));
            //CreateMap<CityDto, City>();
        }
    }
}
