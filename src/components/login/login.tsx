import React, { useState } from 'react';
import "./style.css";
import config from '../config/config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../authentication/Auth-context';
import * as _ from 'lodash';

const Login = () => {
    const {token, login} = useAuth();
    const navigate = useNavigate();
    
    if (token) {
        navigate("/");
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState<string | null>(null);
    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.backendUrl}/auth/login`, {
                email,
                password,
            });
            const token = response.data.token;
            login(token);
            navigate(-1);
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
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
                {error && (<p style={{color:'red', fontSize:"14px"}}>{error}</p>)}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
