# Todo App

A minimal Next.js todo application with MongoDB persistence and toast notifications.

Live demo: https://todo-brown-phi-23.vercel.app/

## Features

- Dark UI with clean minimal styling
- MongoDB backend using Mongoose
- API routes for create, read, update, and delete operations
- Toast notifications using `react-toastify`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your MongoDB connection string:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## Project Structure

- `app/page.js` — frontend UI and API integration
- `app/api/route.js` — Next.js API route for todos
- `lib/db.js` — MongoDB connection helper
- `models/Todo.js` — Mongoose todo schema

## Notes

- This app uses `react-toastify` for toast notifications.
- Make sure MongoDB is running locally before starting the app.
- If you change the DB URL, update `MONGODB_URI` in `.env`.

## Troubleshooting

- If the app cannot connect to MongoDB, verify the local MongoDB service is running.
- Check the browser console and terminal for API or database errors.

## Learn More



For more on Next.js, visit the [Next.js documentation](https://nextjs.org/docs).
