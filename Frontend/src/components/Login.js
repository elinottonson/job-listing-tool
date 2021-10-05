import React from "react";

const Login = ({ setUser }) => {

  const [userInput, setUserInput] = React.useState({ email: '', password: '' });

  const validateAndSetUser = (user) => {
    // TODO: validate user object

    // set user if valid
    setUser(user);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserInput(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //checks to see if email or password have invalid characters such as quotations
    if (!(/^(?!.*['"]).*/.test(userInput['email'])) || !(/^(?!.*['"])/.test(userInput['password']))) {
      console.log(/^(?!.*['"*&^%$#!]).*/.test(userInput['email']));
      alert("Invalid Characters Entered!");
    }
    //basic check to see if email contains an @ sign surrounded by non-empty characters
    else if (!((/\S+@\S+\.\S+/.test(userInput['email'])))) {
      alert("Invalid Email Entered!");
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

      fetch("/api/login", options)
        .then((res) => {
          console.log(res);
          return res.json()
        })
        .then((data) => {
          console.log("Received Response:")
          console.log(data)
          validateAndSetUser(data)
        })
        .catch(e => { throw e; });
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <label for="email">Email:</label><br />
        <input type="text" onChange={handleChange} id="fname" name="email" />
        <br/>
        <label for="password">Password:</label>
        <br/>
        <input type="password" onChange={handleChange} id="lname" name="password" />
        <br/>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Login;