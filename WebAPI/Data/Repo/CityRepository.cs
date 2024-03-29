﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dc;

        public CityRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.AddAsync(city);
        }

        public void DeleteCity(int id)
        {
            var city = dc.Cities.Find(id);
            dc.Cities.Remove(city);
        }

        public async Task<City> FindCityAsync(int id)
        {
            return await dc.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            var city =await dc.Cities.ToListAsync();
            return city;
        }

    }
}
