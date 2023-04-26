import React from 'react'
import BottomNav from '../components/BottomNav'
import Nav from '../components/Nav'

function Messages() {
    const db = [
        {
            id: 1,
            name: 'Richard',
            url: 'https://imgur.com/oPj4A8u.jpg'
        },
        {
            id: 2,
            name: 'Erlich Bachman',
            url: 'https://imgur.com/Q9WPlWA.jpg'
        },
        {
            id: 3,
            name: 'Monica Hall',
            url: 'https://imgur.com/MWAcQRM.jpg'
        },
        {
            id: 4,
            name: 'Jared Dunn',
            url: 'https://imgur.com/wDmRJPc.jpg'
        },
        {
            id: 5,
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        },
        {
            id: 6,
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        },
        {
            id: 7,
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        },
        {
            id: 8,
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        }
        ,
        {
            id: 9,
            name: 'Dinesh Chugtai',
            url: 'https://imgur.com/OckVkRo.jpg'
        }
        ,
        {
            id: 10,
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
                        return <div key={character.id} className='card'>
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