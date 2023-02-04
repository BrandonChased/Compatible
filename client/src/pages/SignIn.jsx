import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const github = require("../images/github-mark.png")
const linkedIn = require("../images/LI-In-Bug.png")


function SignIn() {

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    return (
        <div>
            <div className='container d-flex flex-column justify-content-between'>
                <div>
                    <p className='text-right h1'>Sign In</p>
                    <p className='display-4 mt-5'>Compatible !</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <input type="text" class="form-control text-center btn" id="email" name='email' placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control text-center btn" id="password" name='password' placeholder="Password" />
                    </div>
                    <button className='btn btn-primary' >Sign In</button>
                    <div className='mt-4'>
                        <p className='h4' style={{ color: "black" }} >Don't Have an Account ?</p>
                        <Link className='h4' to={"/"}> Register Here! </Link>
                    </div>
                </form>
                <div className='social-links d-flex justify-content-around'>
                    <a href='https://github.com/BrandonChased'>
                        <img src={github} alt="GitHub Logo" />
                    </a>
                    <a href='https://www.linkedin.com/in/brandon-debenedictis-2a662b23a/'>
                        <img src={linkedIn} alt="GitHub Logo" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SignIn