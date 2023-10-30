using DeltaDriveBE.DatabaseConfiguration;
using DeltaDriveBE.Models;
using Microsoft.EntityFrameworkCore;

namespace DeltaDriveBE.Infrastructure
{
    public class APIDBContext : DbContext
    {
        public DbSet<Passenger> Passangers { get; set; }
        public DbSet<Driver> Drivers { get; set; }

        public APIDBContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new PassengerConfig());
            modelBuilder.ApplyConfiguration(new DriverConfig());
        }
    }
}
