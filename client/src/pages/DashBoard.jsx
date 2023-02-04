import axios from "axios";
import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import Nav from "../components/Nav";
import { useCookies} from "react-cookie"

function DashBoard() {
    const [users, setUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleLike = async (matchedUserId) => {
        try {
            await axios.put("http://localhost:8000/api/users/addmatch", {
                userId: cookies.UserId,
                matchedUserId
            })
        } catch (error) {
            console.log(error)
        }
        console.log(cookies.UserId)

    }

    const handleDislike = () => {

    }

    return (
        <div
            className="d-flex flex-column justify-content-between"
            style={{ minHeight: "100vh" }}
        >
            <Nav />
            <div className="mh-100 card-body">
                {users ? users.map((character) => (
                    <div key={character._id}>
                        <div
                            style={{ backgroundImage: "url(" + character.url + ")" }}
                            className="card profile-card"
                        >
                            <h3>{character.name}</h3>
                            <div className="d-flex btns">
                                <i
                                    onClick={() => handleLike(character._id)}
                                    className="fa-regular fa-heart fa-3x"
                                    style={{ color: "limegreen" }}
                                ></i>
                                <i
                                    onClick={handleDislike}
                                    className="fa-regular fa-circle-xmark fa-3x"
                                    style={{ color: "red" }}
                                ></i>
                            </div>
                        </div>
                    </div>
                )) : <p className="h1">"No More Users in your area"</p>}
            </div>
            <BottomNav />
        </div>
    );
}

export default DashBoard;
