import React, { useState } from 'react'
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {

    const [action, setAction] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const submitLogin = (e) => {
        e.preventDefault();
        const user = {"username": username, "password" : password};
        //console.log(user);
        axios.post("http://localhost:8080/login", user).then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            //console.log(localStorage.getItem("token"))
            location.href = `/user/${user.username}`;
        })
        .catch((err)=> {
            console.log(err);
            alert(err.response.data.message);
        });
    }

    const submitRegister = (e) => {
        e.preventDefault();
        const user = {"username": newUsername, "email": email, "password" : newPassword};
        console.log(user);
        axios.post("http://localhost:8080/signup", user).then((res) => {
            console.log(res);
            // alert("Account Created");
            localStorage.setItem("token", res.data.token);
            location.href = `/user/${user.username}`;
        })
        .catch((err)=> {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        });
    }
    return(
        <div className='flex items-center justify-center'>
        <div className={`wrapper ${action} justify-center items-center`}>
            <div className="form-box login">
                <form onSubmit={submitLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input id="username" type="text" placeholder='Username' value = {username} onChange={(ev) => setUsername(ev.target.value)} required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input id="password" type="password" placeholder='Password' value = {password} onChange={(ev) => setPassword(ev.target.value)} required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form action="" onSubmit={submitRegister}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input id="newUsername" type="text" placeholder='Username' onChange={(ev) => setNewUsername(ev.target.value)} value = {newUsername} required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input id="email" type="email" placeholder='Email' value = {email} onChange={(ev) => setEmail(ev.target.value)} required />
                        <FaEnvelope className='icon'/>
                    </div>
                    <div className="input-box">
                        <input id="newPassword" type="password" placeholder='Password' value = {newPassword} onChange={(ev) => setNewPassword(ev.target.value)} required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />I agree to the terms & conditions</label>    
                    </div>

                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>

        </div>
        </div>
    );
};

export default LoginRegister;