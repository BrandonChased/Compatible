import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import axios from 'axios'
const github = require("../images/github-mark.png")
const linkedIn = require("../images/LI-In-Bug.png")


function SignIn() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(user);
        if (Object.keys(validationErrors).length === 0) {
            axios.post("http://localhost:8000/api/users/login", {
                email: user.email,
                password: user.password,
            }, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            })
                .then(res => {
                    console.log(res.data)
                    setCookie("email", res.data.email)
                    setCookie("UserId", res.data.userId)
                    setCookie("AuthToken", res.data.token)
                    setCookie("genderPreference", res.data.genderPreference)
                    setUser({})
                    navigate("/dashboard")
                    window.location.reload()
                })
                .catch(err => {
                    setErrors(err.response.data)
                })
        } else {
            setErrors(validationErrors);
            console.log(validationErrors)
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
            <div className="my-4">
                <h1 className="text-right">Sign In</h1>
                <h2 className="text-center mt-4">Welcome Back to Compatible!</h2>
            </div>
            <form className="my-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control text-center btn"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={user.email}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control text-center btn"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={user.password}
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary my-4">Sign In</button>
                </div>
                {errors?.message &&
                    <div className='text-danger h5'>
                        {errors.message}
                    </div>
                }
            </form>
            <div className="mt-4">
                <p className="h4 text-center" style={{ color: "black" }}>
                    Don't Have an Account ?
                </p>
                <Link className="h4 text-center" to={"/"}>
                    Sign Up Here!
                </Link>
            </div>
            <div className="social-links my-4 d-flex justify-content-center">
                <a href="https://github.com/BrandonChased">
                    <img src={github} alt="GitHub Logo" className="mx-2" />
                </a>
                <a href="https://www.linkedin.com/in/brandon-debenedictis/">
                    <img src={linkedIn} alt="LinkIn Logo" className="mx-2" />
                </a>
            </div>
        </div>
    );
}

export default SignIn