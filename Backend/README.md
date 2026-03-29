# Task Manager API

A simple task management backend where users can create and manage their tasks, and admins can oversee everything.

## What it does
- Users can sign up and log in
- Each user can create, view and update their own tasks
- Admins can view and delete any task
- Passwords are hashed and auth is handled via JWT tokens

## Tech used
- Node.js + Express
- MongoDB
- JWT + bcrypt

## How to run it locally

1. Clone the repo and go into the Backend folder
2. Run `npm install`
3. Create a `.env` file with:
```
   DB_URL=your_mongodb_url
   JWT_SECRET=your_secret
```
4. Run `npm run dev`
5. Server starts on http://localhost:3000

## API Endpoints

**Auth**
- `POST /api/v1/auth/signup` — create an account
- `POST /api/v1/auth/signin` — log in and get a token

**Tasks** (requires token in Authorization header)
- `POST /api/v1/tasks` — create a task
- `GET /api/v1/tasks` — get your tasks
- `GET /api/v1/tasks/:id` — get one task
- `PUT /api/v1/tasks/:id` — update a task
- `DELETE /api/v1/tasks/:id` — delete a task (admin only)

## Testing
Postman collection is in the `/postman` folder.
Just import it and you're good to go.

## Scaling this up
This project is structured in a way that makes it easy to grow —
new routes and features can be added without touching existing code.
Down the line it could be split into microservices, use Redis for
caching, or be deployed with Docker behind a load balancer.