import React from "react";
import Typography from "../ui-elements/Typography";

const Welcome = () => {
  return (
    <div className="bg-secondaryColor">
      <div className="">
        <Typography variant="h2"> Welcome bij WorkZen </Typography>
      </div>
      <div className="">
        <Typography variant="bodyText">
          Maak kennis met "WorkZen" – de ultieme webapplicatie die muziek en
          visuals combineert om een unieke ontspanningservaring te creëren.
        </Typography>
      </div>
    </div>
  );
};

export default Welcome;
