import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log(email, password)
            localStorage.setItem('token', data.token);
            history.push('/');
        } catch (error) {
            console.error('Invalid email or password');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            localStorage.setItem('token', data.token);
            history.push('/login');
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    return (
        <div>
            <style>
                {`
                body {
                    font-family: 'Roboto', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background-color: #f0f2f5;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .form-container {
                    display: flex;
                    background: white;
                    width: 100%;
                    max-width: 900px;
                    min-height: 500px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    transition: all 0.6s ease-in-out;
                }

                .form-section {
                    flex: 1;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.6s ease-in-out;
                }

                .info-section {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .info-content {
                    max-width: 300px;
                }

                h1 {
                    font-size: 28px;
                    margin-bottom: 20px;
                    color: white;
                }

                h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #34495e;
                }

                p {
                    font-size: 16px;
                    margin-bottom: 30px;
                    line-height: 1.5;
                    color: white;
                }

                input {
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 15px;
                    border: 1px solid #bdc3c7;
                    border-radius: 5px;
                    font-size: 14px;
                    transition: border-color 0.3s ease;
                }

                input:focus {
                    border-color: #3498db;
                    outline: none;
                }

                .submit-btn, .toggle-btn {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease, transform 0.1s ease;
                }

                .submit-btn {
                    width: 100%;
                    margin-top: 10px;
                }

                .toggle-btn {
                    background: transparent;
                    border: 2px solid white;
                }

                .submit-btn:hover, .toggle-btn:hover {
                    background-color: #2980b9;
                    transform: translateY(-2px);
                }

                .toggle-btn:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                .show-signup .login-section {
                    transform: translateX(100%);
                }

                .show-signup .info-section {
                    transform: translateX(-100%);
                }

                @media (max-width: 768px) {
                    .form-container {
                        flex-direction: column;
                        height: auto;
                    }

                    .form-section {
                        width: 100%;
                        padding: 15px;
                    }

                    .info-section {
                        width: 100%;
                        min-height: 250px;
                    }
                    .info-section .left {
                        width: 80%;
                    }

                    .show-signup .login-section {
                        transform: translateY(100%);
                    }

                    .show-signup .info-section {
                        transform: translateY(-100%);
                    }

                    input {
                        width: calc(100% - 24px);
                        padding: 10px;
                        font-size: 16px;
                    }

                    .submit-btn, .toggle-btn {
                        width: 100%;
                        padding: 12px 0;
                        font-size: 16px;
                    }

                    h1 {
                        font-size: 24px;
                    }

                    h2 {
                        font-size: 20px;
                    }

                    p {
                        font-size: 14px;
                        margin-bottom: 20px;
                    }
                }
                `}
            </style>

            <div className={`form-container ${showSignUp ? 'show-signup' : ''}`}>
                <div className="form-section login-section">
                    <form onSubmit={showSignUp ? handleSignUp : handleLogin}>
                        <h2>{showSignUp ? 'Sign Up' : 'Log In'}</h2>
                        {showSignUp ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="submit-btn">Sign Up</button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="submit-btn">Log In</button>
                            </>
                        )}
                    </form>
                </div>
                <div className={`form-section info-section ${showSignUp ? 'right' : 'left'}`}>
                    <div className="info-content">
                        {showSignUp ? (
                            <>
                                <h1>Welcome Back!</h1>
                                <p>Already have an account? Log in to continue your journey with us</p>
                                <button className="toggle-btn" onClick={toggleForm}>Log In</button>
                            </>
                        ) : (
                            <>
                                <h1>Hello, Friend!</h1>
                                <p>New here? Sign up and start your journey with us</p>
                                <button className="toggle-btn" onClick={toggleForm}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
