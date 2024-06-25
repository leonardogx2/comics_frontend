import { TUpdateBookSchema } from "@/organisms/BookForm/validator";
import { api } from "..";

type IUpdateBook = TUpdateBookSchema & { id: string };

export async function updateBook(data: IUpdateBook) {
  const form = new FormData();
  if (data.image) form.append("file", data.image);
  form.append("book", JSON.stringify({ ...data, image: undefined }));

  console.log({ data });

  await api.put(`/book/${data.id}`, form, {
    headers: { "Content-type": "multipart/form-data" },
  });
}
