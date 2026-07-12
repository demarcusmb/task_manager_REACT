import { useState } from "react";

export default function UserLogin({ onSubmit })
{
    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!userName.trim() || !password.trim() ){
            return;
        }

        onSubmit(userName, password);

        setUserName("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter User Name"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />

            <button type="submit">
                Login
            </button>
        </form>
    )
}