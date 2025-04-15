using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartCitizenDemo.Data.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HolderName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    FatherOrHusbandName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    MotherName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    NIDNumber = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    HoldingNumber = table.Column<int>(type: "int", nullable: false),
                    WardNumber = table.Column<int>(type: "int", nullable: false),
                    Village = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
