import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './LoginForm.css';
import image1 from '../assets/image2.png';
import api from '../Services/api';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const criteria = { 
            email: email.trim(),
            password: password,
        }
        
        try {
            const request = await api.post("/Accounts/login", criteria);
            console.log("Login successful:", request.data);
            window.location.href = "/"; 
        } catch (error) {
            console.error("Login failed:", error);
            setMessage(error.response.data.message)
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="crown-icon"><img src={image1} alt="" /></div>
                <h1 className="login-title">Administrator Login</h1>
                <p style={{color: "red"}}>{message}</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="input-field"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="input-field"
                            required
                        />
                    </div>

                    <div className="checkbox-group">
                        <div className="checkbox-container">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="checkbox-input"
                            />
                            <label htmlFor="remember" className="checkbox-label">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">Forgot your password?</a>
                    </div>

                    <button type="submit" className="signin-button">
                        Sign in
                    </button>
                </form>

                <Link to="/signup">
                    <button type="button" className="create-account-button">
                        Create new account
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
