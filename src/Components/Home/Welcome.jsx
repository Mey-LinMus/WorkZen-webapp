import React from "react";
import Typography from "../ui-elements/Typography";

const Welcome = () => {
  return (
    <div className="bg-secondaryColor min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="mb-4 sm:text-xl">
        <Typography variant="h2">
          Welcome bij WorkZen
        </Typography>
      </div>
      <div className="max-w-xl ">
        <Typography variant="bodyText" className="sm:mx-6 ">
          Maak kennis met "WorkZen" –<br /> de ultieme webapplicatie die muziek
          en visuals combineert om een unieke ontspanningservaring te creëren.
        </Typography>
      </div>
      <div></div>
    </div>
  );
};

export default Welcome;
