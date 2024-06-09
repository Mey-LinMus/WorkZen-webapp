import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../Components/ui-elements/Typography";
import UILogo from "../Components/ui-elements/Logo";
import StyledButton from "../Components/ui-elements/Button";
import { CgAdd } from "react-icons/cg";

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

  const handleClickNewCombinations = () => {
    navigate("/visual-select");
  };

  return (
    <div className="bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end min-h-screen flex flex-col items-center">
      <div className="mt-12 mb-12">
        <Typography variant="h2">Favorieten</Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center ">
        <UILogo className="z-10" />

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
                <div className="items-center justify-center">
                  <Typography variant="bodyText ">
                    No visual video found
                  </Typography>
                </div>
              )}
            </button>
          ))
        ) : (
          <Typography
            variant="bodyText"
            className="flex items-center justify-center"
          >
            Geen favorieten gevonden
          </Typography>
        )}
      </div>
      <div className="mt-28 mb-12 flex flex-col items-center justify-center h-screen">
        <Typography variant="h2">Maak een nieuw combinatie</Typography>

        <div className="flex items-center justify-center mt-28">
          <button
            className="text-neutralColor text-4xl"
            onClick={handleClickNewCombinations}
          >
            <CgAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
