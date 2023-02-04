import React from "react";
import { useState } from "react";
import {useCookies} from "react-cookie"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const github = require("../images/github-mark.png");
const linkedIn = require("../images/LI-In-Bug.png");

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
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users",{
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
    };

    const navigate = useNavigate();

    return (
        <div
            className="container d-flex flex-column justify-content-between"
            style={{ maxHeight: "100vh" }}
        >
            <div>
                <p className="text-right h1">Sign Up</p>
                <p className="display-4 mt-5">Compatible !</p>
            </div>
            <form className="" style={{ maxHeight: "100%" }} onSubmit={handleSubmit}>
                <div className="overflow-auto mb-4" style={{ maxHeight: "250px" }}>
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
                            type="text"
                            className="form-control text-center btn"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={user.password}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control text-center btn"
                            id="url"
                            name="url"
                            placeholder="Enter a Picture Url"
                            onChange={handleChange}
                            value={user.url}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control text-center btn"
                            id="age"
                            name="age"
                            age="age"
                            value={user.age}
                            placeholder="Age"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" className="form-select p-2" onChange={handleChange} value={user.gender}>
                            <option value={"male"}>Male</option>
                            <option className="" value={"female"}>
                                Female
                            </option>
                        </select>
                    </div>
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="genderPreference">Gender Preference: </label>
                        <select name="genderPreference" className="form-select p-2" onChange={handleChange} value={user.genderPreference}>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary">Sign Up</button>
            </form>
            <div className="mt-4">
                <p className="h4" style={{ color: "black" }}>
                    Already Have an Account ?
                </p>
                <Link className="h4" to={"/SignIn"}>
                    Sign In Here!{" "}
                </Link>
            </div>
            <div className="social-links d-flex justify-content-around">
                <a href="https://github.com/BrandonChased">
                    <img src={github} alt="GitHub Logo" />
                </a>
                <a href="https://www.linkedin.com/in/brandon-debenedictis-2a662b23a/">
                    <img src={linkedIn} alt="GitHub Logo" />
                </a>
            </div>
        </div>
    );
}

export default SignUp;
