# Shortify Express

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

A high-performance URL shortener service built with Express.js, TypeScript, and Prisma. Features include user authentication, secure link management, and fast redirection using Redis caching.

## 🚀 Features

- **URL Shortening**: Create custom or auto-generated short URLs.
- **High Performance**: Redirection is optimized with Redis caching for ultra-fast response times.
- **Authentication**: Secure user registration and login using JWT (JSON Web Tokens) and Bcrypt.
- **Token Management**: Implementation of access and refresh tokens for persistent sessions.
- **Validation**: Strict request validation using Zod.
- **Persistence**: SQLite database with Prisma ORM for reliable data storage.

## 🛠️ Tech Stack

- **Backend**: ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB) [Express.js](https://expressjs.com/)
- **Language**: ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white) [TypeScript](https://www.typescriptlang.org/)
- **Database**: ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white) [Prisma](https://www.prisma.io/) (with SQLite)
- **Caching**: ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=flat-square&logo=redis&logoColor=white) [Redis](https://redis.io/)
- **Authentication**: [JWT](https://jwt.io/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Validation**: [Zod](https://zod.dev/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Redis](https://redis.io/download) server running locally or accessible via URL

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/shortify-express.git
    cd shortify-express
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    DATABASE_URL="file:./dev.db"
    REDIS_URL="redis://localhost:6379"
    ACCESS_TOKEN_SECRET="your_access_token_secret"
    REFRESH_TOKEN_SECRET="your_refresh_token_secret"
    ```

4.  **Database Migration**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

### Running the App

- **Development mode**:

  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm run build
  npm start
  ```

## 🛤️ API Endpoints

### Auth

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive tokens
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Invalidate refresh token

### Links

- `GET /links` - List all links for current user
- `POST /links/create` - Create a new short link
- `DELETE /links/delete` - Delete a short link

### Redirection

- `GET /:shortUrl` - Redirect to the original URL

## 📂 Project Structure

```text
src/
├── controllers/    # Request handlers
├── routes/         # Express routes
├── schema/         # Zod validation schemas
├── database/       # DB client & Redis initialization
├── utils/          # Helper functions/constants
└── server.ts       # Application entry point
```

## 📜 License

This project is licensed under the [ISC License](LICENSE).
