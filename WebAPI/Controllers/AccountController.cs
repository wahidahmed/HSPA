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
using WebAPI.Errors;
using WebAPI.Extensions;
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
            ApiError apiError = new ApiError();
            var user =await unitOfWork.UserRepository.Authenticate(loginReqDto.Username, loginReqDto.Password);
            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid username or password";
                apiError.ErrorDetails = "This error apear when provided user id and password does not exist";
                return Unauthorized(apiError);
            }
            var res = mapper.Map<LoginResDto>(user);
            res.Token = CreateJWT(user);
           
            return Ok(res);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginReqDto loginReqDto)
        {
            ApiError apiError = new ApiError();
            //here IsEmpty is an extention method. we create this method to use instead of string.IsNullOfEmpty
            if (loginReqDto.Username.IsEmpty()||loginReqDto.Password.IsEmpty())
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "username and password cannot be blank";
                return BadRequest(apiError);
            }
            if(await unitOfWork.UserRepository.UserAlreadyExists(loginReqDto.Username))
            {
              
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Invalid username or password";
                return BadRequest(apiError);
            }
            unitOfWork.UserRepository.Register(loginReqDto.Username, loginReqDto.Password);
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
                Expires=DateTime.UtcNow.AddHours(1),
                SigningCredentials=signingCredantials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
