# Personnel API

> 🔐 Token-based Internal Personnel Management System  
> Built with 🧠 Node.js, Express & MongoDB

---

## 🚀 Project Description

The **PERSONNEL API** is a secure and minimal RESTful API designed to manage personnel and departments within an organization. It features authentication using JWT tokens, detailed CRUD operations, and API documentation via Swagger.

> ⚙️ Powered by: Node.js | Express | MongoDB  
> 🧪 Status: In active development  
> 📂 Repo: `personnel_api_nodejs`

---

## 📦 Features

- ✅ Token Authentication via JWT
- 🏢 Full CRUD for Departments
- 👤 Full CRUD for Personnel
- 🛡️ Role-based Access Control (Admin, Lead, Staff)
- 📎 Personnel-Department Relationships
- 📜 Automated Swagger Documentation
- 📊 Exposed Relational Data Endpoints

---

## 🔑 AUTHENTICATION PROTOCOL

All secured endpoints require a valid access token.

⛓️ Include your token in the header as follows:

```http
Authorization: Token your_token_key
```

To obtain a token, send a POST request to /auth/login with the following payload:

```
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}
```

## 📚 Main Endpoints

### 🧭 Departments

- GET /departments/ → List all departments

- POST /departments/ → Create a new department

- GET /departments/{id}/ → Retrieve details of a department

- PUT /departments/{id}/ → Update a department

- DELETE /departments/{id}/ → Remove a department

- GET /departments/{id}/personnels/ → List all personnel in a department

### 🧍 Personnels

- GET /personnels/ → List all personnel

- POST /personnels/ → Add new personnel

- GET /personnels/{id}/ → Retrieve details of a personnel

- PUT /personnels/{id}/ → Update personnel details

- DELETE /personnels/{id}/ → Remove a personnel

### 🔐 Authentication

- POST /auth/login → Login and get a JWT token

- GET /auth/logout → Logout and invalidate the token

### ⚙️ API Documentation

- GET /docs → Swagger auto-generated API docs

## 🧠 Developer

- 👤 **Name:** Celal Selim Binay

- 🕶️ **Handle:** D.Z.E.L

- 📫 **Email:** binaycelalselim@gmail.com

## 🛠️ Technologies Used

- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Swagger (via swagger-autogen)
- Morgan for HTTP logging
- dotenv for environment variables

#### ⚫ Brutally minimal. Functionally paranoid.

- Access is not granted. It is earned.
