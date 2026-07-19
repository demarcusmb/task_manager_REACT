import {useState} from "react";

export default function UserRegister({ onSubmit })
{
    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");

    // Prevents page reload
    // Prevents empty submissiosn
    // Sends data to App.jsx
    // Clears input after submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!userName.trim() || !password.trim()) return;

        onSubmit(userName, password, email);

        setUserName("");
        setPassword("");
        setEmail("");
    };

    return(
        <form onSubmit={ handleSubmit } className="task-form">
            <input
                type="text"
                value={ userName }
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter User Name"
            />

            <input
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                placeholder="Enter Password"
            />

            <input
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                placeholder="Enter Email (Optional)"
            />

            <button type="submit">
                Register User
            </button>
        </form>
    );
}