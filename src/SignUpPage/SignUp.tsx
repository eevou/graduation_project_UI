import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./SignUp.css";
import img2 from "../assets/image2.png";
import api from "../Services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const criteria = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      comfimredPassword: formData.confirmPassword,
    };

    try {
      const response = await api.post("/Accounts/register", criteria);
      console.log("Registration successful:", response);

      window.location.href = "/"; 
    } catch (err) {
      console.error(err.response?.data.message);
      setError(err.response?.data.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="create-account-container">
      <div className="signIn-content">
        <div className="lightbulb-icon">
          <img src={img2} alt="" />
        </div>

        <h1 className="title">Create New Account</h1>
        {error && (
          <p style={{ color: "red" }} className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="signIn-form-group">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="input"
              required
            />
          </div>

          <div className="signIn-form-group">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="input"
              required
            />
          </div>

          <div className="signIn-form-group">
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="input"
              required
            />
          </div>

          <div className="signIn-form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="input"
              required
            />
          </div>

          <div className="signIn-form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="password"
              className="input"
              required
            />
          </div>

          <div className="signIn-form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirmed password"
              className="input"
              required
            />
          </div>

          <button type="submit" className="signIn-submit-button">
            {loading ? (
              <div className="spinner" />
            ) : (
              <>
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <button onClick={handleBackToLogin} className="back-to-login">
          Back to login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
