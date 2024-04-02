import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar fixed={"top"} variant="light" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Supermarket Simulator</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={"/"}>Übersicht</Link>
                        <NavDropdown title="Management" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="#action/3.1">Personal einstellen</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.2">Laden ausbauen</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.3">Waren bestellen</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/3.4"><del>Preise festlegen</del></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Personal" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="#action/4.1">Kasse</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/4.2">Lagerung</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/4.3">Reinigung</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/4.4"><del>Filialleiter</del></NavDropdown.Item>
                        </NavDropdown>
                        <Link className="nav-link" to={"/api/markets"}>Märkte</Link>
                        <Link className="nav-link" to={"/api/products"}>Produkte</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}