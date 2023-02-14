import React from "react";

import Showcase from "../../components/Showcase/Showcase";
import HomeCategory from "../../components/Home-Category/Home-Category";
import Popular from "../../components/Popular/Popular";
import Sale from "../../components/Sale/Sale";
import Offer from "../../components/Offer/Offer";
import Brands from "../../components/Brands/Brands";

function Home() {
  return (
    <div className="home">
      <Showcase />
      <HomeCategory />
      <Popular />
      <Sale />
      <Offer />
      <Brands />
    </div>
  );
}

export default Home;
