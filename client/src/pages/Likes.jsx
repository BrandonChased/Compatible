import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie"
import BottomNav from '../components/BottomNav';
import Nav from '../components/Nav';
import axios from 'axios';



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
  const [cookies, setCookie, removeCookie] = useCookies(["user"])
  const [users, setUsers] = useState();
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${cookies.UserId}`)
      // console.log(response.data)
      setUser(response.data)
    } catch (error) {
      // console.log(error)
    }
  }




  const getUsers = async () => {
    try {
      // console.log(cookies.genderPreference)
      const response = await axios.get("http://localhost:8000/api/users", {
        params: { gender: cookies.genderPreference }
      })
      // console.log(response.data)

      setUsers(response.data)

    } catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    getUser()
    getUsers()
  }, [])

  // const usersIds = users?.map(person => console.log(person.matches))

  const likess = users?.filter((person) => person.matches.some(match => match.user_id === cookies.UserId));

  const final = likess?.filter(person => user.matches.some(match => match.user_id == person._id))

  if (user) {
    console.log(final)
  }

  return (
    <div className='d-flex flex-column justify-content-between' style={{ minHeight: "100vh" }}>
      <Nav noFilter={true} />
      <div>
        <h2 style={{ color: "black" }}> You Have {likess?.length} Likes</h2>
        {likess?.length > 0 ? <p className='h4 text-warning px-3'> Upgrade to see people who have liked you</p> : <p className='h4 text-warning px-3'>Swipe to improve your chances at getting a like !</p>}
      </div>
      <div className='overflow-auto messages p-3'>
        {likess &&
          likess.map(like => {
            return <div key={like._id} className='card d-inline-block col-6' >
              <div className='card-body d-flex flex-column align-items-center'>
                <div style={{ backgroundImage: 'url(' + like?.images[0] + ')', width: "100px", height: "100px" }} className='img'></div>
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