import React, { createContext, useState, useContext } from "react";

const SelectionContext = createContext();

export const useSelection = () => {
  return useContext(SelectionContext);
};

export const SelectionProvider = ({ children }) => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);

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
