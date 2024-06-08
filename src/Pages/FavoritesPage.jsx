import React, { useState, useEffect } from "react";

const FavoritePage = () => {
  const [favoriteCombinations, setFavoriteCombinations] = useState([]);
  const deviceId = localStorage.getItem("deviceId");

  useEffect(() => {
    const fetchFavoriteCombinations = async () => {
      try {
        const response = await fetch(
          `https://backend-favorites.onrender.com/favorites/${deviceId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Favorite combinations:", data);
          setFavoriteCombinations(data.favorites);
        } else {
          console.error("Failed to fetch favorite combinations");
        }
      } catch (error) {
        console.error("Error fetching favorite combinations", error);
      }
    };

    fetchFavoriteCombinations();
  }, [deviceId]);

  const handleFavoriteClick = (favorite) => {
    console.log("Favorite clicked:", favorite);
    // Save favorite to localStorage
    localStorage.setItem("lastClickedFavorite", JSON.stringify(favorite));
  };

  return (
    <div>
      <h2>Favorieten</h2>

      {favoriteCombinations.length > 0 ? (
        favoriteCombinations.map((favorite, index) => (
          <button
            key={index}
            className="border border-4 border-gray-900 p-4 mb-4 text-left w-full"
            onClick={() => handleFavoriteClick(favorite)}
          >
            {favorite.name ? (
              <p>
                <strong>Name:</strong> {favorite.name}
              </p>
            ) : (
              <p>No name found</p>
            )}
            {favorite.favorite &&
            favorite.favorite.visual &&
            favorite.favorite.visual.video ? (
              <div>
                <video controls width="300">
                  <source
                    src={favorite.favorite.visual.video}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <p>No visual video found</p>
            )}
          </button>
        ))
      ) : (
        <p>No favorite combinations found</p>
      )}
    </div>
  );
};

export default FavoritePage;
