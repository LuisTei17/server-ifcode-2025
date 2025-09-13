# server-ifcode-2025

NestJS authentication server with Google OAuth and local authentication using bcryptjs.

## Features

- 🔐 Local user registration and login
- 🔑 JWT token authentication
- 🌐 Google OAuth integration
- 🔒 Password hashing with bcryptjs and salt
- 📊 PostgreSQL database with TypeORM
- ✅ Input validation with class-validator

## Database Schema

The user table (usuarios) includes all required fields:
- `id_usuario` - Primary key
- `nome_usuario` - User name
- `email_usuario` - Email address (unique)
- `cod_tip_usuario` - User type code
- `telefone_usuario` - Phone number
- `dt_nasc` - Birth date
- `cpf` - CPF document
- `cod_interesse` - Interest code
- `contato_emerg` - Emergency contact
- `cep` - ZIP code
- `num_endereco` - Address number
- `complemento_endereco` - Address complement
- `hash` - Password hash
- `salt` - Password salt
- `googleId` - Google OAuth ID (for Google login users)

## API Endpoints

### Authentication
- `POST /auth/register` - Local user registration
- `POST /auth/login` - Local user login  
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/profile` - Get user profile (requires JWT token)

### System
- `GET /` - Welcome message
- `GET /health` - API health check and endpoints info

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database and Google OAuth credentials
```

3. Set up PostgreSQL database and update credentials in .env

4. Run the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome_usuario": "João Silva", 
    "email_usuario": "joao@example.com",
    "password": "minhasenha123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email_usuario": "joao@example.com",
    "password": "minhasenha123"  
  }'
```

### Access protected route
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/auth/profile
```

### Google OAuth
Visit `http://localhost:3000/auth/google` to initiate Google login flow.

## Technologies Used

- **NestJS** - Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Database
- **Passport** - Authentication middleware
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **Google OAuth 2.0** - Social authentication