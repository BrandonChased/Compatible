import React from 'react'
import Nav from '../components/Nav'
import BottomNav from '../components/BottomNav'

export default function Profile() {
    const person = {
        name: 'Richard Hendricks',
        url: 'https://imgur.com/oPj4A8u.jpg'
    }

    return (
        <div>
            <div className='d-flex flex-column justify-content-between' style={{ minHeight: "100vh" }}>
                <Nav noFilter={true} />

                <BottomNav />
            </div>
        </div>
    )
}
