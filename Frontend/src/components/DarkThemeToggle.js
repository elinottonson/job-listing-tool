import { FaSun, FaMoon } from 'react-icons/fa';

const DarkThemeToggle = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className='dark-theme-toggle'>
      {
        darkTheme ? 
          <FaSun 
            className='header-btn header-icon' 
            id='dark-theme-toggle-off' 
            onClick={() => {
              window.localStorage.setItem('darkTheme', 'false');
              setDarkTheme(false);
              document.documentElement.setAttribute('dark-theme', 'false');
            }}
          /> :
          <FaMoon 
            className='header-btn header-icon' 
            id='dark-theme-toggle-on'
            onClick={() => {
              window.localStorage.setItem('darkTheme', 'true');
              setDarkTheme(true);
              document.documentElement.setAttribute('dark-theme', 'true');
            }}
          />
      }
    </div>
  );
};

export default DarkThemeToggle;
