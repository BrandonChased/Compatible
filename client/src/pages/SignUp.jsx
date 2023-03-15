import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import github from "../images/github-mark.png";
import linkedIn from "../images/LI-In-Bug.png";

function SignUp() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        age: '',
        gender: "male",
        genderPreference: "male",
        url: "",
    });
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: null
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hi")
        const validationErrors = validateForm(user);
        if (Object.keys(validationErrors).length === 0) {
            axios.post("http://localhost:8000/api/users", {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8000'
                },
                name: user.name,
                email: user.email,
                password: user.password,
                age: user.age,
                gender: user.gender,
                genderPreference: user.genderPreference,
                url: user.url,
            })
                .then(res => {
                    console.log(res.data)
                    setCookie("UserId", res.data._id)
                    setUser({})
                    navigate("/dashboard")
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            setErrors(validationErrors);
            console.log(validationErrors)
        }
    };

    const validateForm = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
        return errors;
    };

    return (
        <div className="container d-flex flex-column justify-content-between" style={{ maxHeight: "100%" }}>
            <div className="my-4">
                <h1 className="text-right">Sign Up</h1>
                <h2 className="text-center mt-4">Compatible!</h2>
            </div>
            <form className="my-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control text-center btn"
                        id="name"
                        name="name"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={user.name}
                        required
                    />
                </div>
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
                <button onClick={handleSubmit} className="btn btn-primary my-4">Sign Up</button>
            </form>
            <div className="mt-4">
                <p className="h4 text-center" style={{ color: "black" }}>
                    Already Have an Account ?
                </p>
                <Link className="h4 text-center" to={"/SignIn"}>
                    Sign In Here!
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
    )
}

export default SignUp;
