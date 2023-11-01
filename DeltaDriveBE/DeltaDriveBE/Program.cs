using AutoMapper;
using DeltaDriveBE.Infrastructure;
using DeltaDriveBE.Interfaces;
using DeltaDriveBE.Interfaces.Repository;
using DeltaDriveBE.Mapper;
using DeltaDriveBE.Models;
using DeltaDriveBE.Repository;
using DeltaDriveBE.Services;
using EntityFramework.Exceptions.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

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
builder.Services.AddScoped<IPassengerService, PassengerService>();
builder.Services.AddScoped<IPassengerRepository, PassengerRepository>();

builder.Services.AddScoped<IRideService, RideService>();
builder.Services.AddScoped<IRideRepository, RideRepository>();
#endregion

#region SwaggerGen for JWT
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DeltaDriveBE", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme()
            {
                Reference = new OpenApiReference()
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "http://localhost:44319",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["secret"])),
        //ClockSkew = TimeSpan.Zero //By default the validity of JWT is 5 minutes, ClockSkew = TimeSpan.Zero removes that
    };
});


//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("IsVerifiedSeller", policy => policy.RequireClaim("VerificationStatus", "Accepted"));
//});
#endregion

#region CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "cors", builder =>
    {
        builder
        .WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("cors");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
