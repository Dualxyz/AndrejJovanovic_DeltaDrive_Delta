using DeltaDriveBE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeltaDriveBE.DatabaseConfiguration
{
    public class DriverConfig : IEntityTypeConfiguration<Driver>
    {
        public void Configure(EntityTypeBuilder<Driver> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Latitude).IsRequired();
            builder.Property(x => x.Longitude).IsRequired();
            builder.Property(x => x.StartPrice).IsRequired();
            builder.Property(x => x.PricePerKm).IsRequired();
            //builder.HasMany(x => x.Ratings).WithOne(x => x.Driver).HasForeignKey(x => x.DriverId).HasForeignKey(x=>x.PassengerId);
            //builder.Ignore(x => x.IsBooked);
        }
    }
}
