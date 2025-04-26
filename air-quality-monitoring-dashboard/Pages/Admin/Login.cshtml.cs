using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using air_quality_monitoring_dashboard.Models;
using air_quality_monitoring_dashboard.Services;
using air_quality_monitoring_dashboard.Utils;

namespace air_quality_monitoring_dashboard.Pages.Admin
{
    public class LoginModel : PageModel
    {
        private readonly MongoDbService _mongoService;

        public LoginModel(MongoDbService mongoService)
        {
            _mongoService = mongoService;
        }

        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string Password { get; set; }

        public string ErrorMessage { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (string.IsNullOrEmpty(Username) || string.IsNullOrEmpty(Password))
            {
                ErrorMessage = "Username and Password are required.";
                return Page();
            }

            var users = await _mongoService.GetAllUsersAsync();
            var user = users.FirstOrDefault(u => u.Username == Username);

            if (user == null || user.PasswordHash != PasswordHelper.HashPassword(Password))
            {
                ErrorMessage = "Invalid login attempt.";
                return Page();
            }

            // Here you can set up authentication cookies if needed
            // For now, we just redirect
            return RedirectToPage("/Admin/Dashboard");
        }
    }
}