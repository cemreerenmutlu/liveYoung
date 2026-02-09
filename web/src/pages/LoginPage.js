import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        // TODO: Implement login logic by sending data to a /api/login endpoint
        console.log('Login attempt with:', formData);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage;