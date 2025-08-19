"use client";

import Navbar from "../Shared/Navbar";
import Banner from "./Banner";
import CategoriesPage from "./Category";

export default function HomePage() {
  return (
    <section className="min-h-screen">
      {/* <Navbar></Navbar> */}
      <CategoriesPage></CategoriesPage>
      {/* <Banner></Banner> */}
    </section>
  );
}
