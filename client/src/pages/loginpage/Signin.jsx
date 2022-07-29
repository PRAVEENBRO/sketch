import React, { useState } from 'react'
import { useRef } from 'react';
import { Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { postmethod } from '../../services/apirequests';
import { signinurl } from '../../services/endpoints';


const Signin = () => {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const email = useRef()
    const password = useRef()


    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const payload = {

                emailid: email.current.value,
                password: password.current.value,
            }
            const data = await postmethod(signinurl, payload)
            console.log(data);
            alert(data.message);
            if (!data.error) {
                localStorage.setItem('token', data.accesstoken);
                navigate('/home');
            }

        }
        setValidated(true);
    };


    return (
        <>
            <div>

                <Card className='formcard p-5'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <h3>Please Login</h3>
                        <Card.Body>
                            <FloatingLabel controlId="floatingInput" label={<FaEnvelope />} className="mt-5 mb-4" >
                                <Form.Control title="email" type="email" placeholder="enter email" ref={email} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label={<FaLock />} className="mb-4" >
                                <Form.Control type="password" placeholder="enter password" ref={password} />
                            </FloatingLabel>


                            <div className="d-flex justify-content-center">
                                <Button variant="outline-success" className="mt-2" type="submit" > {" "} Sign in{" "} </Button>
                            </div>
                        </Card.Body>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default Signin