import React from 'react'
import { useEffect, useRef } from 'react';
import { failedMessage, successMessage } from '../js/alert.js'
import { validate } from '../js/validation.js';

const Loginform = ({ onLogin }) => {
    const signInRef = useRef(null);
    const signUpRef = useRef(null);
    const signInBtnRef = useRef(null);
    const signUpBtnRef = useRef(null);

    useEffect(() => {
        if (signUpRef.current) {
            validate(signUpRef.current);
        }
        if (signInRef.current) {
            validate(signInRef.current);
        }
    }, []);
    const loginUser = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            successMessage(data.message);
            setTimeout(() => {
                onLogin();
            }, 2000)
        } else {
            failedMessage(data.message);
        }
    };

    const registerUser = async () => {
        const username = document.getElementById('name')?.value;
        const password = document.getElementById('passwd')?.value;

        const response = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem('token', data.token);
            successMessage(data.message);
            setTimeout(() => {
                onLogin();
            }, 2000)
        } else {
            failedMessage(data.message);
        }
    };
    const handleSignUpBtn = (e) => {
        e.target.classList.add('active');
        signInBtnRef.current.classList.remove('active');
        signUpRef.current.classList.add('active');
        signInRef.current.classList.remove('active');
        signInRef.current.querySelectorAll('input').forEach(input=>{input.value=""});
        const messageBox = document.getElementById('message-box');
        messageBox.style.display='none';
    }
    const handleSignInBtn = (e) => {
        e.target.classList.add('active');
        signUpBtnRef.current.classList.remove('active');
        signInRef.current.classList.add('active');
        signUpRef.current.classList.remove('active');
        signUpRef.current.querySelectorAll('input').forEach(input=>{input.value=""});
        const messageBox = document.getElementById('message-box');
        messageBox.style.display='none';
    }

    return (
        <>
            <main className="main-container">
                <div className="container">
                    <div className="aside">
                        <div className="divider"></div>
                        <h1>DocEditor</h1>
                        <div className="divider"></div>
                        <div>
                            <h2>Welcome Back !</h2>
                            <h3>Collaborate. Create. Innovate. Together.</h3>
                            <span>Seamlessly edit and share documents in real-time with your team, no matter where you are.</span>
                        </div>
                        <p>By continuing, you agree to our <a href="about.html"> Conditions of Use</a> and <a
                            href="services.html">Privacy Notice</a>.</p>
                        <div className="divider"></div>
                    </div>
                    <div className="form-box">
                        <div className="form-container">
                            <div className="form-toggle">
                                <button id="signInBtn" ref={signInBtnRef} className="active" onClick={handleSignInBtn}>Sign In</button>
                                <button id="signUpBtn" ref={signUpBtnRef} onClick={handleSignUpBtn}>Sign Up</button>
                            </div>
                            <div className="forms">
                                <form id="signInForm" className="active" ref={signInRef} noValidate>
                                    <h2>Sign In</h2>
                                    <input type="text" id="username" placeholder="Username" autoComplete="name" />
                                    <div className="error user-error hidden" aria-live="polite"></div>
                                    <input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                                    <div className="error password-error hidden" aria-live="polite"></div>
                                    <button className="signin" type="button" onClick={loginUser}>Sign In</button>
                                </form>

                                <form id="signUpForm" ref={signUpRef} noValidate>
                                    <h2>Sign Up</h2>
                                    <input type="text" id="name" placeholder="Username" autoComplete="username" />
                                    <div className="error user-error hidden" aria-live="polite"></div>

                                    <input type="password" id="passwd" placeholder="Password" autoComplete="new-password" />
                                    <div className="error password-error hidden" aria-live="polite"></div>

                                    <input type="password" id="confirmPass" placeholder="Confirm Password" autoComplete="new-password" />
                                    <div className="error conf-password-error hidden" aria-live="polite"></div>

                                    <button className="signup" type="button" onClick={registerUser}>Sign Up</button>
                                </form>
                                <div id="message-box">
                                    <span id="message-icon">&#10003;</span>
                                    <div id="message"></div>
                                    <span className="close">&times;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="foot">
                        <p>By continuing, you agree to our <a href="about.html">Conditions of Use</a> and <a
                            href="services.html">Privacy Notice</a>.</p>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Loginform

