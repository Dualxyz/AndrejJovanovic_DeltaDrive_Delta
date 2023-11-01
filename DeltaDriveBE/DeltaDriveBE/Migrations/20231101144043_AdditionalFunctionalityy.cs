using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeltaDriveBE.Migrations
{
    /// <inheritdoc />
    public partial class AdditionalFunctionalityy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ride_Drivers_DriverId",
                table: "Ride");

            migrationBuilder.DropForeignKey(
                name: "FK_Ride_Passangers_PassengerId",
                table: "Ride");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ride",
                table: "Ride");

            migrationBuilder.DropColumn(
                name: "Birthdate",
                table: "Passangers");

            migrationBuilder.DropColumn(
                name: "Ocena",
                table: "Ride");

            migrationBuilder.RenameTable(
                name: "Ride",
                newName: "Rides");

            migrationBuilder.RenameColumn(
                name: "VehicleStatus",
                table: "Rides",
                newName: "RideStatus");

            migrationBuilder.RenameIndex(
                name: "IX_Ride_PassengerId",
                table: "Rides",
                newName: "IX_Rides_PassengerId");

            migrationBuilder.RenameIndex(
                name: "IX_Ride_DriverId",
                table: "Rides",
                newName: "IX_Rides_DriverId");

            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "Passangers",
                type: "datetime2",
                maxLength: 100,
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Rides",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "DestinationLatitude",
                table: "Rides",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DestinationLongitude",
                table: "Rides",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Rides",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "StartLatitude",
                table: "Rides",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "StartLongitude",
                table: "Rides",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalPrice",
                table: "Rides",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rides",
                table: "Rides",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Drivers_DriverId",
                table: "Rides",
                column: "DriverId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Passangers_PassengerId",
                table: "Rides",
                column: "PassengerId",
                principalTable: "Passangers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Drivers_DriverId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Passangers_PassengerId",
                table: "Rides");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rides",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "Passangers");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "DestinationLatitude",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "DestinationLongitude",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "StartLatitude",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "StartLongitude",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Rides");

            migrationBuilder.RenameTable(
                name: "Rides",
                newName: "Ride");

            migrationBuilder.RenameColumn(
                name: "RideStatus",
                table: "Ride",
                newName: "VehicleStatus");

            migrationBuilder.RenameIndex(
                name: "IX_Rides_PassengerId",
                table: "Ride",
                newName: "IX_Ride_PassengerId");

            migrationBuilder.RenameIndex(
                name: "IX_Rides_DriverId",
                table: "Ride",
                newName: "IX_Ride_DriverId");

            migrationBuilder.AddColumn<string>(
                name: "Birthdate",
                table: "Passangers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Ocena",
                table: "Ride",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ride",
                table: "Ride",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ride_Drivers_DriverId",
                table: "Ride",
                column: "DriverId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ride_Passangers_PassengerId",
                table: "Ride",
                column: "PassengerId",
                principalTable: "Passangers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
