import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { postmethod } from '../../services/apirequests';
import { addtask } from '../../services/endpoints';

const AddTask = ({ show, setShowaddtask, pid, fetchtask }) => {


    const handleClose = () => setShowaddtask(false);

    const [validated, setValidated] = useState(false);

    const taskname = useRef();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const payload = { projectID: pid, task: taskname.current.value }
            console.log(payload);
            const data = await postmethod(addtask, payload);
            console.log(data);
            alert(data.message)
            if (!data.error) {
                fetchtask(pid)
                handleClose();
            }
        }


        setValidated(true);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" >
                            <Form.Label>Project ID</Form.Label>
                            <Form.Control type="text" value={pid && pid} required disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>task name</Form.Label>
                            <Form.Control type="text" ref={taskname} required autoFocus />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                        <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );

}

export default AddTask
