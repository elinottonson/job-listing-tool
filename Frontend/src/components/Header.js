import React from 'react';
import './../styles/Header.css';
import logo from './../images/ukglogo.png';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';
import DarkThemeToggle from './DarkThemeToggle';

const Header = ({ darkTheme, setDarkTheme }) => {

  return (
    <div className='header'>
      <nav>
        <div className='header-left'>
          <div id='header-title'><img src={logo} alt='UKG Logo' /></div>
          <h1>Job Referral Page</h1>
        </div>
        <div className='header-right'>
          <div className='header-btn help-text'><a>Help</a></div>
          <DarkThemeToggle darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <FaRegBell className='header-btn header-icon' id='notification-icon' />
          <div
            className='header-btn help-text'
            onClick={logout}
            onKeyPress={(e) => { if (e.code == 'Enter') logout(); }}
            tabIndex="0">Logout
          </div>
        </div>
      </nav>
    </div>
  );
};

const logout = () => {
  console.log('attempting logout...');
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
