import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

function Setting() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [user, setUser] = useState({})

    const logOut = () => {
        removeCookie("UserId", cookies.UserId)
        removeCookie("AuthToken", cookies.AuthToken)
        removeCookie("email", cookies.email)
    }


    const getUserFunction = async () => {
        try {
            const getUser = await axios.get(`http://localhost:8000/api/users/${cookies.UserId}`)
            setUser(getUser.data)
            console.log(getUser.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getUserFunction()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            [name] : value
        })
    }

    return (
        <div>
            <div className='card position-sticky py-2'>
                <a href='/' className='h4 mt-1 mr-3 position-absolute text-secondary' onClick={logOut} style={{ left: "10px" }}>Logout</a>
                <p className='h3' style={{ textAlign: "center" }}>Settings</p>
                <Link className='h4 mt-1 mr-3 position-absolute text-secondary' style={{ right: "0" }} to={"/dashboard"}>Done</Link>
            </div>
            <div className='settings'>
                <p className='h4 text-left ml-2'>Account Settings</p>
                {user && <form className='card'>
                    <div className=' mt-4 form-group d-flex justify-content-around align-items-center'>
                        <label htmlFor='name'>Name: </label>
                        <input readOnly onChange={handleChange} className='form-control w-50' name='name' value={user.name} />
                    </div>
                    <div className=' mt-4 form-group d-flex justify-content-around align-items-center'>
                        <label htmlFor='email'>Email: </label>
                        <input readOnly onChange={handleChange} className='form-control w-50' name='email' value={user.email} />
                    </div>
                    <div className=' mt-4 form-group d-flex justify-content-around align-items-center'>
                        <label htmlFor='phone'>Phone Number: </label>
                        <input readOnly onChange={handleChange} className='form-control w-50' name='phone' value={user.email} />
                    </div>
                </form>}
            </div>
        </div>
    )
}

export default Setting