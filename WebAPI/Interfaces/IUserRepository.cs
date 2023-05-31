﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string username,string passwod);

        void Register(string username, string password);
        Task<bool> UserAlreadyExists(string username);
    }
}
