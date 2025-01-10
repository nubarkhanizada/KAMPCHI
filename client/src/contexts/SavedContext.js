import { createContext, useEffect, useState } from "react";

export const SavedContext = createContext();

const SavedProvider = ({ children }) => {

  const [saved, setSaved] = useState( JSON.parse(localStorage.getItem("saved")));

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  const addToSaved = (data) => {
    const existingItem = saved.find((item) => item.tourId === data.tourId);
    if (!existingItem) {
      setSaved([...saved, data]);
    }
  };

  const removeFromSaved = (tourId) => {
    const filteredSaved = saved.filter((item) => item.tourId !== tourId);
    setSaved(filteredSaved);
  };
  
  return (
    <SavedContext.Provider value={{ saved, addToSaved, removeFromSaved }} >
      {children}
    </SavedContext.Provider>
  );
};

export default SavedProvider;
