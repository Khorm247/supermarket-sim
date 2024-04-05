import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../../types/Product.ts";
import {Category} from "../../types/Category.ts";

type UpdateProductProps = {
    updateProduct: (
        id: string,
        name: string,
        producer: string,
        category: string,
        pricePerBox: number,
        fairMarketValue: number,
        yourPrice: number,
        itemsPerBox: number,
    ) => void
}

export default function NewProduct(props: Readonly<UpdateProductProps>) {

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const categories = Object.values(Category);

    const [product, setProduct] = useState<Product | null | undefined>(undefined);
    const [name, setName] = useState(product?.name);
    const [producer, setProducer] = useState(product?.producer);
    const [category, setCategory] = useState(product?.category);
    const [pricePerBox, setPricePerBox] = useState(product?.pricePerBox);
    const [fairMarketValue, setFairMarketValue] = useState(product?.fairMarketValue);
    const [yourPrice, setYourPrice] = useState(product?.yourPrice);
    const [itemsPerBox, setItemsPerBox] = useState(product?.itemsPerBox);

    if (!id) {
        navigate("/");
        console.log("Id undefined!");
    }

    function fetchProduct() {
        axios.get(`/api/products/${id}`)
            .then((response) => {
                setName(response.data.name);
                setProducer(response.data.producer);
                if(response.data.category === "" || response.data.category === null){
                    setCategory(categories[0]);
                }
                else{
                    setCategory(response.data.category);
                }
                setPricePerBox(response.data.pricePerBox);
                setFairMarketValue(response.data.fairMarketValue);
                setYourPrice(response.data.yourPrice);
                setItemsPerBox(response.data.itemsPerBox);
            })
            .catch(() => {
                setProduct(null);
            });
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        if(product?.category === "" || product?.category === null){
            setCategory(categories[0]);
        }
        else{
            setCategory(product?.category);
        }
    }, [categories]);

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (!id || !name || !producer || !category || !pricePerBox || !fairMarketValue || !yourPrice || !itemsPerBox) {
            console.error("One or more fields are undefined");
            return;
        }
        props.updateProduct(id, name, producer, category, pricePerBox, fairMarketValue, yourPrice, itemsPerBox);
        navigate("/api/products");
    }

    return (
        <div>
            <h1>New Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="producer" className="form-label">Producer</label>
                    <input type="text" className="form-control" id="producer"
                           value={producer}
                           onChange={(e) => setProducer(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Kategorie</label>
                    <select className="form-control" id="category"
                           defaultValue={categories[0]}
                           onChange={(e) => setCategory(e.target.value)}>
                        {
                            categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pricePerBox" className="form-label">Price Per Box</label>
                    <input type="number" className="form-control" id="pricePerBox"
                            value={pricePerBox}
                           onChange={(e) => setPricePerBox(Number(e.target.value))}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="fairMarketValue" className="form-label">Fair Market Value</label>
                    <input type="number" className="form-control" id="fairMarketValue"
                           value={fairMarketValue}
                           onChange={(e) => setFairMarketValue(Number(e.target.value))}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="yourPrice" className="form-label">Your Price</label>
                    <input type="number" className="form-control" id="yourPrice"
                           value={yourPrice}
                           onChange={(e) => setYourPrice(Number(e.target.value))}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemsPerBox" className="form-label">Items Per Box</label>
                    <input type="number" className="form-control" id="itemsPerBox"
                           value={itemsPerBox}
                           onChange={(e) => setItemsPerBox(Number(e.target.value))}/>
                </div>
                <button type="submit" className="btn btn-primary">Produkt speichern</button>
            </form>
        </div>
    )
}