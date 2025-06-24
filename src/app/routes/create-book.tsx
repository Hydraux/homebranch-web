import type { Route } from "./+types/create-book";
import { toaster } from "@/components/ui/toaster";
import { type CreateBookRequest, createBook } from "@/entities/book";
import Epub from "epubjs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Homebranch - Create Book" },
  ];
}

export async function clientAction({request}: Route.ClientActionArgs) {
  console.log("clientAction called");
  const formData = await request.formData();
  const files = formData.getAll("files") as File[] | null
  console.log("files", files);
  if (files && files.length > 0) {
    const epub = Epub(await files[0].arrayBuffer());
    const metadata = await epub.loaded.metadata;

    const coverImageUrl = await epub.coverUrl();
    let coverImageBlob: Blob | undefined = undefined;
    if (coverImageUrl) {
      const coverImageResponse = await fetch(coverImageUrl);
      coverImageBlob = await coverImageResponse.blob();
    }

    const createBookRequest: CreateBookRequest = {
      title: metadata.title,
      author: metadata.creator,
      isFavorited: false,
      publishedYear: new Date(metadata.pubdate).getFullYear().toString(),
      file: files[0],
      coverImage: coverImageBlob,
    };
    await createBook(createBookRequest).then(() => {
      toaster.create({
        title: "Book created successfully!",
        type: "success",
      });
    }).catch((error) => {
      console.error("Error creating book:", error);
      toaster.create({
        title: "Failed to create book",
        type: "error",
      });
    });
  }
}
