import React from "react";
import Header from "../Components/Home/Header";
import Welcome from "../Components/Home/Welcome";
import Research from "../Components/Home/Reasearch";
import Footer from "../Components/Home/Footer";

export default function HomePage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <head>
        <div>
          <Welcome />
        </div>
        <div>
          <Research />
        </div>
      </head>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
