import React from "react";
import Header from "../Components/Home/Header";
import Welcome from "../Components/Home/Welcome";
import Research from "../Components/Home/Research";
import Footer from "../Components/Home/Footer";

export default function HomePage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <div>
          <Welcome />
        </div>
        <div>
          <Research />
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
