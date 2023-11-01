using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeltaDriveBE.Migrations
{
    /// <inheritdoc />
    public partial class ExpandedRide : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Ocena",
                table: "Ride",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VehicleStatus",
                table: "Ride",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ocena",
                table: "Ride");

            migrationBuilder.DropColumn(
                name: "VehicleStatus",
                table: "Ride");
        }
    }
}
