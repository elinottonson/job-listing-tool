import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './../styles/Dashboard.css';

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
