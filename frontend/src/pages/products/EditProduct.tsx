import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {Product} from "../../types/Product.ts";
import {Category} from "../../types/Category.ts";

type UpdateProductProps = {
    product: Product,
    updateProduct: (
        id: string,
        name: string,
        producer: string,
        category: Category,
        pricePerBox: number,
        fairMarketValue: number,
        yourPrice: number,
        itemsPerBox: number,
    ) => void
}

export default function EditProduct(props: Readonly<UpdateProductProps>) {

    const navigate = useNavigate();

    const categories = Object.values(Category);

    const [name, setName] = useState(props.product.name);
    const [producer, setProducer] = useState(props.product.producer);
    const [category, setCategory] = useState(props.product.category);
    const [pricePerBox, setPricePerBox] = useState(props.product.pricePerBox);
    const [fairMarketValue, setFairMarketValue] = useState(props.product.fairMarketValue);
    const [yourPrice, setYourPrice] = useState(props.product.yourPrice);
    const [itemsPerBox, setItemsPerBox] = useState(props.product.itemsPerBox);



    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (!name || !producer || !category || !pricePerBox || !fairMarketValue || !yourPrice || !itemsPerBox) {
            console.error("One or more fields are undefined");
            return;
        }
        props.updateProduct(props.product.id, name, producer, category, pricePerBox, fairMarketValue, yourPrice, itemsPerBox);
        navigate("/api/products");
    }

    return (
        <div>
            <h1>Edit Product</h1>
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
                           onChange={(e) => setCategory(Category[e.target.value as keyof typeof Category])}>
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