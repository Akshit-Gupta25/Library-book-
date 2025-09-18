
## Library Book Management System

This is a full-stack web application for managing a library's book inventory. It provides features for both administrators and users to manage and interact with the library's collection.

-----

### Project Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Akshit-Gupta25/Library-book-.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Library-book-
    ```
3.  **Install backend dependencies:**
    ```bash
    # Assuming you have a backend folder, navigate to it
    cd backend
    npm install
    ```
4.  **Install frontend dependencies:**
    ```bash
    # Assuming you have a frontend folder, navigate to it from the root
    cd ../frontend
    npm install
    ```
5.  **Set up environment variables:**
    Create a `.env` file in your backend directory and add the following:
    ```
    PORT=your_port_number
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
6.  **Run the application:**
      * **Backend:** From the `backend` directory, run:
        ```bash
        npm start
        ```
      * **Frontend:** From the `frontend` directory, run:
        ```bash
        npm start
        ```

-----

### Technologies Used

  * **Frontend:**

      * **React:** A popular JavaScript library for building user interfaces. We chose React because of its component-based architecture, which allows for reusable UI elements and efficient development.
      * **Redux:** A predictable state container for JavaScript apps. We used Redux to manage the application's state in a centralized location, making it easier to track and debug.
      * **Axios:** A promise-based HTTP client for the browser and Node.js. Axios simplifies the process of making API requests from the frontend to the backend.

  * **Backend:**

      * **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js allows us to use JavaScript for server-side development, creating a unified language across the stack.
      * **Express.js:** A fast, unopinionated, minimalist web framework for Node.js. Express provides a robust set of features for building our RESTful APIs.
      * **MongoDB:** A NoSQL document-oriented database. We chose MongoDB for its flexibility and scalability, which is well-suited for our application's data structure.
      * **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. Mongoose helps us define schemas for our data and manage relationships between data.
      * **JSON Web Tokens (JWT):** A compact, URL-safe means of representing claims to be transferred between two parties. We use JWT for secure user authentication and authorization.

-----

### ER Diagram

Here is a text-based ER diagram for the database schema:

```
+-------------+       +-------------+       +---------------+
|    User     |-------|  Borrowing  |-------|      Book     |
+-------------+       +-------------+       +---------------+
| - userId    |       | - borrowId  |       | - bookId      |
| - username  |       | - userId    |       | - title       |
| - password  |       | - bookId    |       | - author      |
| - role      |       | - borrowDate|       | - genre       |
+-------------+       | - returnDate|       | - available   |
                      +-------------+       +---------------+
```

-----

### API Endpoints

| HTTP Method | Route                  | Purpose                               |
|-------------|------------------------|---------------------------------------|
| **POST** | `/api/auth/signup`     | Register a new user                   |
| **POST** | `/api/auth/login`      | Log in a user and get a JWT token     |
| **GET** | `/api/books`           | Get a list of all books               |
| **GET** | `/api/books/:id`       | Get a single book by its ID           |
| **POST** | `/api/books`           | Add a new book (Admin only)           |
| **PUT** | `/api/books/:id`       | Update a book's information (Admin only)|
| **DELETE** | `/api/books/:id`       | Delete a book (Admin only)            |
| **POST** | `/api/books/borrow/:id`| Borrow a book (User only)             |
| **POST** | `/api/books/return/:id`| Return a borrowed book (User only)    |

-----

### Sample Seed Data

To quickly test the application, you can add some sample data to your database. Here are a few examples you can use:

**Users:**

```json
[
  {
    "username": "admin",
    "password": "admin_password",
    "role": "admin"
  },
  {
    "username": "testuser",
    "password": "user_password",
    "role": "user"
  }
]
```

**Books:**

```json
[
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "available": true
  },
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Classic",
    "available": true
  }
]
```
