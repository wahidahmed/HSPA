﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
   public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCities();
        void AddCity(City city);
        void DeleteCity(int id);

        Task<bool> SaveAsync();
    }
}
