import './../styles/Header.css';
import logo from './../images/ukglogo.png';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';

// TODO: Implement Header
const Header = () => {
    return (
        <div className='header'>
            <nav>
                <div>
                    <a ><img src={logo} alt='UKG Logo'/></a>
                    <a>Referrals</a>
                </div>

                <div>
                    <a>Help</a>
                    <a><FaRegBell id='notification-icon'/></a>
                    <a><FaRegUserCircle id='user-icon'/></a>
                </div>
            </nav>            
        </div>
    );
}

export default Header;
