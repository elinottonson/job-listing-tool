import React from "react";

const Login = () => {    
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api/login")
            .then((res) => res.json())
            .then((data) => {
                setData(data.message)
                console.log(data)
            });
    }, [])

    return (
        <div>
            <form>
                <label for="fname">First name:</label><br/>
                <input type="text" id="fname" name="fname"/><br/>
                <label for="lname">Last name:</label><br/>
                <input type="text" id="lname" name="lname"/>
            </form> 
        </div>
    );
}

export default Login;