import booksData from '../books.json'; // Adjust path if necessary

const STORAGE_KEY = 'booksCatalog';

// Initialize local storage with books.json data if it doesn't already exist
const initializeLocalStorage = () => {
  const storedBooks = localStorage.getItem(STORAGE_KEY);
  if (!storedBooks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData));
  }
};

// Call the function to ensure local storage is initialized
initializeLocalStorage();

// Helper function to retrieve books from local storage
const getBooksFromStorage = () => {
  const storedBooks = localStorage.getItem(STORAGE_KEY);
  return storedBooks ? JSON.parse(storedBooks) : [];
};

// Helper function to save books to local storage
const saveBooksToStorage = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

// Fetch books from local storage
export const fetchBooks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getBooksFromStorage()), 200); // Simulating delay
  });
};

// Add a new book and update local storage
export const addBook = async (book) => {
  const newBook = { id: Date.now(), ...book };
  const books = getBooksFromStorage();
  books.push(newBook);
  saveBooksToStorage(books);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newBook), 200); // Return the added book with delay
  });
};

// Delete a book by ID and update local storage
export const deleteBook = async (id) => {
  let books = getBooksFromStorage();
  books = books.filter((book) => book.id !== id);
  saveBooksToStorage(books);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 200); // Simulate success response
  });
};

export const updateBook = async (book) => {
  // Get current books from local storage
  const books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
  // Update the book
  const updatedBooks = books.map(b => (b.id === book.id ? book : b));

  // Save the updated list back to local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
  return book; // Return updated book if needed
};
