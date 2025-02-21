using Microsoft.AspNetCore.Mvc;

namespace Aceoffix7_NetcoreWebApI_Simple.Controllers
{
    [ApiController]
    [Route("/index")]
    public class IndexController : Controller
    {
        public String Index()
        {
            return "hello";
        }
    }
}
