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

  return (
    <div>
      <h2>Favorieten</h2>
      {favoriteCombinations.length > 0 ? (
        favoriteCombinations.map((favorite, index) => (
          <div key={index} className="border border-4 border-gray-900">
            <h3>Visual:</h3>
            {favorite.visual && (
              <div>
                <p>{favorite.visual.title}</p>
              </div>
            )}
            <h3>Tracks:</h3>
            <ul>
              {favorite.tracks ? (
                favorite.tracks.map((track, index) => (
                  <li key={index}>{track}</li>
                ))
              ) : (
                <li>No tracks found</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FavoritePage;
