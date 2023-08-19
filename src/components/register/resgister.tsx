import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import { useAuth } from '../authentication/Auth-context';
import axios from 'axios';
import config from '../config/config';

const Register = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    navigate('/');
  }

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${config.backendUrl}/users/createUser`, {
        email,
        username,
        password
      })
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && (<p style={{ color: 'red', fontSize: "14px" }}>{error}</p>)}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
