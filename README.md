# Book Catalog Application

This is a frontend application for managing a book catalog built with React, Vite, and Tailwind CSS. It allows users to view, search, add, edit, and delete books, with features such as basic pagination, search functionality, and toast notifications.

## Features
- Display a catalog of books with details like title, author, genre, and year.
- Add new books to the catalog.
- Edit book details.
- Delete books from the catalog.
- Search books by title or author.
- Pagination for browsing through the catalog.
- Basic routing with React Router for navigation.
- Toast notifications for feedback on actions.

## Project Structure

- `src/components`: Contains the core components for the application:
  - `BookList`: Displays the list of books with pagination and search functionality.
  - `AddBookForm`: A form to add new books.
  - `EditBookForm`: A form to edit book details.
  - `NavBar`: The main navigation bar with search functionality.
  - `SearchProvider`: Context provider for managing the search query across components.

- `src/services/api.js`: Defines functions for interacting with a simulated API that fetches, adds, updates, and deletes books, with data persisted in `localStorage`.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (version 14 or above)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```node.js
   git clone <your-repo-url>
2. Navigate into the project directory:
   ```node.js
   cd book-catalog
3. Install dependencies:
   ```node.js
   npm install

## Running the Application
1. Start the development server:
   ```node.js
   npm run dev
2. Open http://localhost:3000 in your browser to view the app.

## Technologies Used
- React: UI framework for building components and managing application state.
- Vite: Development build tool for fast setup and hot reloading.
- Tailwind CSS: Utility-first CSS framework for styling.
- React Router: Routing library for managing navigation.
- React Toastify: Provides toast notifications for action feedback.
- LocalStorage: Persistent storage for saving book data between sessions.

## Project Setup Notes
Data is initially seeded from a books.json file and stored in localStorage. Any changes made (additions, updates, deletions) will persist through localStorage.