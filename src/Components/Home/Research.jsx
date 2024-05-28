import React from "react";
import Typography from "../ui-elements/Typography";
import ImageOne from "../../Assets/Images/Home_asset1.png";
import ImageTwo from "../../Assets/Images/Home_asset2.png";
import ImageThree from "../../Assets/Images/Home_asset3.png";

const Research = () => {
  return (
    <div className="bg-primaryColor p-4 grid gap-12 lg:grid-cols-2  ">
      <div className="relative flex justify-center items-center mt-5	">
        <img src={ImageOne} alt="asset1" className="size-128 rounded-3xl" />
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full lg:hidden">
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
      </div>
      <div className="hidden lg:flex flex-col justify-center">
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

      <div className="relative flex justify-center items-center">
        <img
          src={ImageTwo}
          alt="asset2"
          className="size-128 rounded-3xl object-scale-down"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full lg:hidden">
          <Typography variant="h3" className="mb-4">
            Visuele Beelden
          </Typography>
          <Typography variant="bodyText">
            Visuele beelden zijn ook effectief in het verminderen van stress.
            Het gebruik van kalmerende helpt de geest te kalmeren en stress te
            verlagen.
          </Typography>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center">
        <Typography variant="h3" className="mb-4">
          Visuele Beelden
        </Typography>
        <Typography variant="bodyText">
          Visuele beelden zijn ook effectief in het verminderen van stress. Het
          gebruik van kalmerende helpt de geest te kalmeren en stress te
          verlagen.
        </Typography>
      </div>

      <div className="relative flex justify-center items-center mb-12 ">
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full lg:hidden">
          <Typography variant="h3" className="mb-4">
            Visuele Beelden
          </Typography>
          <Typography variant="bodyText">
            Visuele beelden zijn ook effectief in het verminderen van stress.
            Het gebruik van kalmerende helpt de geest te kalmeren en stress te
            verlagen.
          </Typography>
        </div>
        <img
          src={ImageTwo}
          alt="asset2"
          className="size-128 rounded-3xl object-scale-down"
        />
      </div>

      <div className="hidden lg:flex flex-col justify-center   ">
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

export default Research;
