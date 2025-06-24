import type { Route } from "./+types/book";

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Separator,
  Text,
} from "@chakra-ui/react";

import { fetchBookById } from "@/entities/book";
import { HiBookOpen, HiHeart, HiPencil, HiTrash } from "react-icons/hi";
import { Link } from "react-router";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { bookId } = params;
  return await fetchBookById(bookId);
}

export default function Book({ loaderData }: Route.ComponentProps) {
  return (
    <Box p={4}>
      <HStack align={"start"}>
        <Box>
          <Image
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/cover-images/${
              loaderData.coverImageFileName
            }`}
            alt={loaderData.title}
            w={"200px"}
          />
          <HStack mt={2} justify={"space-between"}>
            <IconButton variant={"subtle"}>
              <HiTrash />
            </IconButton>
            <IconButton variant={"subtle"}>
              <HiPencil />
            </IconButton>
            <IconButton variant={"subtle"}>
              <HiHeart />
            </IconButton>
            <IconButton variant={"subtle"} asChild>
                <Link to={`/books/${loaderData.id}/read`}>
              <HiBookOpen />
                </Link>
            </IconButton>
          </HStack>
        </Box>
        <Box p={4} flex={1}>
          <Heading>{loaderData.title}</Heading>
          <Text color={"GrayText"} fontSize={"sm"}>
            {loaderData.author}
          </Text>
          <Separator my={4} />
          <Text fontSize={"md"}>
            Published Year: {loaderData.publishedYear}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
