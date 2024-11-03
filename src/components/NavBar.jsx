import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SearchContext } from './SearchProvider';

const NavBar = () => {
    const { searchQuery, setSearchQuery } = useContext(SearchContext);

    return (
        <div className='bg-gray-700 text-white md:h-14 p-3'>
            <nav className='container mx-auto flex justify-end items-center  md:text-xl md:gap-4 gap-2'>
                <div className="flex justify-center items-center">
                    <input type="text" className="text-black px-4 py-1 text-base font-extralight outline-none rounded-2xl mr-4" placeholder="Search by title or author" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Link to='/add'><button className='text-nowrap'>Add a Book</button></Link>
                <Link to='/'><button className='mr-1'>Home</button></Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;
