import React, { createContext, useState } from "react";

// SelectionContext.js
export const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Add this line

  return (
    <SelectionContext.Provider
      value={{
        selectedVisual,
        setSelectedVisual,
        selectedMusic,
        setSelectedMusic,
        selectedPlaylist, // Add this line
        setSelectedPlaylist, // Add this line
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
