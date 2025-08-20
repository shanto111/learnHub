"use client";

import Navbar from "../Shared/Navbar";
import Banner from "./Banner";
import CategoriesPage from "./Category";
import PopularCoursePage from "./PopularCourse";
import WhyChooseUs from "./WhyChooseUs";

export default function HomePage() {
  return (
    <section className="min-h-screen">
      {/* <Navbar></Navbar> */}
      <Banner></Banner>
      <CategoriesPage></CategoriesPage>
      <PopularCoursePage></PopularCoursePage>
      <WhyChooseUs></WhyChooseUs>
    </section>
  );
}
