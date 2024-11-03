import React, { useState } from 'react';
import { addBook } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !year) {
      setError('All fields are required');
      return;
    }
    addBook({ title, author, genre, year }).then(() => {
      // Redirect to the home page after adding the book
      toast.info('Added Sucessfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }).catch(() => {
      setError('An error occurred while adding the book.');
    });
  };

  return (
    <>
 <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <div className='min-h-screen bg-gray-400 flex items-center justify-center'>
    <form onSubmit={handleSubmit} className='flex flex-col rounded-lg p-10 bg-white w-[50vw] shadow-2xl'>
      <h2 className='text-center text-4xl font-bold mb-6'>Add a new Book</h2>
      <input className='input_style mx-4 my-2' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className='input_style mx-4 my-2' placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input className='input_style mx-4 my-2' placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input className='input_style mx-4 my-2' placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
      <button className=' mx-4 my-3 mt-5 btn_Style' type="submit">Add Book</button>
      {error && <p>{error}</p>}
    </form>
    </div>
    </>
  );
};

export default AddBookForm;
