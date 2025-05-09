import { useState } from "react";
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";
import Listing from "../../components/listing/Listing";

import "./home.css";
import Download from "../../components/download/Download";

export default function Home() {
  const [category, setCategory] = useState("all");

  return (
    <div>
      <Header />
      <Menu category={category} setCategory={setCategory} />
      <Listing category={category} />
      <Download />
    </div>
  );
}
