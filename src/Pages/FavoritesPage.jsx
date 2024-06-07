import React, { useState, useEffect } from "react";

const FavoritePage = () => {
  const [favoriteCombination, setFavoriteCombination] = useState(null);
  const deviceId = localStorage.getItem("deviceId");

  useEffect(() => {
    const fetchFavoriteCombination = async () => {
      try {
        const response = await fetch(
          `https://backend-favorites.onrender.com/favorites/${deviceId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Favorite combination:", data);
          setFavoriteCombination(data);
        } else {
          console.error("Failed to fetch favorite combination");
        }
      } catch (error) {
        console.error("Error fetching favorite combination", error);
      }
    };

    fetchFavoriteCombination();
  }, [deviceId]);

  return (
    <div>
      <h2>Favorieten</h2>
      {favoriteCombination ? (
        <div className="border border-4 border-gray-900">
          <h3>Visual:</h3>
          {favoriteCombination.favorites[0].visual && (
            <div>
              <p>{favoriteCombination.favorites[0].visual.title}</p>
            </div>
          )}
          <h3>Tracks:</h3>
          <ul>
            {favoriteCombination.tracks ? (
              favoriteCombination.tracks.map((track, index) => (
                <li key={index}>{track}</li>
              ))
            ) : (
              <li>No tracks found</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FavoritePage;
