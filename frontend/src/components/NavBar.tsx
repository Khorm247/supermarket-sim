import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar fixed={"top"} variant="light" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>Supermarket Simulator</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title={"Laden"} id={"basic-nav-dropdown"}>
                            <NavDropdown.Item as={Link} to={"/"}>Ladenübersicht</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/api/inventory"}>Bestandsliste</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Management" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/api/upgrade">Laden ausbauen</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.1"><del>Personal einstellen</del></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/3.4"><del>Preise festlegen</del></NavDropdown.Item>
                        </NavDropdown>
                        <del><NavDropdown title="Personal" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="#action/4.1">Kasse</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/4.2">Lagerung</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/4.3">Reinigung</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/4.4"><del>Filialleiter</del></NavDropdown.Item>
                        </NavDropdown></del>
                        <Link className="nav-link" to={"/api/markets"}>Märkte(Admin)</Link>
                        <NavDropdown title={"Produkte(Admin)"} id={"basic-nav-dropdown"}>
                            <NavDropdown.Item as={Link} to={"/api/products"}>Produktliste</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/api/products/new"}>Neues Produkt</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}