import React from 'react';
import './../styles/Dashboard.css'
import { FaSearch } from 'react-icons/fa'

const DashboardNav = () => {
  return (
    <div className='dashboard-nav'>
      <form className='dashboard-search'>
        <input type='text' placeholder='Search...' className='search-box'></input>
        <button type='submit'><FaSearch id='search-icon'/></button>
      </form>
    </div>
  );
};

export default DashboardNav;
