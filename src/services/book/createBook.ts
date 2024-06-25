import { RegisterBookSchema } from "@/organisms/BookForm";
import { api } from "..";

export async function createBook(data: RegisterBookSchema) {
  const form = new FormData();
  form.append("file", data.image);
  form.append("book", JSON.stringify({ ...data, image: undefined }));

  console.log({ data });

  await api.post("/book", form, {
    headers: { "Content-type": "multipart/form-data" },
  });
}
