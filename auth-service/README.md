# Auth Service

REST API за автентикация и авторизация с използване на JWT токени.

## Endpoints

### Health Check
```
GET /api/auth/health
```

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### Validate Token
```
POST /api/auth/validate
Content-Type: application/json

{
  "token": "your-jwt-token-here"
}
```

## Конфигурация

Преди стартиране, моля конфигурирайте следните настройки в `application.yml`:

1. **MySQL Connection**:
   - URL: `jdbc:mysql://localhost:3306/auth_service_db`
   - Username: вашето MySQL username
   - Password: вашата MySQL парола

2. **JWT Secret**: Промени jwt.secret със своя собствена стойност за production среда

## База данни

Приложението автоматично ще създаде необходимите таблици при стартиране благодарение на Hibernate.

За ръчно създаване на базата данни:
```sql
CREATE DATABASE auth_service_db;
```

## Стартиране

```bash
mvn spring-boot:run
```

Сървисът ще стартира на порт **8081**.
