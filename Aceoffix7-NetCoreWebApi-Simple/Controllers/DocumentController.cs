using AceoffixNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Aceoffix7_NetcoreWebApI_Simple.Controllers
{
    [ApiController]
    [Route("/doc")]
    public class DocumentController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DocumentController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("openFile")]
        public async Task<IActionResult> OpenFile([FromBody] Dictionary<string, object> requestParams)
        {
            if (string.IsNullOrEmpty(requestParams["file_name"]?.ToString()))
            {
                return BadRequest("file_name is required.");
            }
            else
            {
                string filePath = _webHostEnvironment.WebRootPath + "\\doc\\" + requestParams["file_name"]?.ToString();
                AceoffixNetCore.AceoffixCtrl aceCtrl = new AceoffixNetCore.AceoffixCtrl(Request);
            aceCtrl.WebOpen(filePath, OpenModeType.docNormalEdit, "Luna");
            string html = aceCtrl.GetHtml();
            return Ok(html);
        }
     
        }
        [HttpPost("saveFile")]
        public async Task<ActionResult> saveFile([FromQuery] string file_name)
        {
            try
            {
                if (string.IsNullOrEmpty(file_name))
                {
                    return BadRequest("file_name is required.");
                }
                AceoffixNetCore.FileSaver fs = new AceoffixNetCore.FileSaver(Request, Response);
                await fs.LoadAsync();
                string webRootPath = _webHostEnvironment.WebRootPath;
                fs.SaveToFile(webRootPath + "\\doc\\" + file_name);
                return fs.Close();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}