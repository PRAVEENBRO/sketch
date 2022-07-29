import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { postmethod } from "../../services/apirequests";
import { readtask } from '../../services/endpoints';
import { Button, Container, Table } from "react-bootstrap";
import { MdEditNote } from 'react-icons/md';
import AddTask from './AddTask';
import Edittask from './Edittask';


const Viewtasks = () => {
    const location = useLocation();
    const [tasks, settasks] = useState();
    const [projectid, setprojectid] = useState()

    const [showaddtask, setShowaddtask] = useState(false);
    const handleShowadd = () => setShowaddtask(true);

    const fetchtask = async (id) => {
        const data = await postmethod(readtask, { "projectID": id });
        console.log("data", data.data);
        settasks(data.data)
    }

    const addtasktoproject = (id) => {
        handleShowadd();
        setprojectid(id)
    }

    useEffect(() => { fetchtask(location.state.pid) }, [location.state.pid])


    const [editT, seteditT] = useState()
    const [showedit, setshowedit] = useState(false)
    const edittask = (task) => {
        seteditT(task);
        setshowedit(!showedit);
    }
    console.log("editT", editT)

    return (
        <>
            <Container className="py-5">

                <Button variant="primary" className='' onClick={() => { addtasktoproject(location?.state?.pid && location.state.pid) }}>Add Task </Button>

                <Table striped bordered hover variant="light" className='mt-5'>
                    <thead>
                        <tr>
                            <th>Task Id</th>
                            <th>Task</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.map(ele => {
                            return (
                                <tr key={ele._id}>
                                    <td>{ele._id}</td>
                                    <td>{ele.tasksname}</td>
                                    <td>
                                        <MdEditNote className='mx-3' onClick={() => edittask(ele)} />
                                        {/* <FaTasks className='mx-3' onClick={() => navigate('/viewtasks', { state: { pid: ele.projectID } })} /> */}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <AddTask show={showaddtask} setShowaddtask={setShowaddtask} pid={projectid && projectid} fetchtask={fetchtask} />
                <Edittask task={editT} show={showedit} setshow={setshowedit} projectid={location.state.pid} fetchtask={fetchtask} />
            </Container>
        </>
    )
}

export default Viewtasks