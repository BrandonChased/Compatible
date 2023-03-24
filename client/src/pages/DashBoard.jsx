import axios from "axios";
import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import Nav from "../components/Nav";
import { useCookies } from "react-cookie"
import TinderCard from 'react-tinder-card'
import "../App.css"

function DashBoard() {
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [lastDirection, setLastDirection] = useState()

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
        getusers()
    }, [])

    const getusers = async () => {
        try {
            console.log(cookies.genderPreference)
            const response = await axios.get("http://localhost:8000/api/users", {
                params: { gender: cookies.genderPreference }
            })
            console.log(response.data)
            setUsers(response.data)

        } catch (err) {
            console.log(err)
        }
    }

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId: cookies.userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    // const matchedUserIds = user?.matches.map(({_id}) => _id).concat(cookies.userId)

    // const filteredusers = users?.filter(user => !matchedUserIds.includes(user._id))

    return (
        <div
            className="d-flex flex-column justify-content-between"
            style={{ minHeight: "100vh" }}
        >
            <Nav />
            {user &&
                <div className="dashboard">
                    <div className="swipe-container">
                        <div className="card-container">
                            {users && users?.map((user) =>
                                <TinderCard
                                    className="swipe"
                                    key={user._id}
                                    onSwipe={(dir) => swiped(dir, user._id)}
                                    onCardLeftScreen={() => outOfFrame(user.name)}>
                                    <div
                                        style={{ backgroundImage: "url(" + user.images[0] + ")" }}
                                        className="c-card">
                                        <h3>{user.name}</h3>
                                    </div>
                                </TinderCard>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>}
            <BottomNav />
        </div>
    );
}

export default DashBoard;
