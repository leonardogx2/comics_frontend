import React from "react";
import {
  FaFistRaised,
  FaGhost,
  FaTheaterMasks,
  FaLaughBeam,
  FaHeart,
  FaMap,
  FaBook,
} from "react-icons/fa";
import { GiFairyWand } from "react-icons/gi";
import { MdVisibility } from "react-icons/md";
import { SiDcentertainment } from "react-icons/si";
import CategoryItem from "../../molecules/CategoryItem";
import { BookCategory } from "../../interfaces";
import ScrollableList from "../../molecules/ScrollableList";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const categoryArray: { title: string; value: BookCategory }[] = [
    {
      title: "Ação",
      value: "ACTION",
    },
    {
      title: "Aventura",
      value: "ADVENTURE",
    },
    {
      title: "Comédia",
      value: "COMEDY",
    },
    {
      title: "Drama",
      value: "DRAMA",
    },
    {
      title: "Fantasia",
      value: "FANTASY",
    },
    {
      title: "Ficção",
      value: "FICTION",
    },
    {
      title: "Romance",
      value: "ROMANTIC",
    },
    {
      title: "Super-Herói",
      value: "SUPERHERO",
    },
    {
      title: "Suspense",
      value: "SUSPENSE",
    },
    {
      title: "Terror",
      value: "HORROR",
    },
  ];

  const icons = {
    ACTION: FaFistRaised,
    HORROR: FaGhost,
    DRAMA: FaTheaterMasks,
    FANTASY: GiFairyWand,
    COMEDY: FaLaughBeam,
    SUSPENSE: MdVisibility,
    ROMANTIC: FaHeart,
    ADVENTURE: FaMap,
    FICTION: FaBook,
    SUPERHERO: SiDcentertainment,
  };

  return (
    <section className="relative flex w-full items-center">
      <ScrollableList className="no-scrollbar flex gap-3 overflow-x-scroll">
        {categoryArray.map((c) => (
          <CategoryItem
            onClick={() => navigate(`/comics/?category=${c.value}`)}
            key={c.value}
            title={c.title}
            value={c.value}
            Icon={icons[c.value]}
          />
        ))}
      </ScrollableList>
    </section>
  );
};

export default Categories;
