# Admin Service

Admin Service за управление на потребители в microservices архитектура.

## Порт
- **8082**

## Функционалности

### User Management (CRUD)
1. **GET /api/admin/users** - Всички потребители
2. **GET /api/admin/users/{id}** - Потребител по ID
3. **GET /api/admin/users/username/{username}** - Потребител по username
4. **PUT /api/admin/users/{id}** - Обновяване на потребител
5. **DELETE /api/admin/users/{id}** - Изтриване на потребител
6. **POST /api/admin/users/{id}/activate** - Активиране на потребител
7. **POST /api/admin/users/{id}/deactivate** - Деактивиране на потребител
8. **POST /api/admin/users/{id}/reset-password** - Ресетване на парола

## Автентикация

Всички endpoints (освен `/health`) изискват валиден JWT token от Auth Service в `Authorization` header:

```
Authorization: Bearer <token>
```

## Примери

### 1. Вземане на всички потребители
```bash
curl -X GET http://localhost:8082/api/admin/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 2. Обновяване на потребител
```bash
curl -X PUT http://localhost:8082/api/admin/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newusername",
    "email": "newemail@example.com",
    "role": "ADMIN",
    "enabled": true
  }'
```

### 3. Активиране на потребител
```bash
curl -X POST http://localhost:8082/api/admin/users/1/activate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Ресетване на парола
```bash
curl -X POST http://localhost:8082/api/admin/users/1/reset-password \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "newPassword": "NewSecurePass123!"
  }'
```

### 5. Изтриване на потребител
```bash
curl -X DELETE http://localhost:8082/api/admin/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Стартиране

```bash
cd admin-service
mvn spring-boot:run
```

## База данни

Споделя същата база данни като Auth Service: `auth_service_db`

## Зависимости

- Auth Service (порт 8081) - за валидация на JWT токени
- MySQL (порт 3306)
