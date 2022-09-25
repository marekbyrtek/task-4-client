import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Container } from "react-bootstrap";
import Toolbar from "./Toolbar";
import { CounterContext } from "./Context";

const AdminPage = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [listOfChecked, setListOfChecked] = useState([]);
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((res) => {
            setListOfUsers(res.data);
        })
    }, [counter]);

    useEffect(() => {
        setListOfChecked([])
        listOfUsers.map((el) => {
            if (el.isChecked === true) setListOfChecked((prev) => [...prev, el]);
        })
    }, [listOfUsers]);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setListOfChecked([]);
        if (name === "allSelect") {
            let tempUser = listOfUsers.map((el) => {
                return { ...el, isChecked: checked };
            });
            setListOfUsers(tempUser);
        } else {
            let tempUser = listOfUsers.map((el) => 
                el._id === name ? { ...el, isChecked: checked } : el
            );
            setListOfUsers(tempUser);
        }
    }

    return (
        <CounterContext.Provider value={setCounter}>
            <Container className="d-flex flex-column align-items-center">
                <Toolbar users={listOfChecked} />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th><input
                                type='checkbox'
                                className='form-check-input'
                                name='allSelect'
                                checked={!listOfUsers.some((user) => user?.isChecked !== true)}
                                onChange={handleChange}
                            /></th>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registered</th>
                            <th>Last logged</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfUsers.map((el, i) => {
                            return(
                                <tr key={el._id}>
                                    <td><input
                                        type={'checkbox'}
                                        className='form-check-input'
                                        name={el._id}
                                        checked={el?.isChecked || false}
                                        onChange={handleChange}/></td>
                                    <td>{i + 1}</td>
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.registered}</td>
                                    <td>{el.lastLogged}</td>
                                    <td>{el.status ? "active" : "blocked"}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </CounterContext.Provider>
        
    )
}

export default AdminPage;
