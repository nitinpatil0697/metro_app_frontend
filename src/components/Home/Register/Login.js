import React, { useState } from 'react';
import './Login.css';  // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../utils/ApiHandlers';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors

        try {
            const response = await postData('http://localhost:8080/user/login', { email, password });

            // Assuming the token is returned in the response data as 'token'
            const { token, name , userEmail } = response.data.result;

            // Save the token to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('name', name)
            localStorage.setItem('email', userEmail)

            // Redirect or update UI after successful login
            console.log('Logged in successfully');
            navigate('/');
            // You can use `window.location` to redirect or update state to navigate
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
