import React from 'react';
import './../styles/Login.css';

import { isValidUser, isValidEmail } from '../lib/Validation';
import BringBackTendiesCredit from './BringBackTendiesCredit';
import logo from './../images/ukglogo.png';
import darklogo from './../images/darkukglogoed.png';
import bgImage from './../images/login-background.jpg';
import dmImage from './../images/darkmode_login_background3.jpg';
import DarkThemeToggle from './DarkThemeToggle';

/*
  email/pw for testing:
    email:  Elise_Larsen@techgenix.com
    pw:     larsenel
  user object from the backend:
    {
      "user": {
        "user": {
          "id": 10,
          "firstName": "Elise",
          "lastName": "Larsen",
          "employeeId": 10,
          "companyId": 3,
          "companyName": "Techgenix",
          "managerId": 4,
          "positionTitle": "Engineering Manager",
          "startDate": "1994-04-17",
          "isManager": true,
          "createdAt": "2021-10-08T02:23:25.064Z",
          "updatedAt": "2021-10-08T02:23:25.064Z"
        }
      }
    }
*/
const Login = ({ setUser , darkTheme, setDarkTheme}) => {

  // State Varaibles
  const emailText = React.useRef(null); // for auto-fill workaround
  const [userInput, setUserInput] = React.useState({ email: '', password: '' });
  const [validEmail, setValidEmail] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState({ error: false, msg: '' });
  const [loading, setLoading] = React.useState(false);

  // Called on every onChange event
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput(values => ({ ...values, [name]: value }));
  };

  // Called on the onSubmit event
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validEmail) {
      setErrorMsg({ error: true, msg: 'Please enter a valid email.' });
      setLoading(false);
    }
    else {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      };

      console.log('Sending login request...');
      setLoading(true);

      fetch('/api/login', options)
        .then(async (res) => {
          console.log(res);
          console.log(res.status);
          if(!res.ok){
            throw Error(await res.text());
          }
          return res.json();
        })
        .then((data) => {
          console.log('Received Response:');
          console.log(data);
          if(isValidUser(data)) {
            setUser(data);
          }
        })
        .catch((e) => {
          setErrorMsg({error: true, msg: e.message});
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  /* 
    This is a workaround for being able to validate the email when using auto-fill
    Credit to this guy: https://flaviocopes.com/react-form-browser-autofill/
  */
  React.useEffect(() => {
    let interval = setInterval(() => {
      if (emailText.current) {
        setUserInput(v => ({ ...v, email: emailText.current.value }));
        if (emailText.current.value !== '') {
          setValidEmail(isValidEmail(userInput.email));
        }
        clearInterval(interval);
      }
    }, 100);
  });

  const bgImageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundAttachment: 'fixed',
    minWidth: '100%',
    minHeight: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    transform: 'scale(1.03)',
    zIndex: '-5',
    position: 'fixed'
  };

  const dmImageStyle = {
    backgroundImage: `url(${dmImage})`,
    backgroundAttachment: 'fixed',
    minWidth: '100%',
    minHeight: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    transform: 'scale(1.03)',
    zIndex: '-5',
    position: 'fixed'
  };

  /*
    You'll notice that the <input> for email uses 'ref' instead of 'onChange'. 
    This is to accomodate the workaround seen above.
  */
  return (
    <div>
      { darkTheme ? <div style={dmImageStyle}></div> : <div style={bgImageStyle}></div>}
      <div className='extras'>
        <BringBackTendiesCredit />
      </div>
      <main className='login-center-container'>
        <div className='login-container'>
          <div className='logo-container'>
            {darkTheme ? 
              <img className='darkukglogo' src={darklogo} alt='UKG Logo' /> :
              <img className='ukglogo' src={logo} alt='UKG Logo' />}
          </div>
          <h1 id='login-page-h1'>Sign in</h1>
          <form onSubmit={handleSubmit} className='login-form'>
            <input
              className='inputForm'
              type='text'
              placeholder='Email'
              name='email'
              aria-label='email input for login'
              ref={emailText}
              id={validEmail || !userInput.email.length ? 'email-valid' : 'email-invalid'}
            />
            <input
              className='inputForm'
              type='password'
              placeholder='Password'
              onChange={handleChange}
              aria-label='password input for login'
              id='password'
              name='password'
            />
            <p id='err-msg'>{errorMsg.error ? errorMsg.msg : ''}</p>
            <a href='' id='forgot-password'>Forgot Password?</a>
            {/* ^^^ This should probably be a react-router <Link> eventually instead */}
            <input type='submit' tabIndex='0' value={loading ? 'Loading...' : 'Submit'} id='submit' />
          </form>
        </div>
        <div className='darkmode-toggle-container'>
          <div className='darkmode-toggle'>
            <DarkThemeToggle darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
          </div>
        </div>
      </main>
    </div>

  );
};

export default Login;