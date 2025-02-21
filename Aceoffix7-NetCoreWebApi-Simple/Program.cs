var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
//Aceoffix configuration is mandatory.
app.UseMiddleware<AceoffixNetCore.AceServer.ServerHandlerMiddleware>();
app.UseHttpsRedirection();

// 启用静态文件中间件
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
