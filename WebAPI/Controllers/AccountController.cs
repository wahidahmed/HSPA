using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        public AccountController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration configuration)
        {

            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.configuration = configuration;
        }
        [HttpPost("login")]
        public async Task<IActionResult>Login(LoginReqDto loginReqDto)
        {
            var user =await unitOfWork.userRepository.Authenticate(loginReqDto.Username, loginReqDto.Password);

            var res = mapper.Map<LoginResDto>(user);
            res.Token = CreateJWT(user);
            if (user == null)
                return Unauthorized();
            return Ok(res);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginReqDto loginReqDto)
        {
            if(await unitOfWork.userRepository.UserAlreadyExists(loginReqDto.Username))
            {
                return BadRequest("User already exist");
            }
            unitOfWork.userRepository.Register(loginReqDto.Username, loginReqDto.Password);
            await unitOfWork.SaveAsync();
            return StatusCode(201);
        }


        public string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey) );
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

            var signingCredantials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires=DateTime.UtcNow.AddMinutes(1),
                SigningCredentials=signingCredantials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
