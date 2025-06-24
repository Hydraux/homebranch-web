import type { Route } from "./+types/read-book";


import { fetchBookById } from "@/entities/book/api/fetchBookById";
import { ReactReader } from "react-reader";
import { useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { bookId } = params;
  return await fetchBookById(bookId);
}

function getInitialLocation(bookId: string): string | number {
  const savedLocation = JSON.parse(localStorage.getItem("currentlyReading") ?? "{}")[bookId];
  return savedLocation ?? 0;
}

export default function ReadBook({ loaderData }: Route.ComponentProps) {
  const [location, setLocation] = useState<string | number>(getInitialLocation(loaderData.id));

  useMemo(()=>{
    const currentlyReading = JSON.parse(localStorage.getItem("currentlyReading") ?? "{}");
    currentlyReading[loaderData.id] = location;
    localStorage.setItem("currentlyReading", JSON.stringify(currentlyReading));
  },[location])


  return (
  <Box h={"100vh"} w="100%" position={"fixed"} top={0} left={0}>
    <ReactReader
        url={`${import.meta.env.VITE_BACKEND_URL}/uploads/books/${loaderData.fileName}`}
        title={loaderData.title} 
        location={location} 
        locationChanged={setLocation}    />
    </Box>
  );
}
