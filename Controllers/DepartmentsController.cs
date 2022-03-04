using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace IngresosNutreesaPantallasV2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentsController : Controller
    {
        public static Dictionary<int, string> Departments =
            new Dictionary<int, string>()
            {
                {1, "Bogotá - COLCAFÉ"},
                {2, "Medellín - NUTRESA"},
                {3, "Barranquilla - COLCAFÉ"}
            };
        
        // GET
        [HttpGet]
        public List<KeyValuePair<int, string>> Get()
        {
            return Departments.ToList();
        }
    }
}