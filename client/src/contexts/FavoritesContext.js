import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState( JSON.parse(localStorage.getItem("favorites")));

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (data) => {
    const existingItem = favorites.find((item) => item.productId === data.productId);
    if (!existingItem) {
      setFavorites([...favorites, data]);
    }
  };

  const removeFromFavorites = (productId) => {
    const filteredProducts = favorites.filter((item) => item.productId !== productId);
    setFavorites(filteredProducts);
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }} >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
