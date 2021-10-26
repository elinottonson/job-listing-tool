import React from 'react';
import './../styles/Dashboard.css'
import { FaSearch } from 'react-icons/fa'

const DashboardNav = () => {
    return (
        <div>
            <form class='dashboard-search'>
                <input type='text' placeholder='Search...'></input>
                <button type='submit'><FaSearch id='search-icon'/></button>
            </form>
        </div>
    );
}

export default DashboardNav;
