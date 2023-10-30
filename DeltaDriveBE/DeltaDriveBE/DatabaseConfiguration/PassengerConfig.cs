using DeltaDriveBE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeltaDriveBE.DatabaseConfiguration
{
    public class PassengerConfig : IEntityTypeConfiguration<Passenger>
    {
        public void Configure(EntityTypeBuilder<Passenger> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Email).IsRequired().HasMaxLength(100);
            builder.HasIndex(x => x.Email).IsUnique();

            builder.Property(x => x.Password).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Birthdate).HasMaxLength(100);
        }
    }
}
