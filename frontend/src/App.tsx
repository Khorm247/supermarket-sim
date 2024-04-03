import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import ProductList from "./pages/products/ProductList.tsx";
import MarketList from "./pages/market/MarketList.tsx";
import NewProduct from "./pages/products/NewProduct.tsx";
import useProduct from "./hooks/useProduct.ts";

export default function App() {

    const {products, saveProduct, updateProduct, deleteProduct} = useProduct();

    return (
        <>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/api/markets" element={<MarketList/>}/>
                <Route path="/api/products" element={<ProductList products={products}/>}/>
                <Route path="/api/products/new" element={<NewProduct saveProduct={saveProduct}/>}/>
                <Route path="/api/products/:id" element={<h1>Home</h1>}/>
                <Route path="/api/products/:id/edit" element={<h1>Home</h1>}/>
                <Route path="/api/products/:id/delete" element={<h1>Home</h1>}/>
                <Route path="/api/markets/:id" element={<h1>Home</h1>}/>
            </Routes>
            <NavBar />
        </>
    )
}
