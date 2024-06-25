import { Image } from "@/interfaces";
import React from "react";

interface BookImageProps {
  image?: Image;
  className?: string;
  alt?: string;
}

const BookImage = ({ image, className, alt }: BookImageProps) => {
  const imageUrl = image
    ? image.local
      ? `${import.meta.env.VITE_API_URL}/public/uploads/${image.name}`
      : image.url
    : "";

  return imageUrl ? (
    <img
      src={imageUrl}
      loading="lazy"
      alt={alt + " comic image."}
      className={`${className} h-full w-full object-cover`}
    />
  ) : (
    <div
      className={`${className} h-full w-full animate-pulse bg-gray-100 duration-1000`}
    ></div>
  );
};

export { BookImage };
