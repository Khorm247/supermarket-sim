import Container from "react-bootstrap/Container";
import {Col, ProgressBar, Row} from "react-bootstrap";
import {useUser} from "../context/UserContext.tsx";
import {Market} from "../types/Market.ts";
import {useEffect, useState} from "react";
import {Money} from "phosphor-react";

type StatusBarProps = {
    markets: Market[],
}

export default function StatusBar(props: Readonly<StatusBarProps>) {
    const [market, setMarket] = useState<Market>(props.markets[0]);
    const { userId } = useUser();

    useEffect(() => {
        const newMarket = props.markets.find((market) => market.id === userId)
        if (newMarket)
            setMarket(newMarket);
        console.log("Market updated with useEffekt in StatusBar.tsx")
    }, [props.markets, userId]);

    return (
        <Container className="align-self-center rounded-bottom bg-body-secondary">
            {
                (market == null) ? <p>Loading...</p>
                    :
                    <div className={"small p-1"}>
                        <Row className="m-1">
                            <Col className="m-1" sm={1}><h2>{market.name}</h2></Col>
                            <Col className="m-1" sm={2}><Money size={40}/> {market.balance}€</Col>
                            <Col>
                                <Row className="m-1">Lagerplätze: {market.currentStorage} / {market.maximumStorage}</Row>
                                <Row className="m-1">
                                    <ProgressBar className={"bg-dark-subtle"} striped max={market.maximumStorage} now={market.currentStorage}/>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="m-1">Regalplätze: {market.currentShelfSpace} / {market.maximumShelfSpace}</Row>
                                <Row className="m-1">
                                    <ProgressBar className={"bg-dark-subtle"} striped max={market.maximumShelfSpace} now={market.currentShelfSpace}/>
                                </Row>
                            </Col>
                        </Row>
                    </div>
            }
        </Container>
    )
}