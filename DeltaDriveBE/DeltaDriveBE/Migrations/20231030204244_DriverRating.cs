using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeltaDriveBE.Migrations
{
    /// <inheritdoc />
    public partial class DriverRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Drivers",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Drivers");
        }
    }
}
