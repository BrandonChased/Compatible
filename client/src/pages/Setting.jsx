import React from 'react'
import { Link } from 'react-router-dom'

function Setting() {
    return (
        <div>
            <div className='card position-sticky py-2'>
                <p className='h3' style={{ textAlign: "center" }}>Settings</p>
                <Link className='h4 mt-1 mr-3 position-absolute text-secondary' style={{ right: "0" }} to={"/dashboard"}>Done</Link>
            </div>
            <div className='settings'>
                <p className='h4 text-left ml-2'>Account Settings</p>
                <form className='card'>
                    <div className=' mt-4 form-group d-flex justify-content-around align-items-center'>
                        <label htmlFor='Name'>Name: </label>
                        <input className='form-control w-50' value="Johnny" />
                    </div>
                    <div className=' mt-4 form-group d-flex justify-content-around align-items-center'>
                        <label htmlFor='email'>Email: </label>
                        <input className='form-control w-50' name='email' value="Yasir342@gmail.com" />
                    </div>
                    <div className=' mt-4 form-group d-flex justify-content-around align-items-center'>
                        <label htmlFor='phone-number'>Phone Number: </label>
                        <input className='form-control w-50' value="999-999-9999" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Setting