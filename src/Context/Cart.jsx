import { createContext, useEffect, useState } from "react";

export const UserCartContext = createContext();

export const UserCartProvide = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  return (
    <UserCartContext.Provider value={{ cart, setCart }}>
      {children}
    </UserCartContext.Provider>
  );
};
