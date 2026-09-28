---
name: dotnet-best-practices
description: Best practices for building .NET applications. Use when creating, structuring, or reviewing .NET applications — covers ASP.NET Core, dependency injection, configuration, testing, and deployment.
---

# .NET Best Practices

.NET is a cross-platform development platform with ASP.NET Core for web applications. Best practice is to follow .NET conventions, use dependency injection properly, implement proper configuration management, use async/await correctly, and follow security best practices.

---

## 1. Core Stack

- .NET **latest LTS**
- ASP.NET Core **latest stable**
- Entity Framework Core for ORM
- Serilog for logging
- xUnit for testing

```bash
dotnet new webapi -n MyApi
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Serilog.AspNetCore
dotnet add package xunit
```

---

## 2. Project Structure

```text
src/
├── MyApi/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Repositories/
│   └── Program.cs
├── MyApi.Tests/
└── MyApi.sln
```

- **Separate projects for tests.**
- **Organize by layer (Controllers, Services, Repositories).**
- **Use standard .NET project structure.**

---

## 3. Dependency Injection

- **Configure services in Program.cs:**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
```

- **Use appropriate service lifetimes (Transient, Scoped, Singleton).**
- **Interface-based injection for testability.**
- **Configure in Program.cs/Startup.cs.**

---

## 4. Configuration

- **Use appsettings.json and environment variables:**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb;Trusted_Connection=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var logLevel = builder.Configuration["Logging:LogLevel:Default"];
```

- **Use environment-specific appsettings files.**
- **Never hardcode connection strings or secrets.**
- **Use User Secrets for development.**

---

## 5. Controllers

- **Controllers should be thin:**

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _userService.GetUserById(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
}
```

- **Use attribute routing.**
- **Business logic in services.**
- **Return appropriate HTTP status codes.**

---

## 6. Entity Framework Core

- **Define DbContext and entities:**

```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
```

- **Use migrations for schema changes.**
- **Configure relationships via Fluent API.**
- **Use async methods for database operations.**

---

## 7. Async/Await

- **Use async/await for I/O operations:**

```csharp
public async Task<User> GetUserById(int id)
{
    return await _context.Users.FindAsync(id);
}

public async Task CreateUser(User user)
{
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
}
```

- **Async all the way down.**
- **Avoid async void (use async Task).**
- **ConfigureAwait(false) in library code.**

---

## 8. Logging

- **Use Serilog for structured logging:**

```csharp
builder.Host.UseSerilog((context, services, configuration) => {
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .Enrich.FromLogContext()
        .WriteTo.Console();
});

// In services
_logger.LogInformation("Getting user with ID {UserId}", userId);
```

- **Use structured logging with parameters.**
- **Log at appropriate levels (Information, Warning, Error).**
- **Don't log sensitive information.**

---

## 9. Validation

- **Use Data Annotations for validation:**

```csharp
public class CreateUserRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
```

- **Use FluentValidation for complex validation.**
- **Validate input in controllers or DTOs.**
- **Return 400 Bad Request for invalid input.**

---

## 10. Error Handling

- **Use global error handling:**

```csharp
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

app.UseExceptionHandler();

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        // Handle exception and return appropriate response
    }
}
```

- **Use ProblemDetails for standardized error responses.**
- **Log exceptions appropriately.**
- **Don't expose internal details in production.**

---

## 11. Security

- **Use HTTPS in production:**

```csharp
builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
    options.HttpsPort = 443;
});

app.UseHttpsRedirection();
```

- **Use authentication and authorization.**
- **Validate input to prevent injection attacks.**
- **Use security headers middleware.**

---

## 12. Testing

- **Use xUnit for unit testing:**

```csharp
public class UserServiceTests
{
    [Fact]
    public async Task GetUserById_ReturnsUser()
    {
        // Arrange
        var mockRepository = new Mock<IUserRepository>();
        var service = new UserService(mockRepository.Object);

        // Act
        var user = await service.GetUserById(1);

        // Assert
        Assert.NotNull(user);
    }
}
```

- **Use Moq for mocking dependencies.**
- **Test business logic separately from controllers.**
- **Use integration tests for full flow testing.**

---

## 13. Performance

- **Use caching:**

```csharp
builder.Services.AddMemoryCache();

[HttpGet("{id}")]
[ResponseCache(Duration = 60)]
public async Task<ActionResult<User>> GetUser(int id)
{
    return await _userService.GetUserById(id);
}
```

- **Use async for I/O operations.**
- **Use connection pooling for databases.**
- **Profile and optimize slow operations.**

---

## 14. General Rules of Thumb

- **Dependency injection for all services.**
- **Configuration via appsettings and environment variables.**
- **Async/await for I/O operations.**
- **Structured logging with Serilog.**
- **Validation at input boundaries.**
- **Global error handling.**
- **HTTPS in production.**
- **Comprehensive testing.**

---

## Quick-Start Checklist

- [ ] Standard .NET project structure
- [ ] Dependency injection configured
- [ ] Configuration via appsettings
- [ ] Controllers thin with business logic in services
- [ ] Entity Framework Core with migrations
- [ ] Async/await for I/O operations
- [ ] Serilog for structured logging
- [ ] Validation with Data Annotations
- [ ] Global error handling
- [ ] HTTPS and security headers
