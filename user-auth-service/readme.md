# User Authentication Service

This microservice handles user registration, login, and JWT-based authentication.

## Endpoints

### Register
```bash
curl -X POST http://localhost:5001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "email": "test@example.com", "password": "pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "pass123"}'
```

## Docker
Exposed on port **5001**.
