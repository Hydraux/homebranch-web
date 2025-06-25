import type { Route } from "./+types/read-book";

import { fetchBookById } from "@/entities/book";
import { ReactReader, ReactReaderStyle, type IReactReaderStyle } from "react-reader";
import { useMemo, useState } from "react";
import { Box, CloseButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { bookId } = params;
  return await fetchBookById(bookId);
}

function getInitialLocation(bookId: string): string | number {
  const savedLocation = JSON.parse(
    localStorage.getItem("currentlyReading") ?? "{}"
  )[bookId];
  return savedLocation ?? 0;
}

export default function ReadBook({ loaderData }: Route.ComponentProps) {
  const {theme, systemTheme} = useTheme();
  const isDarkMode = theme === "dark" || theme === "system" && systemTheme === "dark";
  const navigate = useNavigate();
  const [location, setLocation] = useState<string | number>(
    getInitialLocation(loaderData.id)
  );

  useMemo(() => {
    const currentlyReading = JSON.parse(
      localStorage.getItem("currentlyReading") ?? "{}"
    );
    currentlyReading[loaderData.id] = location;
    localStorage.setItem("currentlyReading", JSON.stringify(currentlyReading));
  }, [location]);

  return (
    <>
      <Box h={"100vh"} w="100%" position={"fixed"} top={0} left={0}>
        <ReactReader
          url={`${import.meta.env.VITE_BACKEND_URL}/uploads/books/${
            loaderData.fileName
          }`}
          title={loaderData.title}
          location={location}
          locationChanged={setLocation}
          readerStyles={isDarkMode ? darkReaderTheme : lightReaderTheme}
        />
      </Box>
      <CloseButton position={"fixed"} top={0} right={0} variant={"plain"} onClick={()=>navigate(-1)}/>
    </>
  );
}

const lightReaderTheme: IReactReaderStyle = {
  ...ReactReaderStyle,
  readerArea: {
    ...ReactReaderStyle.readerArea,
    transition: undefined,
  },
}

const darkReaderTheme: IReactReaderStyle = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: 'white',
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: '#ccc',
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: '#000',
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: '#ccc',
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: '#111',
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: '#222',
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: '#fff',
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: 'white',
  },
}
