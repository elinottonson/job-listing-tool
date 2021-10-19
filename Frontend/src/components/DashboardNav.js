import React from 'react';
import './../styles/Navbar.css'

const DashboardNav = () => {
    return (
        <nav class='navbar'>
            <div class='nav-left'>
                <a>Home</a>
                <a>Referrals</a>
            </div>
            <div class='nav-right'>
                <a>Help</a>
                <a>Notifications</a>
                <a>User</a>
            </div>
        </nav>
    );
}

export default DashboardNav;
