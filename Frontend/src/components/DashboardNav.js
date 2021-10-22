import React from 'react';
import './../styles/Nav.css'

const DashboardNav = () => {
    return (
        <div className='nav'>
            <form class='dashboard-search'>
                <input type='text' class='search' placeholder='Search...' id='searchbar'/>
                <input type='submit' value='Search' id='search-button'/>
            </form>
        </div>
    );
}

export default DashboardNav;
