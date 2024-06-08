import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../Components/ui-elements/Typography";

const FavoritePage = () => {
  const [favoriteCombinations, setFavoriteCombinations] = useState([]);
  const deviceId = localStorage.getItem("deviceId");
  const navigate = useNavigate();

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

    localStorage.removeItem("selectedVisual");
    localStorage.removeItem("selectedTracks");

    localStorage.setItem("Favorite", JSON.stringify(favorite));
    localStorage.setItem(
      "selectedVisual",
      JSON.stringify(favorite.favorite.visual)
    );
    localStorage.setItem(
      "selectedTracks",
      JSON.stringify(favorite.favorite.tracks)
    );

    navigate("/scene-page");
  };

  return (
    <div className="bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end min-h-screen flex flex-col items-center">
      <div className="mt-12 mb-12">
        <Typography variant="h2">Favorites</Typography>
      </div>

      {favoriteCombinations.length > 0 ? (
        favoriteCombinations.map((favorite, index) => (
          <button
            key={index}
            className="relative overflow-hidden rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={() => handleFavoriteClick(favorite)}
          >
            {favorite.name ? (
              <div className="bg-neutralColor text-primaryColor font-segoe text-bodyText ">
                <strong>
                  <p className="p-4 ">{favorite.name}</p>
                </strong>
              </div>
            ) : (
              <Typography variant="bodyText">No name found</Typography>
            )}
            {favorite.favorite &&
            favorite.favorite.visual &&
            favorite.favorite.visual.video ? (
              <div>
                <video
                  width="300"
                  type="video/mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src={favorite.favorite.visual.video}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <Typography variant="bodyText">No visual video found</Typography>
            )}
          </button>
        ))
      ) : (
        <Typography variant="bodyText">
          No favorite combinations found
        </Typography>
      )}
    </div>
  );
};

export default FavoritePage;
