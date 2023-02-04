import React from 'react'
import { Link } from 'react-router-dom'

function Nav({ noFilter }) {


    return (
        <nav className='navbar'>
            <Link to={"/settings"} style={noFilter&& { position: "absolute"}} className="fa-solid fa-gears fa-3x"></Link>
            <p className='h1' style={noFilter &&{  margin: "0 auto" }}>Compatible</p>
            {!noFilter && <span className="material-symbols-outlined fa-3x">
                Tune
            </span>}
        </nav>
    )
}

export default Nav