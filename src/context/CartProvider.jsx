import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);

// CartProvider Component
export const CartProvider = ({ children }) => {
  const [cartLength, setCartLength] = useState(() => {
    // Retrieve cart length from local storage or default to 0
    const savedCartLength = localStorage.getItem("cartLength");
    return savedCartLength ? parseInt(savedCartLength, 10) : 0;
  });

  // Update local storage whenever cartLength changes
  useEffect(() => {
    localStorage.setItem("cartLength", cartLength);
  }, [cartLength]);

  return (
    <CartContext.Provider value={{ cartLength, setCartLength }}>
      {children}
    </CartContext.Provider>
  );
};
