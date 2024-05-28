import React from "react";
import Typography from "../ui-elements/Typography";

const Welcome = () => {
  return (
    <div className="bg-secondaryColor min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="mb-4">
        <Typography variant="h2">Welcome bij WorkZen</Typography>
      </div>
      <div className="max-w-xl">
        <Typography variant="bodyText">
          Maak kennis met "WorkZen" – de ultieme webapplicatie die muziek en
          visuals combineert om een unieke ontspanningservaring te creëren.
        </Typography>
      </div>
      <div>

        
      </div>
    </div>
  );
};

export default Welcome;
