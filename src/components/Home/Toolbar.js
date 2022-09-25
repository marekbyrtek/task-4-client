import React, { useState, useContext } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import { CounterContext } from "./Context";

const Toolbar = ({ users }) => {
    const [loading, setLoading] = useState(false);
    const setCounter = useContext(CounterContext);

    const handleBlock = (e) => {
        e.preventDefault();
        setLoading(true);
        users.map((el) => {
            const data = {
                id: el._id,
                status: el.status
            }
            Axios.put("http://localhost:3001/block", data)
                .then(() => console.log("Zmieniono"))
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
            Axios.put("http://localhost:3001/activate", data)
                .then(() => console.log("Zmieniono"))
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
            const data = {
                id: el._id
            }
            Axios.post("http://localhost:3001/delete", data)
                .then(() => {console.log("User deleted")})
                .then(() => setCounter((prev) => prev + 1))
                .catch((err) => {
                    console.log(data);
                    console.log(err);
                })
        })
        setLoading(false);
    }

    return (
        <div className="mb-2">
            <Button variant="danger" onClick={handleBlock} disabled={loading}>Block</Button>
            <Button className="m-3" onClick={handleUnblock} disabled={loading}>Unblock</Button>
            <Button onClick={handleDelete} disabled={loading}>Delete</Button>
        </div>
    )
}

export default Toolbar;