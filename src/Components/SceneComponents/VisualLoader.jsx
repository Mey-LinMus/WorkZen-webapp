import React, { useEffect, useState } from "react";

const VisualLoader = ({ selectedVisual, onVisualComponentLoad }) => {
  useEffect(() => {
    const loadVisualComponent = async () => {
      try {
        const module = await import(
          `../Components/Visuals/${selectedVisual.component}.jsx`
        );
        onVisualComponentLoad(module.default);
      } catch (error) {
        console.error("Error loading visual component", error);
      }
    };

    loadVisualComponent();
  }, [selectedVisual, onVisualComponentLoad]);

  return null;
};

export default VisualLoader;
