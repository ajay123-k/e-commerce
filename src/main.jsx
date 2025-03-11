import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductProvide } from "./Context/Product.jsx";
import { UserCartProvide } from "./Context/Cart.jsx";

createRoot(document.getElementById("root")).render(
  <ProductProvide>
    <UserCartProvide>
      <App />
    </UserCartProvide>
  </ProductProvide>
);
