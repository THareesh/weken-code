import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticated, unAuthorised } from '../ReduxStore/Action';
import sha512 from 'js-sha512';
import Axios from 'axios';

const Auth = (props) => {

    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== null && user) {
            props.history.push('/dashboard');
        }
    }, [props.history]);

    const setInput = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const submitForm = async (event) => {
        event.preventDefault();
        setLoading(true)
        const { email, password } = state;
        const hashPassword = sha512(password);
        const credentials = { email, password: hashPassword }

        if (email.trim() !== "" || password.trim() !== "") {
            try {
                const response = await Axios.post("/users/login", credentials);
                setLoading(false)
                props.authenticated(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                props.history.push("/dashboard");
            } catch (err) {
                setLoading(false)
                alert(err.message);
                props.unAuthorised();
                localStorage.removeItem("user");
            }
        } else {
            alert("Please enter email and password")
        }
    }

    return (
        <div className="auth_container">
            <div className="paper">
                <h2>Sign in</h2>
                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={setInput}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={setInput}
                        required
                        autoComplete=""
                    />
                    <br />
                    <button disabled={loading} className="btn" type="submit" >Login</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth
});

export default connect(mapStateToProps, { authenticated, unAuthorised })(Auth);