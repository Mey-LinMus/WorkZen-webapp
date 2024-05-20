import React, { useContext } from "react";
import MusicExplorer from "../Music/MusicExplorer";
import { SelectionContext } from "../Contexts/SelectionContext";

const MusicSelect = () => {
  const { setSelectedMusic } = useContext(SelectionContext);

  // Assuming you have a function to handle playlist selection
  const handlePlaylistSelect = (playlist) => {
    setSelectedMusic(playlist.tracks); // Assuming playlist.tracks contains selected tracks
  };

  return (
    <div>
      <MusicExplorer onPlaylistSelect={handlePlaylistSelect} />
    </div>
  );
};

export default MusicSelect;
