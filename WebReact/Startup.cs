using Microsoft.EntityFrameworkCore;
using WebReact.Config;


namespace WebReact
{
    internal class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddDbContext<Contexto>
                (options => options.UseSqlServer
                (Configuration.GetConnectionString("DefaultConnection")));

            services.AddCors();
        }

        public void Configure(WebApplication app, IWebHostEnvironment environment)
        {
            if (environment.IsDevelopment())
                app.UseDeveloperExceptionPage();

            else
                app.UseHsts();
          
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials
        }
    }
}