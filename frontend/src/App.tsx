import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import ProductList from "./pages/products/ProductList.tsx";
import MarketList from "./pages/market/MarketList.tsx";
import NewProduct from "./pages/products/NewProduct.tsx";
import useProduct from "./hooks/useProduct.ts";
import EditProduct from "./pages/products/EditProduct.tsx";
import DeleteProduct from "./pages/products/DeleteProduct.tsx";
import Overview from "./pages/market/Overview.tsx";
import Inventory from "./pages/market/Inventory.tsx";
import Upgrade from "./pages/market/Upgrade.tsx";
import {Product} from "./types/Product.ts";
import {useState} from "react";

export default function App() {

    const {products, saveProduct, updateProduct, deleteProduct} = useProduct();
    const [product, setProduct] = useState<Product>();

    return (
        <>
            <Routes>
                <Route path="/" element={<Overview/>} />
                <Route path="/api/inventory" element={<Inventory/>}/>
                <Route path="/api/markets" element={<MarketList/>}/>
                <Route path="/api/products" element={<ProductList deleteProduct={setProduct} handleProduct={setProduct} products={products}/>}/>
                <Route path="/api/products/new" element={<NewProduct saveProduct={saveProduct}/>}/>
                <Route path="/api/products/:id" element={<h1>Home</h1>}/>
                {
                    product && <Route path="/api/products/:id/edit" element={<EditProduct product={product} updateProduct={updateProduct}/>}/>
                }
                <Route path="/api/products/:id/delete" element={<DeleteProduct deleteProduct={deleteProduct}/>}/>
                <Route path="/api/upgrade" element={<Upgrade/>}/>
            </Routes>
            <NavBar />
        </>
    )
}
