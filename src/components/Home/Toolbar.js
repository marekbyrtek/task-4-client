import React, { useState, useContext } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import { CounterContext } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Toolbar = ({ users }) => {
    const [loading, setLoading] = useState(false);
    const setCounter = useContext(CounterContext);
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleBlock = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            if (el._id == authState.id) return alert("Can't block loged user");
            const data = {
                id: el._id,
                status: el.status
            }
            Axios.put("https://task-4-backend.herokuapp.com/block", data)
                .then(() => setCounter((prev) => prev + 1))
                .catch((err) => {
                    console.log(err);
                })
        })
        setLoading(false);
    }

    const handleUnblock = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            const data = {
                id: el._id,
                status: el.status
            }
            Axios.put("https://task-4-backend.herokuapp.com/activate", data)
                .then(() => setCounter((prev) => prev + 1))
                .catch((err) => {
                    console.log(err);
                })
        })
        setLoading(false);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            if (el._id == authState.id) return alert("Can't delete loged user");
            const data = {
                id: el._id
            }
            Axios.post("https://task-4-backend.herokuapp.com/delete", data)
                .then(() => {console.log("User deleted")})
                .then(() => setCounter((prev) => prev + 1))
                .catch((err) => {
                    console.log(data);
                    console.log(err);
                })
        })
        setLoading(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        setAuthState({
            email: "",
            id: 0,
            status: false
        })
        navigate("/login");
    }

    return (
        <div className="mb-2 d-flex align-items-center w-100">
            <Button variant="danger" onClick={handleBlock} disabled={loading}>Block</Button>
            <Button className="m-3" onClick={handleUnblock} disabled={loading}><FontAwesomeIcon icon={faUnlock} /></Button>
            <Button onClick={handleDelete} disabled={loading}><FontAwesomeIcon icon={faTrash} /></Button>
            <Button onClick={handleLogout} disabled={loading} variant="outline-primary" style={{marginLeft: "auto"}}>Log out</Button>
        </div>
    )
}

export default Toolbar;