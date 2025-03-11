import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvide = ({ children }) => {
  const [contextProduct, setContextProduct] = useState([]);

  return (
    <ProductContext.Provider value={{ contextProduct, setContextProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
