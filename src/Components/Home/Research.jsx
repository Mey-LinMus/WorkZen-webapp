import React from "react";
import Typography from "../ui-elements/Typography";
import ImageOne from "../../Assets/Images/Home_asset1.png";
import ImageTwo from "../../Assets/Images/Home_asset2.png";
import ImageThree from "../../Assets/Images/Home_asset3.png";

const Reasearch = () => {
  return (
    <div className="bg-primaryColor grid grid-cols-2 gap-12 p-8">
      <div className="flex justify-center items-center">
        <img
          src={ImageOne}
          alt="asset1"
          className="size-128 rounded-3xl 1.5rem 24px"
        />
      </div>
      <div className="flex flex-col justify-center">
        <Typography variant="h3" className="mb-4">
          Muziek
        </Typography>
        <Typography variant="bodyText">
          Uit onderzoek blijkt dat muziek aanzienlijk helpt bij
          stressvermindering. Vooral klassieke en instrumentale muziek hebben
          kalmerende effecten. De juiste muziekkeuze kan leiden tot een
          aanzienlijke vermindering van stress.
        </Typography>
      </div>

      <div className="flex flex-col justify-center">
        <Typography variant="h3" className="mb-4">
          Visuele Beelden
        </Typography>
        <Typography variant="bodyText">
          Visuele beelden zijn ook effectief in het verminderen van stress. Het
          gebruik van kalmerende helpt de geest te kalmeren en stress te
          verlagen.
        </Typography>
      </div>
      <div className="flex justify-center items-center">
        <img
          src={ImageTwo}
          alt="asset1"
          className=" size-128 object-scale-down rounded-3xl 1.5rem 24px"
        />
      </div>

      <div className="flex justify-center items-center">
        <img
          src={ImageThree}
          alt="asset1"
          className="size-128 object-scale-down rounded-3xl 1.5rem 24px"
        />
      </div>
      <div className="flex flex-col justify-center">
        <Typography variant="h3" className="mb-4">
          Virtual Reality
        </Typography>
        <Typography variant="bodyText">
          Virtual Reality (VR) biedt een innovatieve manier om stress te
          verminderen. VR-omgevingen dompelen gebruikers onder in rustgevende
          scenario's, wat zorgt voor een aanzienlijke vermindering van
          stressniveaus.
        </Typography>
      </div>
    </div>
  );
};

export default Reasearch;
