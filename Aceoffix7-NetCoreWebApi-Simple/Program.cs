using AceoffixNetCore.AceServer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//Aceoffix Configuration
builder.Services.AddAceoffixAcewServer();//Available starting from Aceoffix v7.3.1.1

var app = builder.Build();

//Aceoffix Configure
//Note: These two lines of code must be placed before app.UseRouting(). 
app.UseAceoffixAcewServer();
app.UseMiddleware<ServerHandlerMiddleware>();////Available starting from Aceoffix v7.3.1.1

app.UseHttpsRedirection();

// 启用静态文件中间件
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
