using DeltaDriveBE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeltaDriveBE.DatabaseConfiguration
{
    public class RideConfig : IEntityTypeConfiguration<Ride>
    {
        public void Configure(EntityTypeBuilder<Ride> builder)
        {
            //builder.HasKey(x => x.Id);
            //builder.Property(x => x.Id).ValueGeneratedOnAdd();

            //builder.HasOne(x => x.Driver).WithMany(x => x.Rides).HasForeignKey(x => x.DriverId);
            //builder.HasOne(x => x.Passenger).WithMany(x => x.Rides).HasForeignKey(x => x.PassengerId);
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(x => x.Driver).WithMany(x => x.RideHistory).HasForeignKey(x => x.DriverId);
            //builder.HasOne(x => x.Passenger).WithMany(x => x.RideHistory).HasForeignKey(x => x.PassengerId);

            builder.Property(x => x.StartLatitude).IsRequired();
            builder.Property(x => x.StartLongitude).IsRequired();

            builder.Property(x => x.DestinationLatitude).IsRequired();
            builder.Property(x => x.DestinationLongitude).IsRequired();

            builder.Property(x => x.RideStatus).HasConversion<string>();

        }
    }
}

