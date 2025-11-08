# Microservices Architecture with Spring Boot 🚀

Това е микросървисно приложение, базирано на Spring Boot и Spring Cloud, състоящо се от два микросървиса за автентикация и администрация на потребители.

## 📋 Микросървиси

### 1. Auth Service (Port 8081) ✅
Сървис за автентикация и авторизация:
- ✅ **Регистрация** на нови потребители
- ✅ **Login** с username и парола
- ✅ **JWT токен** генериране и валидация
- ✅ **Силна парола валидация** (минимум 8 символа, главни/малки букви, цифри, специални символи)
- ✅ **Spring Security** интеграция
- ✅ **BCrypt** хеширане на пароли
- ✅ **Role-based access control** (USER, ADMIN)
- ✅ **MySQL** база данни

### 2. Admin Service (Port 8082) ✅
Сървис за управление на потребители (CRUD операции):
- ✅ **Преглед** на всички потребители
- ✅ **Търсене** на потребител по ID или username
- ✅ **Обновяване** на потребителски данни
- ✅ **Изтриване** на потребители
- ✅ **Активиране/Деактивиране** на потребители
- ✅ **Ресетване на пароли**
- ✅ **JWT валидация** чрез комуникация с Auth Service
- ✅ Споделена **MySQL** база данни с Auth Service

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
- **JDK 17+**
- **Maven 3.6+**
- **MySQL 8.0+**

### Конфигурация на MySQL

1. **Уверете се, че MySQL работи:**
```bash
# Проверка дали MySQL работи
mysql --version

# Стартиране на MySQL (macOS)
brew services start mysql
# или
mysql.server start
```

2. **Базата данни се създава автоматично** (`auth_service_db`) благодарение на `createDatabaseIfNotExist=true`.

3. **Конфигурирайте паролата** (ако имате):
   - `auth-service/src/main/resources/application.yml`
   - `admin-service/src/main/resources/application.yml`
```yaml
spring:
  datasource:
    username: root
    password: YOUR_PASSWORD  # Сменете с вашата парола или оставете празно
```

### Стартиране на сървисите

**Вариант 1: От root директорията (препоръчително)**
```bash
# Terminal 1 - Auth Service
mvn spring-boot:run -pl auth-service

# Terminal 2 - Admin Service  
mvn spring-boot:run -pl admin-service
```

**Вариант 2: От отделните директории**
```bash
# Terminal 1
cd auth-service
mvn spring-boot:run

# Terminal 2
cd admin-service
mvn spring-boot:run
```

**Готово! Сървисите са достъпни на:**
- **Auth Service:** http://localhost:8081
- **Admin Service:** http://localhost:8082

## 📡 API Endpoints

### Auth Service (Port 8081)

#### Health Check
```bash
curl http://localhost:8081/api/auth/health
```

#### Register (Регистрация)
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```
**Забележка:** Паролата трябва да съдържа:
- Минимум 8 символа
- Поне една главна буква (A-Z)
- Поне една малка буква (a-z)
- Поне една цифра (0-9)
- Поне един специален символ (!@#$%^&*)

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "username": "testuser",
  "email": "test@example.com",
  "message": "User registered successfully"
}
```

#### Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "SecurePass123!"
  }'
```

#### Validate Token
```bash
curl -X POST http://localhost:8081/api/auth/validate \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your-jwt-token-here"
  }'
```

---

### Admin Service (Port 8082)

**Забележка:** Всички Admin endpoints изискват валиден JWT токен в Authorization header.

#### Health Check
```bash
curl http://localhost:8082/api/admin/users/health
```

#### Get All Users
```bash
curl -X GET http://localhost:8082/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get User by ID
```bash
curl -X GET http://localhost:8082/api/admin/users/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update User
```bash
curl -X PUT http://localhost:8082/api/admin/users/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newusername",
    "email": "newemail@example.com",
    "role": "ADMIN",
    "enabled": true
  }'
```

#### Activate/Deactivate User
```bash
# Активиране
curl -X POST http://localhost:8082/api/admin/users/1/activate \
  -H "Authorization: Bearer YOUR_TOKEN"

# Деактивиране
curl -X POST http://localhost:8082/api/admin/users/1/deactivate \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Reset Password
```bash
curl -X POST http://localhost:8082/api/admin/users/1/reset-password \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "newPassword": "NewSecurePass123!"
  }'
```

#### Delete User
```bash
curl -X DELETE http://localhost:8082/api/admin/users/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🧪 Тестване

### Тестване с Postman (Препоръчително) 🎯

Импортирайте един от Postman collection файловете:

1. **Microservices-Full-API.postman_collection.json** ⭐ (Препоръчително)
   - Съдържа и двата сървиса
   - Автоматично запазва JWT токена
   - Използва variables за лесна работа

2. **Auth-Service-API.postman_collection.json**
   - Само Auth Service endpoints

3. **Admin-Service-API.postman_collection.json**
   - Само Admin Service endpoints

**Стъпки:**
1. Отворете Postman
2. File → Import → Select file
3. Изберете `Microservices-Full-API.postman_collection.json`
4. Започнете с `Auth Service → Register User` или `Login`
5. Токенът се запазва автоматично и се използва за Admin операциите

### Тестване с Bash скрипт:
```bash
chmod +x test-auth-service.sh
./test-auth-service.sh
```

## 📁 Структура на проекта

```
JAVA/
├── pom.xml                                          # Parent Maven POM
├── README.md                                        # Главна документация
├── SUMMARY.md                                       # Кратко обобщение
├── test-auth-service.sh                             # Тестов скрипт
├── Auth-Service-API.postman_collection.json         # Auth Postman collection
├── Admin-Service-API.postman_collection.json        # Admin Postman collection
├── Microservices-Full-API.postman_collection.json   # Пълна Postman collection ⭐
│
├── auth-service/                                    # Auth Service (Port 8081)
│   ├── pom.xml
│   ├── README.md
│   └── src/
│       ├── main/
│       │   ├── java/com/microservices/authservice/
│       │   │   ├── AuthServiceApplication.java
│       │   │   ├── config/
│       │   │   │   ├── ApplicationConfig.java
│       │   │   │   ├── JwtProperties.java
│       │   │   │   └── SecurityConfig.java
│       │   │   ├── controller/
│       │   │   │   └── AuthController.java
│       │   │   ├── dto/
│       │   │   │   ├── AuthResponse.java
│       │   │   │   ├── LoginRequest.java
│       │   │   │   ├── RegisterRequest.java
│       │   │   │   ├── ValidateTokenRequest.java
│       │   │   │   └── ValidateTokenResponse.java
│       │   │   ├── entity/
│       │   │   │   ├── User.java
│       │   │   │   └── Role.java
│       │   │   ├── exception/
│       │   │   │   └── GlobalExceptionHandler.java
│       │   │   ├── repository/
│       │   │   │   └── UserRepository.java
│       │   │   ├── security/
│       │   │   │   ├── JwtAuthenticationFilter.java
│       │   │   │   └── JwtService.java
│       │   │   ├── service/
│       │   │   │   └── AuthService.java
│       │   │   └── validation/                      # 🆕 Password Validation
│       │   │       ├── ValidPassword.java
│       │   │       └── PasswordValidator.java
│       │   └── resources/
│       │       ├── application.yml
│       │       └── schema.sql
│       └── test/
│           └── java/com/microservices/authservice/
│               └── validation/
│                   └── PasswordValidatorTest.java
│
└── admin-service/                                   # Admin Service (Port 8082) 🆕
    ├── pom.xml
    ├── README.md
    └── src/
        └── main/
            ├── java/com/microservices/adminservice/
            │   ├── AdminServiceApplication.java
            │   ├── client/
            │   │   └── AuthServiceClient.java       # Комуникация с Auth Service
            │   ├── config/
            │   │   ├── RestTemplateConfig.java
            │   │   └── SecurityConfig.java
            │   ├── controller/
            │   │   └── UserManagementController.java
            │   ├── dto/
            │   │   ├── ResetPasswordRequest.java
            │   │   ├── UpdateUserRequest.java
            │   │   ├── UserResponse.java
            │   │   ├── ValidateTokenRequest.java
            │   │   └── ValidateTokenResponse.java
            │   ├── entity/
            │   │   ├── User.java
            │   │   └── Role.java
            │   ├── exception/
            │   │   └── GlobalExceptionHandler.java
            │   ├── repository/
            │   │   └── UserRepository.java
            │   └── service/
            │       └── UserManagementService.java   # CRUD логика
            └── resources/
                └── application.yml
```

## ✅ Функционалности

### Auth Service
- ✅ Регистрация на нови потребители
- ✅ **Силна парола валидация** (8+ символа, главни/малки, цифри, специални символи)
- ✅ Login с username и парола
- ✅ JWT токен генериране (24 часа валидност)
- ✅ JWT токен валидация
- ✅ Защита срещу дублирани usernames/emails
- ✅ BCrypt хеширане на пароли
- ✅ Custom валидация errors с детайлни съобщения

### Admin Service
- ✅ Преглед на всички потребители
- ✅ Търсене по ID или username
- ✅ Обновяване на потребителски данни (username, email, role, enabled)
- ✅ Изтриване на потребители
- ✅ Активиране/Деактивиране на потребители
- ✅ Ресетване на пароли
- ✅ JWT автентикация чрез Auth Service
- ✅ Защита на всички endpoints с токен валидация

### Общи
- ✅ MySQL интеграция със споделена база данни
- ✅ Hibernate автоматично създаване на таблици
- ✅ RESTful API дизайн
- ✅ Микросървисна архитектура
- ✅ Service-to-service комуникация (Admin → Auth)

## 🔐 Security Features

### Auth Service
- **JWT токени** с 24 часа валидност
- **BCrypt password encoding** (cost factor 10)
- **Силна парола валидация:**
  - Минимум 8 символа, максимум 100
  - Поне една главна буква (A-Z)
  - Поне една малка буква (a-z)
  - Поне една цифра (0-9)
  - Поне един специален символ (!@#$%^&*()_+-=[]{}etc.)
- **Custom validation messages** за всяко изискване
- **Spring Security filter chain**
- **CSRF защита** disabled за REST API
- **Stateless session** management

### Admin Service
- **JWT валидация** чрез Auth Service
- **Authorization header** изискване за всички endpoints
- **Service-to-service** комуникация за проверка на токени
- **Role-based access control** (USER, ADMIN)
- **Защита срещу unauthorized** достъп

## � Комуникация между сървисите

```
┌─────────────────┐         JWT Token          ┌─────────────────┐
│                 │  ────────────────────────>  │                 │
│  Auth Service   │                             │  Admin Service  │
│   (Port 8081)   │  <────────────────────────  │   (Port 8082)   │
│                 │    Token Validation         │                 │
└─────────────────┘                             └─────────────────┘
         │                                               │
         │                                               │
         └───────────────────┬───────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │                 │
                    │  MySQL Database │
                    │ auth_service_db │
                    │                 │
                    └─────────────────┘
```

**Работен процес:**
1. Клиент се регистрира/влиза в **Auth Service**
2. Auth Service връща **JWT токен**
3. Клиент използва токена за заявки към **Admin Service**
4. Admin Service валидира токена чрез **Auth Service**
5. При валиден токен, Admin Service изпълнява операцията

## 📝 Допълнителни подобрения (опционални)

- **API Gateway** (Spring Cloud Gateway) - routing и load balancing
- **Service Discovery** (Eureka) - автоматично откриване на сървиси
- **Config Server** - централизирана конфигурация
- **Circuit Breaker** (Resilience4j) - fault tolerance
- **Distributed Tracing** (Zipkin) - проследяване на заявки
- **Monitoring** (Spring Boot Actuator + Prometheus)
- **Logging** (ELK Stack)

## 🤝 Технологии

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Cloud 2023.0.0**
- **Spring Security**
- **Spring Data JPA**
- **MySQL 8.0+**
- **JWT (jjwt 0.12.3)**
- **Lombok**
- **Maven**
- **BCrypt**
- **RestTemplate** (service-to-service communication)

---

**Разработено с ❤️ използвайки Spring Boot Microservices Architecture**
