import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Container, Nav} from "react-bootstrap";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // dispatch(logoutUser());
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate("/login");
    };
    let userInfo  = false;
    const token = localStorage.getItem('token');
    userInfo = !!token;

    return(
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    DeltaDrive
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {userInfo ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;