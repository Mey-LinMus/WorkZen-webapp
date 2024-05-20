import React, { createContext, useState } from "react";

export const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState([]); // Change to an array for playlist

  return (
    <SelectionContext.Provider
      value={{
        selectedVisual,
        setSelectedVisual,
        selectedMusic,
        setSelectedMusic,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};