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
import InventoryList from "./pages/inventory/InventoryList.tsx";
import Upgrade from "./pages/market/Upgrade.tsx";
import {Product} from "./types/Product.ts";
import {useState} from "react";
import useInventory from "./hooks/useInventory.ts";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";
import {ShoppingCart} from "./components/ShoppingCart.tsx";

export default function App() {

    const {products, saveProduct, updateProduct, deleteProduct} = useProduct();
    const [product, setProduct] = useState<Product>();
    const {inventory, addCategory} = useInventory();

    return (
        <ShoppingCartProvider>
            <NavBar />
            <Routes>
                <Route path="/" element={<Overview/>} />
                <Route path="/api/cart" element={<ShoppingCart isOpen={false}/>} />
                <Route path="/api/inventory" element={<InventoryList inventory={inventory}/>}/>
                <Route path="/api/markets" element={<MarketList/>}/>
                <Route path="/api/products" element={<ProductList deleteProduct={setProduct} handleProduct={setProduct} products={products}/>}/>
                <Route path="/api/products/new" element={<NewProduct saveProduct={saveProduct}/>}/>
                <Route path="/api/products/:id" element={<h1>Home</h1>}/>
                {product && <Route path="/api/products/:id/edit" element={<EditProduct product={product} updateProduct={updateProduct}/>}/>}
                <Route path="/api/products/:id/delete" element={<DeleteProduct deleteProduct={deleteProduct}/>}/>
                <Route path="/api/upgrade" element={<Upgrade addCategory={addCategory} inventory={inventory}/>}/>
            </Routes>
        </ShoppingCartProvider>
    )
}
