import React, { Component } from 'react';
import axios from "axios";

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthdate: '',
        };
    }

    handleFirstNameChange = (event) => {
        this.setState({ firstName: event.target.value });
    };

    handleLastNameChange = (event) => {
        this.setState({ lastName: event.target.value });
    };

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleBirthdateChange = (event) => {
        this.setState({ birthdate: event.target.value });
    };

    handleRegister = () => {
        const { firstName, lastName, email, password, birthdate } = this.state;
        const apiUrl = process.env.REACT_APP_API_URL;
        const userData = {
            firstName,
            lastName,
            email,
            password,
            birthdate,
        };

        axios.post(`https://localhost:7231/api/Passengers/register`, userData)
            .then((response) => {
                this.setState({ registrationStatus: 'Registration successful!' });
            })
            .catch((error) => {
                this.setState({ registrationStatus: 'Registration failed. Please try again.' });
            });
    };

    render() {
        return (
            <div>
                <h2>Registration Form</h2>
                <form>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleLastNameChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <div>
                        <label>Birthday:</label>
                        <input
                            type="date"
                            value={this.state.birthdate}
                            onChange={this.handleBirthdateChange}
                        />
                    </div>
                    <button type="button" onClick={this.handleRegister}>
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default RegisterForm;