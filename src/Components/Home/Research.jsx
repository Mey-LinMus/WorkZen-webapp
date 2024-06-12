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
            Uit onderzoek blijkt dat bepaalde muziekgenres effectief kunnen zijn
            bij het verminderen van stress. Klassieke muziek staat bekend om
            zijn kalmerende eigenschappen, terwijl instrumentale muziek vaak de
            voorkeur heeft omdat het minder afleidend is dan muziek met
            zangteksten. Dit helpt bij het bevorderen van concentratie en
            ontspanning. Het is echter belangrijk op te merken dat de voorkeur
            voor een bepaald muziekgenre sterk kan variëren van persoon tot
            persoon.
          </Typography>
        </div>
      </div>
      <div className="hidden lg:flex flex-col justify-center">
        <div className="mb-4">
          <Typography variant="h3" className="mb-4">
            Muziek
          </Typography>
        </div>
        <Typography variant="bodyText">
          Uit onderzoek blijkt dat bepaalde muziekgenres effectief kunnen zijn
          bij het verminderen van stress. Klassieke muziek staat bekend om zijn
          kalmerende eigenschappen, terwijl instrumentale muziek vaak de
          voorkeur heeft omdat het minder afleidend is dan muziek met
          zangteksten. Dit helpt bij het bevorderen van concentratie en
          ontspanning. Het is echter belangrijk op te merken dat de voorkeur
          voor een bepaald muziekgenre sterk kan variëren van persoon tot
          persoon.
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
            Visuele beelden zijn een krachtig middel om stress te verminderen.
            Veel mensen maken gebruik van visualisatietechnieken als onderdeel
            van stressmanagement en mindfulness-oefeningen. Het visualiseren van
            positieve, kalmerende beelden kan de geest tot rust brengen.
            Beweging en ritme worden beschouwd als de meest effectieve visuele
            elementen bij het verminderen van stress.
          </Typography>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center">
        <div className="mb-4">
          <Typography variant="h3" className="mb-4">
            Visuele Beelden
          </Typography>
        </div>
        <Typography variant="bodyText">
          Visuele beelden zijn een krachtig middel om stress te verminderen.
          Veel mensen maken gebruik van visualisatietechnieken als onderdeel van
          stressmanagement en mindfulness-oefeningen. Het visualiseren van
          positieve, kalmerende beelden kan de geest tot rust brengen. Beweging
          en ritme worden beschouwd als de meest effectieve visuele elementen
          bij het verminderen van stress.
        </Typography>
      </div>

      <div className="relative flex justify-center items-center mb-12 ">
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full lg:hidden">
          <Typography variant="h3" className="mb-4">
            Virtual Reality
          </Typography>
          <Typography variant="bodyText">
            Virtual reality (VR) wordt steeds meer erkend als een effectief
            hulpmiddel voor stressvermindering. Recent onderzoek toont aan dat
            VR-omgevingen gebruikers kunnen onderdompelen in therapeutische
            omgevingen die ontspanning en mindfulness bevorderen. Een
            veelgebruikte methode in VR-systemen is begeleide beeldvorming,
            waarbij gebruikers door rustgevende scenario’s en activiteiten
            worden geleid. De effectiviteit van VR bij het verminderen van
            stress wordt vaak geëvalueerd met zowel subjectieve als objectieve
            metingen, wat bewijst dat VR een aanzienlijke impact kan hebben op
            stressniveaus.
          </Typography>
        </div>
        <img
          src={ImageThree}
          alt="asset2"
          className="size-128 rounded-3xl object-scale-down"
        />
      </div>

      <div className="hidden lg:flex flex-col justify-center">
        <div className="mb-4">
          <Typography variant="h3">Virtual Reality</Typography>
        </div>
        <Typography variant="bodyText">
          Virtual reality (VR) wordt steeds meer erkend als een effectief
          hulpmiddel voor stressvermindering. Recent onderzoek toont aan dat
          VR-omgevingen gebruikers kunnen onderdompelen in therapeutische
          omgevingen die ontspanning en mindfulness bevorderen. Een
          veelgebruikte methode in VR-systemen is begeleide beeldvorming,
          waarbij gebruikers door rustgevende scenario’s en activiteiten worden
          geleid. De effectiviteit van VR bij het verminderen van stress wordt
          vaak geëvalueerd met zowel subjectieve als objectieve metingen, wat
          bewijst dat VR een aanzienlijke impact kan hebben op stressniveaus.
        </Typography>
      </div>
    </div>
  );
};

export default Research;
