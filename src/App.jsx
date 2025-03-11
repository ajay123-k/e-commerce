import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SingleProduct from "./Components/SingleProduct";
import CategoryProducts from "./Components/CategoryProducts";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import ProfilePage from "./Components/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Shop />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/product/:id" element={<SingleProduct />}></Route>
          <Route
            path="/category/:categoryName"
            element={<CategoryProducts />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
