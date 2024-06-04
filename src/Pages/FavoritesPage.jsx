import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [deviceId, setDeviceId] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const generateDeviceId = () => {
      const id = window.crypto.randomUUID();
      setDeviceId(id);
      return id;
    };

    const storedDeviceId = window.localStorage.getItem('deviceId');
    if (storedDeviceId) {
      setDeviceId(storedDeviceId);
    } else {
      const newDeviceId = generateDeviceId();
      window.localStorage.setItem('deviceId', newDeviceId);
      setDeviceId(newDeviceId);
    }
  }, []);

  useEffect(() => {
    if (deviceId) {
      fetch(`https://backend-favorites.onrender.com/favorites?deviceId=${deviceId}`)
        .then((response) => response.json())
        .then((data) => setFavorites(data.favorites || []));
    }
  }, [deviceId]);

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>{JSON.stringify(favorite)}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
