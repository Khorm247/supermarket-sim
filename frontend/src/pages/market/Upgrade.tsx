import {Button, Col, Row, Card} from "react-bootstrap";
import {Inventory} from "../../types/Inventory.ts";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";


type UpgradeProps = {
    addCategory: (category: string, cost: number) => void,
    upgradeStorage: (amount: number, cost: number) => void,
    fetchMarkets: () => void,
    inventory: Inventory
}

export default function Upgrade(props: Readonly<UpgradeProps>) {
    const [alreadyBought, setAlreadyBought] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const alreadyBoughtCategories = props.inventory.inventoryItems.map(item => item.product.category);
        setAlreadyBought(alreadyBoughtCategories);
    }, [props.inventory]);

    function handleUpgradeClick(category: string, cost: number) {
        props.addCategory(category, cost);
        navigate("/api/inventory");
    }

    function handleStorageUpgradeClick(amount: number, cost: number) {
        props.upgradeStorage(amount, cost);
    }

    return (
        <Container className={"py-3"}>
            <Row>
                <div className="d-flex justify-content-center">
                    <h1>Laden ausbauen</h1>
                </div>
            </Row>
            <Row>
                {
                    /*
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

                     */
                }

                <Col>
                    <Card style={{height: '22rem'}}>
                        <Card.Img style={{height: '12rem'}} variant="top" src="https://source.unsplash.com/random/120×100/?storage" />
                        <Card.Body>
                            <Card.Title>Lagerplatz erweitern</Card.Title>
                            <Card.Text>
                                erweitere dein Lager um 20 Plätze
                            </Card.Text>
                            <Button
                                className="button-secondary"
                                onClick={() => handleStorageUpgradeClick(20, 150)}
                                disabled={alreadyBought.includes("STORAGE")}
                            >
                                150€
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
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

                                {
                                    alreadyBought.includes("FRUITS")
                                        ?
                                        <span className="text-success fw-bold">Bereits gekauft</span>
                                        :
                                        "erweitere dein Sortiment um Früchte"
                                }
                            </Card.Text>
                            <Button
                                onClick={() => handleUpgradeClick("FRUITS", 200)}
                                className="button-secondary"
                                disabled={alreadyBought.includes("FRUITS")}
                            >
                                200€
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{height: '22rem'}}>
                        <Card.Img style={{height: '12rem'}} variant="top" src="https://source.unsplash.com/random/120×100/?cleaning" />
                        <Card.Body>
                            <Card.Title>Reinigungsproduktlizenz</Card.Title>
                            <Card.Text>
                                {
                                    alreadyBought.includes("CLEANING_SUPPLIES")
                                        ?
                                        <span className="text-success fw-bold">Bereits gekauft</span>
                                        :
                                        "erweitere dein Sortiment um Reinigungsprodukte"
                                }
                            </Card.Text>
                            <Button
                                onClick={() => handleUpgradeClick("CLEANING_SUPPLIES", 250)}
                                className="button-secondary"
                                disabled={alreadyBought.includes("CLEANING_SUPPLIES")}
                            >
                                250€
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}