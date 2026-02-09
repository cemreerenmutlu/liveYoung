import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
    });

    const { username, email, password, phone } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                console.log('Signup successful:', data.message);
                // TODO: Redirect to login or show a success message.
            } else {
                console.error('Signup failed:', data.error);
                // TODO: Show an error message to the user.
            }
        } catch (err) {
            console.error('An error occurred during signup:', err);
            // TODO: Handle network errors.
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <p>Create your account. We'll ask for your name and birthdate in the future!</p>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={onChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input type="tel" name="phone" value={phone} onChange={onChange} />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default SignupPage;