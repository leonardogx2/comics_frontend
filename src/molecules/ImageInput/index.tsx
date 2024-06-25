import React, { useEffect, useState } from "react";
import Text from "@/atoms/Text";
import { IoMdPhotos } from "react-icons/io";
import InputError from "@/atoms/InputError";
import Box from "../Box";

interface ImageInputProps {
  width: number;
  height: number;
  onImageChange: (file: File) => void;
  error?: string;
  defaultValue?: string;
}

const ImageInput = ({
  width,
  height,
  onImageChange,
  error,
  defaultValue,
}: ImageInputProps) => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null,
  );

  useEffect(() => {
    if (defaultValue) setImagePreview(defaultValue);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  return (
    <div
      className={`w-[${width}px] h-[${height}px] relative flex cursor-pointer select-none flex-col items-center justify-center border-2 ${!imagePreview ? "border-dashed" : ""} border-default-red`}
    >
      {imagePreview ? (
        <img
          src={imagePreview as string}
          alt="Book preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-default-red">
          <IoMdPhotos className="text-2xl" />
          <Text Tag="p">Adicionar Imagem</Text>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute h-full w-full cursor-pointer opacity-0"
        onChange={handleImageChange}
      />
      <InputError className="-bottom-6 flex w-full truncate">
        {error}
      </InputError>
    </div>
  );
};

export default ImageInput;
