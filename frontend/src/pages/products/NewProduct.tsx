import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {Category} from "../../types/Category.ts";
import {Product} from "../../types/Product.ts";
import Container from "react-bootstrap/Container";
import {Col, Form, Row} from "react-bootstrap";

type NewProductProps = {
    saveProduct: (product: Product) => void
}

export default function NewProduct(props: Readonly<NewProductProps>) {

    const navigate = useNavigate();
    const categories = Object.keys(Category);

    const [name, setName] = useState("");
    const [producer, setProducer] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [pricePerBox, setPricePerBox] = useState(0);
    const [fairMarketValue, setFairMarketValue] = useState(0);
    const [yourPrice, setYourPrice] = useState(0);
    const [itemsPerBox, setItemsPerBox] = useState(0);

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const product: Product = {
            id: "",
            name: name,
            producer: producer,
            category: Category[category as keyof typeof Category],
            pricePerBox: pricePerBox,
            fairMarketValue: fairMarketValue,
            yourPrice: yourPrice,
            itemsPerBox: itemsPerBox,
        }
        props.saveProduct(product);
        setName("");
        setProducer("");
        setCategory(categories[0]);
        setPricePerBox(0);
        setFairMarketValue(0);
        setYourPrice(0);
        setItemsPerBox(0);
        navigate("/api/products");
    }

    return (
        <Container data-bs-theme="dark">
            <h1>New Product</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name"
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="producer" className="form-label">Producer</label>
                            <input type="text" className="form-control" id="producer"
                                   onChange={(e) => setProducer(e.target.value)}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Col>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Kategorie</label>
                                <select className="form-control" id="category"
                                        defaultValue={Category[categories[0] as keyof typeof Category]}
                                        onChange={(e) => setCategory(Category[categories[e.target.selectedIndex] as keyof typeof Category])}>
                                    <option>Open this select menu</option>
                                    {
                                        categories.map((category) => (
                                            <option key={category}
                                                    value={Category[category as keyof typeof Category]}>{category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Col>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="pricePerBox" className="form-label">Price Per Box</label>
                            <input type="number" className="form-control" id="pricePerBox"
                                   onChange={(e) => setPricePerBox(Number(e.target.value))}/>
                        </div>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="fairMarketValue" className="form-label">Fair Market Value</label>
                            <input type="number" className="form-control" id="fairMarketValue"
                                   onChange={(e) => setFairMarketValue(Number(e.target.value))}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="yourPrice" className="form-label">Your Price</label>
                            <input type="number" className="form-control" id="yourPrice"
                                   onChange={(e) => setYourPrice(Number(e.target.value))}/>
                        </div>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="itemsPerBox" className="form-label">Items Per Box</label>
                            <input type="number" className="form-control" id="itemsPerBox"
                                   onChange={(e) => setItemsPerBox(Number(e.target.value))}/>
                        </div>
                    </Col>
                </Row>


                <button type="submit" className="btn btn-primary">Produkt anlegen</button>
            </Form>
        </Container>
    )
}