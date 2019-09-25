import React, { Component } from 'react';
import axios from 'axios';

import './Login.css';


class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    onSubmit = e => {
        e.preventDefault();

        const loginInfo = {
            email: this.state.email,
            password: this.state.password
        };

<<<<<<< HEAD:src/SpofityApiTest/Login.js
        axios.post('http://localhost:3001/login', loginInfo)
=======
        axios.post('http://localhost:4000/api/user/login', loginInfo)
>>>>>>> Switched up routes for back end:src/components/SpofityApiTest/Login.js
            .then(res => {
                const user = res.data;
                if (user.spotify) {
                    window.location.href =
                        `/user/${user.name}/${user.spotify}/${user.spotifyId}`;
                } else {
                    window.location.href =
                        `/user/${user.name}`;
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="absolute">
                <form onSubmit={this.onSubmit} className="login-form">
                    <label htmlFor="exampleEmail" >Email</label>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={e => {
                            this.setState({
                                email: e.target.value
                            });
                        }}
                        name="email"
                        id="exampleEmail" />
                    <label htmlFor="examplePassword" >Password</label>
                    <input
                        autoComplete="currentPassword"
                        type="password"
                        value={this.state.password}
                        onChange={e => {
                            this.setState({
                                password: e.target.value
                            });
                        }}
                        name="password"
                        id="examplePassword" />
                    <button type="submit" >Login</button>
                </form>
            </div>
        );
    }
}

export default Login;