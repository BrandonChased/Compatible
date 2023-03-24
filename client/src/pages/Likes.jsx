import React from 'react'
import BottomNav from '../components/BottomNav'
import Nav from '../components/Nav'

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
  ,
  {
    name: "John Doe",
    url: "https://th.bing.com/th?id=OIP.PNLlgZG3YDXovdEtFaCPkwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
  }
]

const likes = db

function Likes() {
  return (
    <div className='d-flex flex-column justify-content-between' style={{ minHeight: "100vh" }}>
      <Nav noFilter={true} />
      <div>
        <h2  style={{ color: "black" }}> You Have {likes.length} Likes</h2>
        <p className='h4 text-warning'> Upgrade to see people who have liked you</p>
      </div>
      <div className='overflow-auto messages p-3'>
        {
          likes.map(like => {
            return <div className='card d-inline-block col-6' >
              <div className='card-body d-flex flex-column align-items-center'>
                <div style={{ backgroundImage: 'url(' + like.url + ')', width: "100px", height: "100px" }} className='img'></div>
                <div className='d-flex flex-column'>
                  <p>{like.name}</p>
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

export default Likes