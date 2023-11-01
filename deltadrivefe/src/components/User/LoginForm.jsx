import React, {Component, useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import { loginUser } from "../../Features/auth/authSlice";
import login from "../../pages/Login/Login";

const LoginForm = () => {
    // constructor() {
    //     super();
    //     this.state = {
    //         username: '',
    //         password: '',
    //     };
    // }

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {

        const userData = {
            email,
            password,
        };
        console.log(userData);
        dispatch(loginUser(userData));


    };

        return (
            <div>
                <h2>Login Form</h2>
                <form>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        );
}

export default LoginForm;