import React from 'react';

import './../styles/Login.css';

const Login = ({ setUser }) => {

  // State Varaibles
  const emailText = React.useRef(null); // for auto-fill workaround
  const [userInput, setUserInput] = React.useState({ email: '', password: '' });
  const [validEmail, setValidEmail] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validateAndSetUser = (user) => {
    // TODO: validate user object

    // set user if valid
    setUser(user);
    setLoading(false);
  };

  // Called in handleChange() to check if the current email text is valid
  const validateEmail = (email) => {
    //checks to see if email or password have invalid characters such as quotations
    if (!(/^(?!.*['"]).*/.test(email)) || !(/^(?!.*['"])/.test(email))) {
      console.log(/^(?!.*['"*&^%$#!]).*/.test(userInput['email']));
      console.log("Invalid Characters Entered!");
      setValidEmail(false);
    }
    //basic check to see if email contains an @ sign surrounded by non-empty characters
    else if (!((/\S+@\S+\.\S+/.test(email)))) {
      console.log("Invalid Email Entered!");
      setValidEmail(false);
    }
    else {
      setValidEmail(true);
    }
  }

  // Called on every onChange event
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput(values => ({ ...values, [name]: value }));
  }

  // Called on the onSubmit event
  const handleSubmit = (event) => {
    event.preventDefault();

    if(!validEmail) {
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

      console.log(`Sending request...`);
      console.log(options.body);

      setLoading(true);

      fetch("/api/login", options)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log("Received Response:");
          console.log(data);
          validateAndSetUser(data);
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
          validateEmail(userInput.email);
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
      <form onSubmit={handleSubmit} className='login-form'>
        <label for='email'>Email:</label><br />
        <input type='email' name='email' ref={emailText} id={
          validEmail || !userInput.email.length ? 'email-valid' : 'email-invalid'
        } />
        <br/>
        <label for='password'>Password:</label>
        <br/>
        <input type='password' onChange={handleChange} id='password' name='password' />
        <br/>
        <input type='submit' value='Submit' id='submit'/>
      </form>
    </div>
  );
}

export default Login;