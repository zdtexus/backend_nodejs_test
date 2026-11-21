# Social Network API

REST API for a small social network where users register, write posts, comment, like posts and follow each other.

Client: [frontend_react_test](https://github.com/zdtexus/frontend_react_test)

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [API reference](#api-reference)
- [Data model](#data-model)
- [Project structure](#project-structure)

## Features

- Registration and login with JWT; passwords are hashed with bcrypt
- A generated avatar for every new user (jdenticon), which the user can replace with an upload
- Posts, comments and likes
- Following other users
- Docker image

## Getting started

### Prerequisites

- Node.js 18 or later
- A MongoDB database. Prisma needs a replica set, so use MongoDB Atlas or a local replica set.

### Installation

```bash
git clone https://github.com/zdtexus/backend_nodejs_test.git
cd backend_nodejs_test
npm install
npx prisma generate
```

### Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL="mongodb+srv://user:password@cluster/dbname"
SECRET_KEY=your_jwt_secret
PORT=3000
```

### Running

```bash
npm run dev      # with nodemon
npm start        # without reload
```

The API runs on `http://localhost:3000`.

### Running with Docker

```bash
docker build -t social-api .
docker run -p 3000:3000 --env-file .env social-api
```

## API reference

Endpoints marked "Yes" in the Auth column need an `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | No | Create an account |
| `POST` | `/login` | No | Log in and receive a JWT |
| `GET` | `/current` | Yes | Get the current user |
| `GET` | `/users/:id` | Yes | Get a user profile |
| `PUT` | `/users/:id` | Yes | Update a profile, including the avatar |
| `POST` | `/posts` | Yes | Create a post |
| `GET` | `/posts` | Yes | List all posts |
| `GET` | `/posts/:id` | Yes | Get a post with its comments |
| `DELETE` | `/posts/:id` | Yes | Delete a post |
| `POST` | `/comments` | Yes | Add a comment |
| `DELETE` | `/comments/:id` | Yes | Delete a comment |
| `POST` | `/like` | Yes | Like a post |
| `DELETE` | `/like/:id` | Yes | Remove a like |
| `POST` | `/follow` | Yes | Follow a user |
| `DELETE` | `/unfollow/:id` | Yes | Unfollow a user |

## Data model

| Model | Description |
|---|---|
| `User` | Account, profile and avatar |
| `Post` | A user's post |
| `Comment` | A comment on a post |
| `Like` | A user's like on a post |
| `Follows` | A follower and the user they follow |

The full schema is in [`prisma/schema.prisma`](prisma/schema.prisma).

## Project structure

```text
controllers/   Route handlers, one per resource
middleware/    JWT authentication
prisma/        Schema and Prisma client
routes/        Route definitions and upload config
uploads/       User avatars
bin/www        Server entry point
```
