import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import ProductList from "./pages/products/ProductList.tsx";
import MarketList from "./pages/market/MarketList.tsx";

export default function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/api/markets" element={<MarketList/>}/>
            <Route path="/api/products" element={<ProductList/>}/>
            <Route path="/api/markets/:id" element={<h1>Home</h1>}/>
            <Route path="/api/products/:id" element={<h1>Home</h1>}/>
        </Routes>
        <NavBar />
    </>
  )
}
