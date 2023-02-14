using Microsoft.EntityFrameworkCore;
using WebReact.Model;

namespace WebReact.Config
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base (options) 
        { 
            Database.EnsureCreated();
        }

        public DbSet<Produto> Produto { get; set; }
    }
}
