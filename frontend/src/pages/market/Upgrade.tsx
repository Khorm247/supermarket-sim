import {Button, Col, Row, Card} from "react-bootstrap";
import {Inventory} from "../../types/Inventory.ts";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";


type UpgradeProps = {
    addCategory: (category: string) => void,
    inventory: Inventory
}

export default function Upgrade(props: Readonly<UpgradeProps>) {
    const navigate = useNavigate();

    function handleUpgradeClick(category: string) {
        console.log(category);
        props.addCategory(category);
        navigate("/api/inventory")
    }

    return (
        <Container className={"py-3"}>
            <Row>
                <div className="d-flex justify-content-center">
                    <h1>Laden ausbauen</h1>
                </div>
            </Row>
            <Row>
            <Col>
                    <Card style={{height: '22rem'}}>
                        <Card.Img style={{height: '12rem'}} variant="top" src="https://source.unsplash.com/random/120×100/?shelf" />
                        <Card.Body>
                            <Card.Title>Regalplatz erweitern</Card.Title>
                            <Card.Text>
                                erweitere deinen Regalplatz um 10 Plätze
                            </Card.Text>
                            <Button className="button-secondary">100€</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{height: '22rem'}}>
                        <Card.Img style={{height: '12rem'}} variant="top" src="https://source.unsplash.com/random/120×100/?storage" />
                        <Card.Body>
                            <Card.Title>Lagerplatz erweitern</Card.Title>
                            <Card.Text>
                                erweitere dein Lager um 20 Plätze
                            </Card.Text>
                            <Button className="button-secondary">150€</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <div className="d-flex justify-content-center">
                    <h1>Lizenzen kaufen</h1>
                </div>
            </Row>

            <Row>
                <Col>
                    <Card style={{height: '22rem'}}>
                        <Card.Img style={{height: '12rem'}} variant="top" src="https://source.unsplash.com/random/120×100/?fruit" />
                        <Card.Body>
                            <Card.Title>Fruchtlizenz</Card.Title>
                            <Card.Text>
                                erweitere dein Sortiment um Früchte
                            </Card.Text>
                            <Button onClick={() => handleUpgradeClick("FRUITS")} className="button-secondary">200€</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{height: '22rem'}}>
                        <Card.Img style={{height: '12rem'}} variant="top" src="https://source.unsplash.com/random/120×100/?cleaning" />
                        <Card.Body>
                            <Card.Title>Reinigungsproduktlizenz</Card.Title>
                            <Card.Text>
                                erweitere dein Sortiment um Reinigungsprodukte
                            </Card.Text>
                            <Button onClick={() => handleUpgradeClick("CLEANING_SUPPLIES")} className="button-secondary">250€</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}