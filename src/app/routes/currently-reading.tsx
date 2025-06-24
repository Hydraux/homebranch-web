import { fetchBookById } from "@/entities/book";
import type { Route } from "./+types/currently-reading";
import { LibraryPage } from "@/pages/library";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Homebranch - Currently Reading" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({}: Route.LoaderArgs) {
  const currentlyReading = JSON.parse(localStorage.getItem("currentlyReading") ?? "{}");

  const ids = Object.keys(currentlyReading ?? {});

  return await Promise.all(
    ids.map((id) => {
      return fetchBookById(id)
    })
  )
}

export default function CurrentlyReading({loaderData}: Route.ComponentProps) {
  return <LibraryPage books={loaderData} />;
}
