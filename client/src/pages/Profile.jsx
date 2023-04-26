import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import BottomNav from '../components/BottomNav'
import { useCookies } from 'react-cookie'
import axios from 'axios'

export default function Profile() {

    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [user, setUser] = useState({})

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${cookies.UserId}`)
            console.log(response.data)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Nav noFilter={true} />
            <div style={{ flexGrow: 1 }} className='container-fluid d-flex flex-column justify-content-around'>
                <div className='top-info'>
                    {user?.images && <img style={{ width: "32%", borderRadius: "100px" }} src={user && user.images[0]} alt="profile-pic" />}
                    <p>{user?.name && user.name} {user?.age && user.age}</p>
                </div>
                <div className='top-info'>
                    hell0
                </div>
                <div className='top-info'>
                    hello
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
