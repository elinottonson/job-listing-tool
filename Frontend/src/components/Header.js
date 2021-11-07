import React from 'react';
import './../styles/Header.css';
import logo from './../images/ukglogo.png';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';

const Header = () => {

  return (
    <div className='header'>
      <nav>
        <div className='header-left'>
          <div id='header-title'><img src={logo} alt='UKG Logo' /></div>
          <p id='header-title-text'>Referrals</p>
        </div>
        <div className='header-right'>
          <div className='header-btn' id='help-text'><a>Help</a></div>
          <FaRegBell className='header-btn header-icon' id='notification-icon' />
          <div class="dropdown">
            <button class="dropbtn">
              <FaRegUserCircle id='user-icon' />
            </button>
            <div class="dropdown-content">
              <a onClick={logout}>Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const logout = () => {
  console.log('attempting logout');
  const options = {
    method: 'DELETE'
  };

  fetch('/logout', options)
    .then((res) => {
      window.location.href = '/';
    })
    .catch(e => { throw e; });
};

export default Header;
