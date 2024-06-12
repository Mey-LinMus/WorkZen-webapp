import React from "react";

const FavoriteDisplay = ({ lastClickedFavorite }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
      <h3>Last Clicked Favorite:</h3>
      <p>Name: {lastClickedFavorite.name}</p>
      {lastClickedFavorite.favorite &&
      lastClickedFavorite.favorite.visual &&
      lastClickedFavorite.favorite.visual.video ? (
        <div>
          <video controls width="300">
            <source
              src={lastClickedFavorite.favorite.visual.video}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <p>No visual video found</p>
      )}
    </div>
  );
};

export default FavoriteDisplay;
