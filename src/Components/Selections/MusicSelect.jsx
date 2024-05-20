import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectionContext } from "../Contexts/SelectionContext";

const MusicSelectPage = () => {
  const { selectedMusic, setSelectedMusic } = useContext(SelectionContext);
  const navigate = useNavigate();
  const [localSelection, setLocalSelection] = useState([...selectedMusic]);

  // Simple array of music options
  const musicTracks = ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"];

  const handleSelect = (track) => {
    setLocalSelection((prevSelection) => {
      if (prevSelection.includes(track)) {
        return prevSelection.filter((item) => item !== track);
      } else {
        return [...prevSelection, track];
      }
    });
  };

  const handleNext = () => {
    setSelectedMusic(localSelection);
    navigate("/scene");
  };

  return (
    <div>
      <h1>Select Music</h1>
      <div style={styles.container}>
        {musicTracks.map((track, index) => (
          <div
            key={index}
            style={{
              ...styles.box,
              backgroundColor: localSelection.includes(track)
                ? "#d3d3d3"
                : "#f0f0f0",
            }}
            onClick={() => handleSelect(track)}
          >
            {track}
          </div>
        ))}
      </div>
      <button style={styles.nextButton} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  box: {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  nextButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
  },
};

export default MusicSelectPage;
