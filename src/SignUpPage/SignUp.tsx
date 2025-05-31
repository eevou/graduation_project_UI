import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import img2 from '../assets/image2.png';

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleBackToLogin = () => {
        navigate('/login'); // ✅ هنا بيروح على صفحة اللوج إن
    };

    return (
        <div className="create-account-container">
            <div className="lightbulb-icon">
                <img src={img2} alt="" />
            </div>

            <h1 className="title">Create New Account</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="fullName" className="label">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        className="input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="input"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Create Account
                </button>
            </form>

            <button onClick={handleBackToLogin} className="back-to-login">
                Back to login
            </button>
        </div>
    );
};

export default SignUp;
