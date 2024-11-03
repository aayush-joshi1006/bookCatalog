import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBooks, updateBook, deleteBook } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBookForm = () => {
  const { id } = useParams(); // Get the book ID from the URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const books = await fetchBooks();
      const bookToEdit = books.find(book => book.id === parseInt(id));
      if (bookToEdit) {
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
        setGenre(bookToEdit.genre);
        setYear(bookToEdit.year);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !year) {
      setError('All fields are required');
      return;
    }
    const updatedBook = { id: parseInt(id), title, author, genre, year };

    try {
      await updateBook(updatedBook);
      toast.info('Edited Successfully', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      toast.error('Failed to update book');
    }
  };



  return (
    <>
      <ToastContainer />
      <div className='bg-gray-400 flex items-center justify-center min-h-screen'>
        <div className='flex justify-center items-center bg-white p-10 rounded-lg shadow-xl'>
          <div><img className='h-[70vh] rounded-xl' src="/bookcover.jpg" alt="" /></div>
          <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-96 p-7'>
            <h2 className='text-center text-4xl font-bold mb-6'>Edit Book</h2>
            <div className='flex flex-col items-start w-full my-2'>
              <label htmlFor="title">Title:*</label>
              <input name='title' className='input_style w-full' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className='flex flex-col items-start w-full my-2'>
              <label htmlFor="author">Author:*</label>
              <input name='author' className='input_style w-full' placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div className='flex flex-col items-start w-full my-2'>
              <label htmlFor="genre">Genre:</label>
              <input name='genre' className='input_style w-full' placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className='flex flex-col items-start w-full my-2'>
              <label htmlFor="year">Year:*</label>
              <input name='year' className='input_style w-full' placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
            </div>
              <button className='btn_Style w-full my-4' type="submit">Update</button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBookForm;
