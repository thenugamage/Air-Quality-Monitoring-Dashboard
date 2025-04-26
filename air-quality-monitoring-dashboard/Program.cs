using air_quality_monitoring_dashboard.Data;
using air_quality_monitoring_dashboard.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Register MongoDB Service
builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddHostedService<SensorSimulationService>();

builder.Services.AddAuthorization();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
