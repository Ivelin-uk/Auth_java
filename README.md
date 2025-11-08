# Microservices Architecture with Spring Boot 🚀

Това е микросървисно приложение, базирано на Spring Boot и Spring Cloud.

## 📋 Сървиси

### 1. Auth Service ✅
Сървис за автентикация и авторизация, използващ:
- ✅ Spring Security
- ✅ JWT (JSON Web Tokens)
- ✅ MySQL база данни
- ✅ BCrypt за хеширане на пароли
- ✅ Role-based access control (USER, ADMIN, MODERATOR)

## 🛠️ Технологии

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Cloud 2023.0.0**
- **Spring Security**
- **Spring Data JPA**
- **MySQL 8.0+**
- **JWT (jjwt 0.12.3)**
- **Lombok**
- **Maven**

## 🚀 Стартиране

### Изисквания
- JDK 17+
- Maven 3.6+
- MySQL 8.0+

### Конфигурация на MySQL

1. **Уверете се, че MySQL работи:**
```bash
# Проверка дали MySQL работи
pgrep -l mysqld

# Ако не работи, стартирайте го:
brew services start mysql
# или
mysql.server start
```

2. **Базата данни ще се създаде автоматично** благодарение на `createDatabaseIfNotExist=true` в connection string.

3. **Конфигурирайте паролата** в `auth-service/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    username: root
    password: YOUR_MYSQL_PASSWORD  # Сменете с вашата парола
```

### Стартиране на Auth Service

```bash
cd auth-service
mvn clean install
mvn spring-boot:run
```

Auth Service ще бъде достъпен на: **http://localhost:8081**

## 📡 API Endpoints

### Health Check
```bash
curl http://localhost:8081/api/auth/health
# Response: "Auth Service is running"
```

### Register (Регистрация)
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "username": "testuser",
  "email": "test@example.com",
  "message": "User registered successfully"
}
```

### Login (Вход)
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "username": "testuser",
  "email": "test@example.com",
  "message": "Login successful"
}
```

### Validate Token (Валидация на токен)
```bash
curl -X POST http://localhost:8081/api/auth/validate \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your-jwt-token-here"
  }'
```

**Response:**
```json
{
  "valid": true,
  "username": "testuser",
  "message": "Token is valid"
}
```

## 🧪 Тестване

### Автоматично тестване с bash скрипт:
```bash
chmod +x test-auth-service.sh
./test-auth-service.sh
```

### Тестване с Postman:
Импортирайте `Auth-Service-API.postman_collection.json` в Postman за лесно тестване на всички endpoints.

## 📁 Структура на проекта

```
JAVA TEST 2/
├── pom.xml                                    # Parent Maven POM
├── README.md                                  # Главна документация
├── .gitignore                                 # Git ignore файл
├── test-auth-service.sh                       # Тестов скрипт
├── Auth-Service-API.postman_collection.json   # Postman collection
└── auth-service/
    ├── pom.xml                                # Auth Service POM
    ├── README.md                              # Auth Service документация
    └── src/
        ├── main/
        │   ├── java/com/microservices/authservice/
        │   │   ├── AuthServiceApplication.java
        │   │   ├── config/
        │   │   │   ├── ApplicationConfig.java
        │   │   │   ├── JwtProperties.java
        │   │   │   └── SecurityConfig.java
        │   │   ├── controller/
        │   │   │   └── AuthController.java
        │   │   ├── dto/
        │   │   │   ├── AuthResponse.java
        │   │   │   ├── LoginRequest.java
        │   │   │   ├── RegisterRequest.java
        │   │   │   ├── ValidateTokenRequest.java
        │   │   │   └── ValidateTokenResponse.java
        │   │   ├── entity/
        │   │   │   ├── User.java
        │   │   │   └── Role.java
        │   │   ├── exception/
        │   │   │   └── GlobalExceptionHandler.java
        │   │   ├── repository/
        │   │   │   └── UserRepository.java
        │   │   ├── security/
        │   │   │   ├── JwtAuthenticationFilter.java
        │   │   │   └── JwtService.java
        │   │   └── service/
        │   │       └── AuthService.java
        │   └── resources/
        │       ├── application.yml
        │       └── schema.sql
        └── test/
            └── resources/
                └── application-test.yml
```

## ✅ Тествани функционалности

- ✅ Регистрация на нови потребители
- ✅ Login с username и парола
- ✅ JWT токен генериране
- ✅ JWT токен валидация
- ✅ Защита срещу дублирани usernames/emails
- ✅ BCrypt хеширане на пароли
- ✅ Проверка на грешни credentials
- ✅ MySQL интеграция
- ✅ Hibernate автоматично създаване на таблици

## 🔐 Security Features

- JWT токени с 24 часа валидност
- BCrypt password encoding
- CSRF защита disabled за REST API
- Stateless session management
- Role-based access control (USER, ADMIN, MODERATOR)
- Spring Security filter chain

## 📝 Следващи стъпки

Можете да добавите още микросървиси като:
- **API Gateway** - за routing и load balancing
- **Service Discovery** - Eureka за service registry
- **Config Server** - централизирана конфигурация
- **User Service** - за управление на потребителски профили
- **Product Service** - за продукти/услуги
- **Order Service** - за поръчки

## 🤝 Разработено с

- Spring Boot
- Maven
- MySQL
- JWT
- Lombok
# Auth_java
