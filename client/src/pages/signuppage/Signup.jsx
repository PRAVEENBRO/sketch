import React, { useState, useRef } from 'react'
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { postmethod } from '../../services/apirequests';
import { signupurl } from '../../services/endpoints';

const Signup = () => {


    const name = useRef()
    const email = useRef()
    const password = useRef()


    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const payload = {
                name: name.current.value,
                emailid: email.current.value,
                password: password.current.value,
            }

            const data = await postmethod(signupurl, payload)
            console.log(data);
            if (!data.error) {
                window.location.reload();
            }
            alert(data.message);

        }
        setValidated(true);
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Card className="formcard p-5">
                    <h4>Registration form</h4>
                    <Card.Body>
                        <FloatingLabel controlId="floatingInput" label="Enter name" className="mt-3 mb-4" >
                            <Form.Control type="text" placeholder="enter name" ref={name} required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Enter email" className=" mb-4" >
                            <Form.Control
                                type="email" placeholder="enter email" ref={email} required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="Enter password" className="mb-4" >
                            <Form.Control type="password" placeholder="enter password" ref={password} required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-flex justify-content-center">
                            <Button variant="outline-success" className="mt-2" type="submit" > {" "} Signup{" "} </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        </>
    )
}

export default Signup