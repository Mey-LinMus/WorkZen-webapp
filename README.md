# WorkZen Web App

WorkZen is een webapplicatie die muziek en visuele elementen combineert om een unieke ontspanningservaring te creëren. Deze toepassing is ontworpen om gebruikers te helpen stress te verminderen en hun welzijn te verbeteren door middel van zorgvuldig samengestelde muziekafspeellijsten en rustgevende visuele scènes.

## Inhoudstafel

- [WorkZen Web App](#workzen-web-app)
  - [Inhoudstafel](#inhoudstafel)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Usage](#usage)
    - [Muziek selecteren](#muziek-selecteren)
    - [Visuals kiezen](#visuals-kiezen)
    - [Combinaties maken](#combinaties-maken)
  - [Scripts en Dependencies](#scripts-en-dependencies)
    - [Music](#music)
    - [Styling](#styling)
  - [File Structure](#file-structure)
  - [Development](#development)
    - [De ontwikkelomgeving instellen](#de-ontwikkelomgeving-instellen)
    - [App runnen](#app-runnen)
    - [Bouwen voor productie](#bouwen-voor-productie)
  - [Gebruikte Scripts](#gebruikte-scripts)
  - [Servers](#servers)
  - [Bronnen die geholpen hebben voor het project](#bronnen-die-geholpen-hebben-voor-het-project)

## Getting Started

Om te starten met het project WorkZen, volg deze stappen:

    1. Clone de repository:

```bash
    git clone https://github.com/Mey-LinMus/WorkZen-webapp.git
    cd WorkZen-webapp
```
    2. Installeer dependencies:

```bash
    npm install
 ```

    3. Start het project:

```bash
    npm start
 ```

De applicatie is beschikbaar op http://localhost:3000.

## Features

- Muziek integratie: Maak verbinding met Spotify om toegang te krijgen tot een groot aantal afspeellijsten.
- Visual scenes: Kies uit verschillende visuele scènes om je ontspanningservaring te verbeteren.
- Favorieten: Sla je favoriete combinaties van muziek en visuals op zodat je ze gemakkelijk kunt openen.

## Usage

### Muziek selecteren

1. Navigeer naar de muziekkeuzepagina.
2. Authenticeer met je Spotify-account.
3. Kies je favoriete nummers uit de meegeleverde afspeellijsten.

### Visuals kiezen

1. Navigeer naar de visuele selectiepagina.
2. Blader door de beschikbare visuele scènes.
3. Selecteer de visuele scène die je maar wilt.

### Combinaties maken

1. Combineer de gekozen muziek en visuals.
2. Sla de combinatie op voor toekomstig gebruik.
3. Geniet van je persoonlijke ontspanningservaring.

## Scripts en Dependencies

### Music

- Spotify Web API Node: npm i spotify-web-api-node
- Express: npm i express
- Nodemon: npm i nodemon
- Axios: npm i axios
- CORS: npm i cors
- Body-parser: npm i body-parser
- React Spotify Web Playback: npm i react-spotify-web-playback

### Styling

- Tailwind CSS: npm install -D tailwindcss
- React Icons: npm i react-icons
- Material Tailwind: https://www.material-tailwind.com/docs/react/installation

## File Structure

- public/ - Public assets and HTML template
- src/ - Source code
- Components/ - React components
- Pages/ - React pages
- Assets/ - Images and videos
- Routes.jsx - Route definitions
- App.jsx - Main application component
- index.js - Entry point of the application
- Data/ - JSON data files

## Development

### De ontwikkelomgeving instellen

1. Installeer Node.js and npm.
2. Clone de repository en ga naar de project map.
3. Installeer de nodige dependencies door gebruik te maken van ´npm install´.

### App runnen

Gebruik om de applicatie in de ontwikkelmodus te draaien:

```bash
npm start
```

### Bouwen voor productie

Gebruik om een productie build te maken:

```bash
npm run build
```

## Gebruikte Scripts

**Three.js**
Use the package manager [npm](https://www.npmjs.com/package/three) to install three.

```bash
npm i three
```

**Music integration**
Use the package manager [npm](https://www.npmjs.com/package/spotify-web-api-node) to install spotify-web-api-node.

```bash
npm i spotify-web-api-node
```

**Fetching**
Use the package manager [npm](https://www.npmjs.com/package/axios) to install axios.

```bash
npm i axios
```

**Fetching**
Use the package manager [npm](https://www.npmjs.com/package/react-spotify-web-playback) to install react-spotify-web-playback .

```bash
npm i react-spotify-web-playback
```

**Styling Tailwind**
Use the package manager [npm](https://tailwindcss.com/docs/installation) to install tailwindcss .

```bash
npm install -D tailwindcss - npx tailwindcss init
```

**React icon**
Use the package manager [npm](https://www.npmjs.com/package/react-icon) to install react-icons.

```bash
npm install react-icons
```

## Servers

Er is gebruik gemaakt van 2 servers/

Server voor het handelen van de favorieten:

[backend-favorites](https://github.com/Mey-LinMus/backend-favorites-.git)

Meer uitleg over de server zijn te vinden op de repositories van de servers zelf

## Bronnen die geholpen hebben voor het project

- Een helper voor Tailwind: https://www.tailwindhelper.com/
- Tutorial van Three.js: https://threejs-journey.com/
- https://chatgpt.com/
- Video voor het gebruiken van de Spotify API: https://youtu.be/Xcet6msf3eE?si=wZB2C3RrCkTfgIAC
- Three.js documentatie: https://threejs.org/docs/index.html#manual/en/introduction/Installation
- Cube map voor envMapping: https://www.humus.name/index.php?page=Textures&start=8
- DeviceOrientation permission function: https://leemartin.dev/how-to-request-device-motion-and-orientation-permission-in-ios-13-74fc9d6cd140
- Spotify API: https://developer.spotify.com/documentation/web-api

