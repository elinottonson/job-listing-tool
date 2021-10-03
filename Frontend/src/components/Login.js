import React from "react";

const Login = () => {    
    const [data, setData] = React.useState({ email: '', password: '' });

    const handleChange = (event) => {
        setData({ email: event.target.value, password: event.target.value })
    };

    const handleSubmit = (event) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: body
        };
        fetch("/api/login", options)
            .then((res) => res.json())
            .then((data) => {
                setData(data.message)
                console.log(data)
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label for="email">Email:</label><br/>
                <input type="text" id="fname" name="email"/><br/>
                <label for="password">Password:</label><br/>
                <input type="password" id="lname" name="password"/>
                <input type='submit' value='Submit'/>
            </form> 
        </div>
    );
}

export default Login;