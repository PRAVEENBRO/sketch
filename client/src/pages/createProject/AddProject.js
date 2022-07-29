import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postmethod } from "../../services/apirequests";
import { createproject } from '../../services/endpoints';

const AddProject = ({ show, setShow, getprojects }) => {

    const handleClose = () => setShow(false);

    const name = useRef();
    const managername = useRef();

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();

            const payload = {
                projectname: name.current.value,
                projectmanager: managername.current.value,
            }
            console.log(payload);
            const data = await postmethod(createproject, payload);
            console.log(data);
            alert(data.message);
            if (!data.error) {
                getprojects(); handleClose();
            }
        }


        setValidated(true);
    };

    

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Project name</Form.Label>
                            <Form.Control type="text" ref={name} required autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Project Manager</Form.Label>
                            <Form.Control type="text" ref={managername} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                    <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddProject