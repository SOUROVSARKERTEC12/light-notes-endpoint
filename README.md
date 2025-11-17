# 📝 Light Notes API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A robust, production-ready REST API for managing notes with JWT-based authentication, built with NestJS and TypeScript.

[Features](#-features) • [Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Code of Conduct](#-code-of-conduct)
- [Security](#-security)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

Light Notes API is a secure, scalable backend service for managing personal notes. It provides a complete authentication system with JWT tokens and refresh token rotation, along with full CRUD operations for notes management. The API is built following NestJS best practices with proper validation, error handling, and security measures.

### Key Highlights

- 🔐 **Secure Authentication**: JWT-based auth with refresh token support
- 📝 **Note Management**: Full CRUD operations with pagination
- 🛡️ **Input Validation**: Comprehensive validation using class-validator
- 📚 **API Documentation**: Auto-generated Swagger/OpenAPI docs
- 🧪 **Test Ready**: Configured for unit and e2e testing
- 🚀 **Production Ready**: Optimized for deployment

---

## ✨ Features

### Authentication & Authorization

- ✅ User registration with email validation
- ✅ Secure login with password hashing (Argon2)
- ✅ JWT access tokens with configurable expiration
- ✅ Refresh token mechanism for seamless authentication
- ✅ Secure logout with token invalidation
- ✅ Protected routes with JWT guards

### Notes Management

- ✅ Create, read, update, and delete notes
- ✅ Pagination support for listing notes
- ✅ User-specific note isolation
- ✅ Timestamp tracking (created/updated)

### Developer Experience

- ✅ TypeScript for type safety
- ✅ Swagger UI for interactive API testing
- ✅ Request logging with Morgan
- ✅ Global validation pipes
- ✅ Structured error responses
- ✅ Environment-based configuration

---

## 🛠️ Tech Stack

| Category              | Technology                         |
| --------------------- | ---------------------------------- |
| **Framework**         | NestJS 11.x                        |
| **Language**          | TypeScript 5.7+                    |
| **Database**          | SQLite (via Prisma)                |
| **ORM**               | Prisma 6.x                         |
| **Authentication**    | JWT (@nestjs/jwt)                  |
| **Password Hashing**  | Argon2                             |
| **Validation**        | class-validator, class-transformer |
| **API Documentation** | Swagger/OpenAPI                    |
| **Logging**           | Morgan                             |
| **Testing**           | Jest                               |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) or **yarn** (v1.22.x or higher)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher
# OR
yarn --version  # Should be v1.22.x or higher
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/light-notes-endpoint.git
cd light-notes-endpoint
```

### 2. Install Dependencies

Using **npm**:

```bash
npm install
```

Using **yarn** (recommended):

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env  # If you have an example file
# OR create .env manually
```

Add the following environment variables:

```env
# Database
DATABASE_URL="file:./prisma/light-notes.db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-super-secret-refresh-token-key-change-this-in-production"
JWT_REFRESH_EXPIRES_IN="30d"

# Server Configuration
PORT=8000
NODE_ENV=development
```

> ⚠️ **Security Warning**: Never commit `.env` files to version control. Always use strong, unique secrets in production.

### 4. Set Up Database

Generate Prisma Client and run migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

---

## ⚙️ Configuration

### Environment Variables Reference

| Variable                 | Description                                    | Default                        | Required |
| ------------------------ | ---------------------------------------------- | ------------------------------ | -------- |
| `DATABASE_URL`           | SQLite database file path                      | `file:./prisma/light-notes.db` | Yes      |
| `JWT_SECRET`             | Secret key for JWT access tokens               | -                              | Yes      |
| `JWT_EXPIRES_IN`         | Access token expiration time                   | `15m`                          | No       |
| `JWT_REFRESH_SECRET`     | Secret key for refresh tokens                  | -                              | Yes      |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration time                  | `30d`                          | No       |
| `PORT`                   | Server port number                             | `8000`                         | No       |
| `NODE_ENV`               | Environment mode (`development`, `production`) | `development`                  | No       |

### Production Configuration

For production deployments:

1. Use a production-grade database (PostgreSQL, MySQL, etc.)
2. Set strong, randomly generated secrets (minimum 32 characters)
3. Enable HTTPS
4. Set `NODE_ENV=production`
5. Configure proper CORS settings
6. Set up rate limiting
7. Enable request logging and monitoring

---

## 🏃 Running the Application

### Development Mode

```bash
# Start in watch mode (auto-reload on changes)
yarn start:dev
# OR
npm run start:dev
```

The API will be available at `http://localhost:8000`

### Production Mode

```bash
# Build the application
yarn build
# OR
npm run build

# Start in production mode
yarn start:prod
# OR
npm run start:prod
```

### Debug Mode

```bash
yarn start:debug
# OR
npm run start:debug
```

### Access Swagger Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/api
- **API Base URL**: http://localhost:8000

---

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Authentication Endpoints

#### Register User

```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",  // Optional
  "dateOfBirth": "1990-01-01",   // Optional
  "bio": "Software developer"     // Optional
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Refresh Token

```http
POST /api/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout

```http
POST /api/logout
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

### Notes Endpoints

> 🔒 All notes endpoints require authentication. Include the access token in the Authorization header.

#### Create Note

```http
POST /api/notes
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "My First Note",
  "description": "This is the description of my note"
}
```

#### Get All Notes (with Pagination)

```http
GET /api/notes?page=1&limit=10
Authorization: Bearer {accessToken}
```

**Query Parameters:**

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page

#### Get Single Note

```http
GET /api/notes/{noteId}
Authorization: Bearer {accessToken}
```

#### Update Note

```http
PATCH /api/notes/{noteId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Note

```http
DELETE /api/notes/{noteId}
Authorization: Bearer {accessToken}
```

### Error Responses

All endpoints return standardized error responses:

```json
{
  "statusCode": 400,
  "message": ["Error message 1", "Error message 2"],
  "error": "Bad Request"
}
```

### Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

## 🧪 Testing

### Run Unit Tests

```bash
yarn test
# OR
npm run test
```

### Run E2E Tests

```bash
yarn test:e2e
# OR
npm run test:e2e
```

### Run Tests with Coverage

```bash
yarn test:cov
# OR
npm run test:cov
```

### Watch Mode

```bash
yarn test:watch
# OR
npm run test:watch
```

---

## 📁 Project Structure

```
light-notes-endpoint/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── light-notes.db        # SQLite database file
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── guard/             # JWT authentication guard
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── note/                  # Notes module
│   │   ├── dto/
│   │   ├── note.controller.ts
│   │   ├── note.service.ts
│   │   └── note.module.ts
│   ├── user/                  # User module
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── prisma/                # Prisma module
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── decorators/            # Custom decorators
│   ├── app.module.ts          # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts                # Application entry point
├── test/                      # E2E tests
├── dist/                      # Compiled output (generated)
├── .env                       # Environment variables (not in git)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🤝 Contributing

We welcome contributions from the community! This project follows best practices for open-source collaboration.

### How to Contribute

#### 1. **Fork the Repository**

Click the "Fork" button on GitHub to create your own copy of the repository.

#### 2. **Clone Your Fork**

```bash
git clone https://github.com/yourusername/light-notes-endpoint.git
cd light-notes-endpoint
```

#### 3. **Set Up Remote**

```bash
# Add the original repository as upstream
git remote add upstream https://github.com/originalowner/light-notes-endpoint.git

# Verify remotes
git remote -v
```

#### 4. **Create a Branch**

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# OR for bug fixes
git checkout -b fix/your-bug-fix
```

**Branch Naming Convention:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

#### 5. **Make Your Changes**

- Write clean, readable code
- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation if needed
- Write or update tests

#### 6. **Test Your Changes**

```bash
# Run linter
yarn lint

# Run tests
yarn test

# Run e2e tests
yarn test:e2e
```

#### 7. **Commit Your Changes**

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
git commit -m "feat: add user profile endpoint"
git commit -m "fix: resolve authentication token expiration issue"
git commit -m "docs: update API documentation"
```

**Commit Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions/updates
- `chore:` - Maintenance tasks

#### 8. **Push to Your Fork**

```bash
git push origin feature/your-feature-name
```

#### 9. **Create a Pull Request**

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template:
   - **Title**: Clear, descriptive title
   - **Description**: Explain what changes you made and why
   - **Related Issues**: Link any related issues
   - **Testing**: Describe how you tested your changes
   - **Checklist**: Complete the checklist items

#### 10. **Respond to Feedback**

- Address review comments
- Make requested changes
- Push updates to your branch (PR will update automatically)
- Be patient and respectful

### How to Submit Corrections

If you find bugs, typos, or issues, here's how to submit corrections:

#### Option 1: Quick Fixes (Small Corrections)

For small fixes like typos, documentation errors, or minor bugs:

1. **Create an Issue First** (recommended for tracking)
   - Go to the Issues tab
   - Click "New Issue"
   - Select "Bug Report" or "Documentation"
   - Describe the issue clearly

2. **Fix the Issue**
   - Follow steps 1-8 above
   - Make a focused commit (e.g., `fix: correct typo in README.md`)

3. **Link PR to Issue**
   - In your PR description, add: `Fixes #issue-number`
   - This will automatically close the issue when merged

#### Option 2: Direct Contribution

For code improvements or features:

1. Check existing issues to avoid duplicates
2. Create a branch and make your changes
3. Submit a PR with a clear description

### Contribution Guidelines

#### Code Standards

- ✅ Use TypeScript strictly (no `any` types unless necessary)
- ✅ Follow NestJS best practices and patterns
- ✅ Write meaningful variable and function names
- ✅ Add JSDoc comments for public APIs
- ✅ Keep functions small and focused
- ✅ Handle errors appropriately

#### Testing Requirements

- ✅ Write unit tests for new features
- ✅ Write e2e tests for API endpoints
- ✅ Ensure all tests pass before submitting
- ✅ Maintain or improve test coverage

#### Documentation

- ✅ Update README.md if you add features
- ✅ Update API documentation (Swagger annotations)
- ✅ Add code comments for complex logic
- ✅ Update CHANGELOG.md (if exists)

#### Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows the project's style guidelines
- [ ] All tests pass (`yarn test` and `yarn test:e2e`)
- [ ] Linter passes (`yarn lint`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventional commits
- [ ] Branch is up to date with `main`/`master`
- [ ] No merge conflicts
- [ ] Changes are focused and logical

### Review Process

1. **Automated Checks**: CI/CD will run tests and linting
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

### Getting Help

- 💬 **Questions?** Open a discussion in GitHub Discussions
- 🐛 **Found a bug?** Open an issue
- 💡 **Have an idea?** Open a feature request issue
- 📧 **Contact**: [Add your contact method]

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Expected Behavior

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members

### Unacceptable Behavior

- ❌ Harassment, discrimination, or offensive comments
- ❌ Trolling, insulting, or derogatory remarks
- ❌ Public or private harassment
- ❌ Publishing others' private information without permission
- ❌ Other conduct that could reasonably be considered inappropriate

### Enforcement

Violations of the Code of Conduct may result in temporary or permanent bans from the project.

---

## 🔒 Security

### Reporting Security Issues

**⚠️ DO NOT** open a public issue for security vulnerabilities.

Instead, please email security concerns to: [security@example.com]

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work with you to resolve the issue.

### Security Best Practices

- 🔐 Use strong, unique JWT secrets in production
- 🔐 Never commit `.env` files or secrets
- 🔐 Use HTTPS in production
- 🔐 Implement rate limiting
- 🔐 Keep dependencies updated
- 🔐 Use parameterized queries (Prisma handles this)
- 🔐 Validate and sanitize all inputs
- 🔐 Use secure password hashing (Argon2)

---

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use production database (PostgreSQL/MySQL)
- [ ] Set strong, unique JWT secrets
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable logging and monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Use environment-specific configs

### Deployment Options

#### Docker (Recommended)

```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "start:prod"]
```

#### Platform-Specific Guides

- **Heroku**: [Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- **AWS**: Use AWS Elastic Beanstalk or ECS
- **DigitalOcean**: Use App Platform or Droplets
- **Vercel**: [Guide](https://vercel.com/docs)
- **Railway**: [Guide](https://docs.railway.app)

---

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error

```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

#### Port Already in Use

```bash
# Change PORT in .env file
PORT=3000
```

#### JWT Token Errors

- Verify `JWT_SECRET` and `JWT_REFRESH_SECRET` are set
- Ensure tokens haven't expired
- Check token format in Authorization header

#### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
yarn install
# OR
npm install
```

### Getting Help

1. Check existing [Issues](https://github.com/yourusername/light-notes-endpoint/issues)
2. Search [Discussions](https://github.com/yourusername/light-notes-endpoint/discussions)
3. Open a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Expected vs actual behavior

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

- 📖 **Documentation**: Check this README and Swagger docs
- 🐛 **Bug Reports**: [Open an Issue](https://github.com/yourusername/light-notes-endpoint/issues)
- 💡 **Feature Requests**: [Open an Issue](https://github.com/yourusername/light-notes-endpoint/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/light-notes-endpoint/discussions)
- 📧 **Email**: [your-email@example.com]

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- All contributors who help improve this project

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/light-notes-endpoint)
![GitHub issues](https://img.shields.io/github/issues/yourusername/light-notes-endpoint)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/light-notes-endpoint)
![GitHub stars](https://img.shields.io/github/stars/yourusername/light-notes-endpoint?style=social)

---

<div align="center">

**Made with ❤️ by the community**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#-light-notes-api)

</div>
