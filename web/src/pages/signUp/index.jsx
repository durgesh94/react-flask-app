import React, { useState } from "react";
import './signUp.css';
import { useAuth } from "../../providers/authProvider";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { register, loading, error } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
    }

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    {error && <p className="error">{error.message}</p>}
                    <button
                        type="submit"
                        disabled={loading}>
                        {loading ? 'Signing...' : 'Sign Up'}
                    </button>
                    <p>
                        <Link to="/">Sign In</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}