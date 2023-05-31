using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Name is mandatory")]
        [RegularExpression(".*[a-zA-Z]+.*",ErrorMessage ="Numaric is not allowed")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Country is mandatory")]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Numaric is not allowed")]
        public string Country { get; set; }
    }
}
