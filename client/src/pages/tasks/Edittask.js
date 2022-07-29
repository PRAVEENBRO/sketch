import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { putmethod } from '../../services/apirequests';
import { updatetask } from '../../services/endpoints';

const Edittask = ({ show, setshow, task, projectid, fetchtask }) => {

    const taskname = useRef();
    const handleClose = () => setshow(false);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            const payload = {
                projectID: projectid,
                taskid: task?._id,
                task: taskname.current.value
            };
            console.log(payload);
            const data = await putmethod(updatetask, payload);
            console.log(data);
            alert(data.message)
            if (!data.error) {
                fetchtask(projectid)
                handleClose();
            }
        }

        setValidated(true);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" >
                            <Form.Label>Project ID</Form.Label>
                            <Form.Control type="text" value={projectid && projectid} required disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Task ID</Form.Label>
                            <Form.Control type="text" value={task?._id} required disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>task name</Form.Label>
                            <Form.Control type="text" ref={taskname} defaultValue={task?.tasksname} required autoFocus />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                        <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default Edittask