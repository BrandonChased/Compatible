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
    const [fetching, setFetching] = useState(false)

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${cookies.UserId}`)
            // console.log(response.data)
            setUser(response.data)
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => {
        getUser()
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            // console.log(cookies.genderPreference)
            const response = await axios.get("http://localhost:8000/api/users", {
                params: { gender: cookies.genderPreference }
            })
            console.log(response.data)
            setUsers(response.data)

        } catch (err) {
            // console.log(err)
        }
    }

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }


    let isUpdatingMatches = false; // initialize a flag to track whether an update is in progress

    const updateMatches = async (matchedUserId) => {
        if (!isUpdatingMatches) { // check if an update is currently in progress
            isUpdatingMatches = true; // set the flag to true to indicate an update is in progress
            try {
                await axios.put('http://localhost:8000/api/users/addmatch', {
                    userId: cookies.UserId,
                    matchedUserId
                });
                await getUser(); // wait for user data to update
            } catch (error) {
                console.log(error);
                // handle error, such as displaying an error message to the user
            } finally {
                isUpdatingMatches = false; // set the flag back to false to indicate that the update is complete
            }
        } else {
            console.log('Update already in progress'); // handle case where an update is already in progress
        }
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches?.map((user) => user.user_id).concat(cookies.UserId)

    const filteredusers = users?.filter(person => !matchedUserIds.includes(person._id))

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-between" }}>
            <Nav />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
                {filteredusers.length > 0 ?
                    <div className="swipe-container">
                        <div className="card-container">
                            {filteredusers?.map((unMatchedUser) =>
                                <TinderCard
                                    className="swipe"
                                    key={unMatchedUser._id}
                                    onSwipe={(dir) => swiped(dir, unMatchedUser._id)}
                                    onCardLeftScreen={() => outOfFrame(unMatchedUser.name)}
                                >
                                    <div style={{ backgroundImage: `url(${unMatchedUser.images[0]})` }} className="c-card">
                                        <h3>{unMatchedUser.name}</h3>
                                    </div>
                                </TinderCard>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                    : <div>You have swipe on all potential matches in your area...</div>}
            </div>
            <BottomNav />
        </div>
    );
}

export default DashBoard;
