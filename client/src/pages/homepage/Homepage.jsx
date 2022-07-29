import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { getmethod } from '../../services/apirequests'
import { projecturl } from '../../services/endpoints'
import { MdEditNote } from "react-icons/md";
import AddProject from '../createProject/AddProject';
import EditProject from '../createProject/EditProject';
import { FaTasks } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {

    const navigate = useNavigate();
    const [projestlist, setprojestlist] = useState([]);
    const [showadd, setShowadd] = useState(false);
    const handleShowadd = () => setShowadd(true);
    const getprojects = async () => {
        const data = await getmethod(projecturl); setprojestlist(data)
    }

    useEffect(() => { getprojects() }, []);

    const [showedit, setshowedit] = useState();
    const [pid, setpid] = useState();


    const editproject = (id) => { setpid(id); setshowedit(!showedit) }


    return (
        <>
            <Container className='mt-5'>

                <Button variant="primary" className='mb-5' onClick={handleShowadd}>Add Project </Button>

                <Row xs={1} md={3} className="g-4">
                    {projestlist && projestlist.map(ele => {
                        return (
                            <Col key={ele._id}>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title>ID :  {ele.projectID}</Card.Title>
                                        <Card.Title>Project Name :  {ele.projectname}</Card.Title>
                                        <Card.Title>Project Manager :  {ele.projectmanager} </Card.Title>
                                        <Card.Title>tasks :  {ele.tasks.length} </Card.Title>
                                        <div className='d-flex justify-content-between'>
                                            <Button variant="outline-danger" onClick={() => editproject(ele.projectID)} ><MdEditNote className='mx-3' /></Button>
                                            <Button variant="info" onClick={() => navigate('/viewtasks', { state: { pid: ele.projectID } })}><FaTasks className='mx-3' /></Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}

                </Row>
                <AddProject show={showadd} setShow={setShowadd} getprojects={getprojects} />
                <EditProject show={showedit} setShow={setshowedit} getprojects={getprojects} pid={pid && pid} />

            </Container>
        </>
    )
}

export default Homepage