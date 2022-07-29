import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
const Navigationbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('signin')
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="home">Sketch-Bhrama</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="home">Project</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="signup">Signup</Nav.Link>
                            {localStorage.getItem('token') ? <Nav.Link ><FiLogOut className="icon" onClick={() => logout()} /></Nav.Link> : <Nav.Link as={Link} to="signin">login</Nav.Link>}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigationbar