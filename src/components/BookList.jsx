import React, { useState, useEffect, useContext } from 'react';
import { fetchBooks, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchContext } from './SearchProvider';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
      setLoading(false);
    };
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
      toast.info('Deleted Successfully', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  // Filter books based on searchQuery
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages based on filtered results
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Get current books to display
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    // Reset to page 1 if search query changes
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className='bg-gray-400'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
      <div className='container mx-auto w-full min-h-[88vh] p-4'>
        {loading ? (
          <div className='w-full h-[89vh] flex items-center justify-center'>
            <p>Loading books...</p>
          </div>
        ) : (
          <>
            {filteredBooks.length > 0 ? (
              <>
                <ul className='grid md:grid-cols-3 md:gap-14 gap-4 p-3'>
                  {currentBooks.map((book) => (
                    <li className='md:h-[38vh] flex flex-col items-center justify-center py-12 rounded-xl bg-white shadow-2xl' key={book.id}>
                      <div><img className='w-32 mb-4 rounded-xl' src="https://oxfordbookstore.com/public/uploads/product_images/9789355204196.jpg" alt="book cover" /></div>
                      <span className='text-lg font-semibold text-center'>{book.title} by {book.author}</span>
                      <span className='text-base font-extralight text-gray-500 mb-3'><i>{book.genre}, {book.year}</i></span>
                      <div className='flex gap-3'>
                        <Link to={`/edit/${book.id}`} className='btn_Style px-3'><button>Edit</button></Link>
                        <button className='btn_Style px-3' onClick={() => handleDelete(book.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className='flex justify-center'>
                  <div className='flex justify-center items-center mt-6 fixed bottom-3'>
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`hover:text-white px-4 py-2 mx-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                      Previous
                    </button>
                    <span className='mx-4'>Page {currentPage} of {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`hover:text-white px-4 py-2 mx-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                      Next
                    </button>
                      </div>
                  </div>
                )}
              </>
            ) : (
              <div className='w-full h-[89vh] flex items-center justify-center'>
                <p>No results found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookList;
