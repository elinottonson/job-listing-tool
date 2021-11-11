import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './../styles/Dashboard.css';

const DashboardNav = () => {
  return (
    <div className='dashboard-nav'>
      <form className='dashboard-search' onSubmit={handleSearchSubmit}>
        <input type='text' placeholder='Search...' className='search-box'></input>
        <button type='submit'><FaSearch id='search-icon'/></button>
      </form>
    </div>
  );
};

//searches based on values submitted from DashboardNav form
const handleSearchSubmit = (event) =>{
  event.preventDefault();
  //get text from the searchbox
  let searchInput = event.target[0].value;
};

export default DashboardNav;
