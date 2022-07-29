import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { postmethod, putmethod } from '../../services/apirequests';
import { readproject, updateproject } from '../../services/endpoints';

const EditProject = ({ show, setShow, getprojects, pid }) => {
    console.log(pid, "pid");
    const [editdata, seteditdata] = useState()

    const getproductdetails = async () => {
        if (pid) {
            const data = await postmethod(readproject, { "projectID": pid });
            console.log(data);
            seteditdata(data);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getproductdetails() }, [pid])

    const handleClose = () => { setShow(false); seteditdata() };
    const name = useRef();
    const managername = useRef();
    const statu = useRef();

    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();

            const payload = {
                projectID: pid,
                projectname: name.current.value,
                projectmanager: managername.current.value,
                status: statu.current.value
            }
            console.log(payload);
            const data = await putmethod(updateproject, payload);
            console.log(data);
            alert(data.message);
            if (!data.error) {
                getprojects(); handleClose();
            }
        }


        setValidated(true);
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Project name</Form.Label>
                            <Form.Control type="text" ref={name} required autoFocus defaultValue={editdata && editdata.projectname} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Project Manager</Form.Label>
                            <Form.Control type="text" ref={managername} required defaultValue={editdata && editdata.projectmanager} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Project Status</Form.Label>
                            <Form.Select aria-label="Default select example" ref={statu} defaultValue={editdata && editdata.status} required>
                                <option>{editdata && editdata.status}</option>
                                <option value="pending">pending</option>
                                <option value="started">started</option>
                                <option value="finished">finished</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                    <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditProject