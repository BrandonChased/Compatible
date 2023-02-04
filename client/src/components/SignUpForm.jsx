import React from 'react'
import { Link } from "react-router-dom"

function SignUpForm() {
    return (
        <form>
            <div className="form-group">
                <input type="text" className="form-control text-center btn" id="name" name='name' placeholder="First Name" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control text-center btn" id="email" name='email' placeholder="Email" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control text-center btn" id="password" name='password' placeholder="Password" />
            </div>
            <button className='btn btn-primary' >Sign Up</button>
            <div className='mt-4'>
                <p className='h4' style={{ color: "black" }} >  Already Have an Account ?</p>
                <Link className='h4' to={"/signIn"}>Sign In Here! </Link>
            </div>
        </form>
    )
}

export default SignUpForm