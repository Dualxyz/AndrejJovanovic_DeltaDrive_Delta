using AutoMapper;
using DeltaDriveBE.Infrastructure;
using DeltaDriveBE.Interfaces;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Mapper;
using DeltaDriveBE.Repository;
using DeltaDriveBE.Services;
using EntityFramework.Exceptions.SqlServer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

# region Initialize Database Context
builder.Services.AddDbContext<APIDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectString")).UseExceptionProcessor());
# endregion

#region Creating a Mapper Profile
MapperConfiguration config = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MapperProfile());
});
IMapper mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);
#endregion

# region register service and repositories
builder.Services.AddScoped<IPassangerService, PassangerService>();
builder.Services.AddScoped<IPassangerRepository, PassangerRepository>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
