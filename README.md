# E-Lib

E-Lib is a backend API for managing users and books. It is built with Node.js, Express, TypeScript, and MongoDB using Mongoose.

## Features

- User management API
- Book management API
- MongoDB integration with Mongoose
- Centralized error handling
- JSON request/response support
- Swagger API documentation
- TypeScript-based development

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Swagger UI Express

## Project Structure

```text
src/
├── app.ts
├── config/
│   └── swagger.ts
├── middleWare/
│   └── glodbalErrorHandeler.ts
├── user/
│   ├── user.router.ts
│   ├── user.controller.ts
│   └── user.model.ts
└── book/
    ├── book.router.ts
    ├── book.controller.ts
    └── book.model.ts
```

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add the required environment variables, such as:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
```

## Running the Project

Start the development server using the script configured in `package.json`:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The API will be available at:

```text
http://localhost:5000
```

## API Routes

### Users

```text
/api/user
```

### Books

```text
/api/books
```

### API Documentation

Swagger documentation is available at:

```text
http://localhost:5000/api/docs
```

## Health Check

To verify that the server is running, visit:

```text
GET /
```

Example response:

```json
{
  "success": true,
  "message": "Server Running On 5000"
}
```

## Development Notes

- Use TypeScript for new source files.
- Keep user-related functionality inside the `user` module.
- Keep book-related functionality inside the `book` module.
- Update the Swagger configuration when adding or changing API endpoints.
- Store sensitive configuration values in `.env` files.

## License

This project is for educational and development purposes.
