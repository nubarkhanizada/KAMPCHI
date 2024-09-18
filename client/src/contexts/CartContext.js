import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
const storedTours = JSON.parse(localStorage.getItem("tours")) || [];

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(storedProducts);
  const [tours, setTours] = useState(storedTours);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("tours", JSON.stringify(tours));
  }, [tours]);

  const addToCart = (data, type) => {
    if (type === "product") {
      const existingItem = products.find((item) => item.productId === data.productId);
      if (existingItem) {
        const updatedProducts = products.map((item) => item.productId === data.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setProducts(updatedProducts);
        toast.success("Product quantity updated in the cart");
      } else {
        setProducts([...products, { ...data, quantity: 1 }]);
        toast.success("Product added to cart");
      }
    } else if (type === "tour") {
      const existingItem = tours.find((item) => item.tourId === data.tourId);
      if (existingItem) {
        const updatedTours = tours.map((item) => item.tourId === data.tourId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setTours(updatedTours);
        toast.success("Tour quantity updated in the cart");
      } else {
        setTours([...tours, { ...data, quantity: 1 }]);
        toast.success("Tour added to cart");
      }
    }
  };

  const removeFromCart = (id, type) => {
    if (type === "product") {
      const filteredProducts = products.filter((item) => item.productId !== id);
      setProducts(filteredProducts);
      toast.success("Product removed from cart");
    } else if (type === "tour") {
      const filteredTours = tours.filter((item) => item.tourId !== id);
      setTours(filteredTours);
      toast.success("Tour removed from cart");
    }
  };

  const increaseQuantity = (id, type) => {
    if (type === "product") {
      const updatedProducts = products.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setProducts(updatedProducts);
    } else if (type === "tour") {
      const updatedTours = tours.map((item) =>
        item.tourId === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTours(updatedTours);
    }
  };

  const decreaseQuantity = (id, type) => {
    if (type === "product") {
      const updatedProducts = products.map((item) =>
        item.productId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setProducts(updatedProducts);
    } else if (type === "tour") {
      const updatedTours = tours.map((item) =>
        item.tourId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setTours(updatedTours);
    }
  };

  const totalAmount = () => {
    const productTotal = products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tourTotal = tours.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const total = productTotal + tourTotal;
    
    return total.toFixed(2);
  };

  const totalItems = () => {
    return products.length + tours.length;
  };

  const TotalQuantity = () => {
    let totalProducts = 0;
    let totalTours = 0;
    products.forEach((product) => {
      totalProducts += product.quantity;
    });
    tours.forEach((tour) => {
      totalTours += tour.quantity;
    });
    return totalProducts + totalTours;
  };

  return (
    <CartContext.Provider
      value={{ products, tours, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalAmount, totalItems, TotalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
