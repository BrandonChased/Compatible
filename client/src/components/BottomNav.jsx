import React from 'react'
import { Link, useParams } from 'react-router-dom'

function BottomNav() {

    return (
        <nav className='bg-primary d-flex justify-content-around' style={{ padding: "1rem" }}>
            <Link to={"/dashboard"} className="fa-solid fa-handshake fa-3x"></Link>
            <Link to={"/likes"} className="material-symbols-outlined fa-3x">
                volunteer_activism
            </Link>
            <Link to={"/messages"} className="material-symbols-outlined fa-3x">
                forum
            </Link>
            <Link to={`/profile`} className="fa-solid fa-user-tie fa-3x" style={{ textDecoration: "none", backgroundColor: "none" }}>

            </Link>
        </nav>
    )
}

export default BottomNav