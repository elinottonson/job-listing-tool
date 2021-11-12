import './../styles/Header.css';
import logo from './../images/ukglogo.png';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='header'>
      <nav>
        <div className='header-left'>
          <div id='header-title'><img src={logo} alt='UKG Logo'/></div>
          <p id='header-title-text'>Referrals</p>
        </div>
        <div className='header-right'>
          <div className='header-btn' id='help-text'><a>Help</a></div>
          <FaRegBell className='header-btn header-icon' id='notification-icon'/>
          <FaRegUserCircle className='header-btn header-icon' id='user-icon'/>
        </div>
      </nav>    
    </div>
  );
};

export default Header;
