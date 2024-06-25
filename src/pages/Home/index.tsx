import React from "react";
import Header from "../../organisms/Header";
import Banner from "../../molecules/Banner";
import Categories from "../../organisms/Categories";
import SponsoredBook from "../../molecules/SponsoredBook";
import Footer from "../../molecules/Footer";
import Box from "@/molecules/Box";
import BookSection from "@/organisms/BookSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Box className="mx-auto mt-6 flex w-4/5 flex-col items-center gap-6 sm:w-2/3">
        <Categories />
        <BookSection size={15} filterBy="OFFER" />
        <SponsoredBook />
        <BookSection size={15} filterBy="USERPREFERENCE" />
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
