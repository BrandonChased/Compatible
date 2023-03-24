import React from 'react'
import BottomNav from '../components/BottomNav'
import Nav from '../components/Nav'

function Messages() {
    const db = [
        {
            name: 'Richard',
            url: 'https://imgur.com/oPj4A8u.jpg'
        },
        {
            name: 'Erlich Bachman',
            url: 'https://imgur.com/Q9WPlWA.jpg'
        },
        {
            name: 'Monica Hall',
            url: 'https://imgur.com/MWAcQRM.jpg'
        },
        {
            name: 'Jared Dunn',
            url: 'https://imgur.com/wDmRJPc.jpg'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        }
        ,
        {
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        }
        ,
        {
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        }
    ]

    const characters = db

    return (
        <div className='d-flex flex-column justify-content-between' style={{ minHeight: "100vh" }}>
            <Nav noFilter={true} />
            <p className='text-left ml-2 h4'>Potential Partners</p>
            <div className='overflow-auto messages' >
                {
                    characters.map(character => {
                        return <div className='card'>
                            <div className='card-body d-flex'>
                                <div style={{ backgroundImage: 'url(' + character.url + ')', width: "50px", height: "50px", borderRadius: "2rem" }} className='img'></div>
                                <div className='d-flex flex-column'>
                                    <p>{character.name}</p>
                                    <p style={{ color: "grey" }}> Hey</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <BottomNav />
        </div>
    )
}

export default Messages