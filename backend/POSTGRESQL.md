# PostgreSQL development profile

The default `dev` profile keeps the existing H2 database working. The
`postgres` profile uses PostgreSQL and Flyway.

## One-time database setup

Run as a PostgreSQL administrator:

```sql
CREATE USER portfolio WITH PASSWORD 'choose-a-strong-password';
CREATE DATABASE portfolio OWNER portfolio;
```

## PowerShell startup

```powershell
$env:DATABASE_URL = "jdbc:postgresql://localhost:5432/portfolio"
$env:DATABASE_USERNAME = "portfolio"
$env:DATABASE_PASSWORD = "choose-a-strong-password"
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=postgres
```

Flyway applies pending scripts from `db/migration` at startup. Hibernate uses
`validate`, so it checks the schema without changing it.
