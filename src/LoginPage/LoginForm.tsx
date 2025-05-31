import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ أضف ده
import './LoginForm.css';
import image1 from '../assets/image2.png';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { username, password, rememberMe });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="crown-icon"><img src={image1} alt="" /></div>
                <h1 className="login-title">Administrator Login</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="input-field"
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

                <div className="new-admin">
                    <span>New administrator?</span>
                </div>

                {/* ✅ استخدم Link بدل <a href> */}
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
