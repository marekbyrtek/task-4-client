import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        setError("");
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords are different");
        }
        setLoading(true);
        Axios.post("http://localhost:3001/register", data)
            .then(() => {
                console.log("Wysłano");
                nameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                passwordConfirmRef.current.value = "";
            })
            .catch(err => {
                setError(err.response.data.message);
                console.log(err);
            })
            
        setLoading(false);
    };

    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Zarejestruj się</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="password">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" id="password-confirm">
                            <Form.Label>Potwierdź hasło</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} variant="outline-primary" className="w-100" type="submit">
                            Zarejestruj się
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            {/* <div className="w=100 text-center mt-2">
                Masz już konto? <Link to="/login">Zaloguj się</Link>
            </div> */}
        </div>
    )
}

export default Register;
