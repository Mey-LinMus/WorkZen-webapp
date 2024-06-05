import React, { useEffect, useState } from "react";
import Dashboard from "../Music/Dashboard";
import Typography from "../ui-elements/Typography";

function MusicSelect() {
  const [selectedVisual, setSelectedVisual] = useState(null);

  useEffect(() => {
    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);
  }, []);

  return (
    <div className="p-4 bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end">
      {selectedVisual && (
        <div>
          {/* <video
            className=""
            src={selectedVisual.video}
            type="video/mp4"
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video> */}
        </div>
      )}
      <Dashboard />
    </div>
  );
}

export default MusicSelect;
