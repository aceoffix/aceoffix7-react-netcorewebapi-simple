var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
//Aceoffix configuration is mandatory.
app.UseMiddleware<AceoffixNetCore.AceServer.ServerHandlerMiddleware>();
app.UseHttpsRedirection();

// ���þ�̬�ļ��м��
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
