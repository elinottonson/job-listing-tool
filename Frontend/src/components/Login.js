import React from 'react';
import './../styles/Login.css';

import { isValidUser, isValidEmail } from '../lib/Validation';

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
const Login = ({ setUser }) => {

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

    if(!validEmail) {
      setErrorMsg({ error: true, msg: 'Please enter a valid email.'});
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
        .then((res) => {
          console.log(res);
          console.log(res.status);
          return res.json();
        })
        .then((data) => {
          console.log('Received Response:');
          console.log(data);
          if(Object.keys(data).includes('Error')) {
            setErrorMsg({ error: true, msg: data.Error });
            setLoading(false);
          }
          else {
            if(isValidUser(data.user)) {
              setUser(data.user);
            }
            setLoading(false);
          }
        })
        .catch(e => { throw e; });
    }
  };

  /* 
    This is a workaround for being able to validate the email when using auto-fill
    Credit to this guy: https://flaviocopes.com/react-form-browser-autofill/
  */
  React.useEffect(() => {
    let interval = setInterval(() => {
      if(emailText.current) {
        setUserInput(v => ({ ...v, email: emailText.current.value }));
        if(emailText.current.value !== '') {
          setValidEmail(isValidEmail(userInput.email));
        }
        clearInterval(interval);
      }
    }, 100);
  });

  /*
    You'll notice that the <input> for email uses 'ref' instead of 'onChange'. 
    This is to accomodate the workaround seen above.
  */
  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' ref={emailText} id={
          validEmail || !userInput.email.length ? 'email-valid' : 'email-invalid'
        } />
        <label htmlFor='password'>Password:</label>
        <input type='password' onChange={handleChange} id='password' name='password' />
        <p id='err-msg'>{errorMsg.error ? errorMsg.msg : ''}</p>
        <p id='forgot-password'>Forgot Password?</p>
        <input type='submit' value={loading ? 'Loading...' : 'Submit'} id='submit'/>
      </form>
    </div>
  );
};

export default Login;