import { Box, Card, Image, Stack, Text } from "@chakra-ui/react";
import type { BookModel } from "../model/BookModel";
import { Link } from "react-router";
import { config } from "@/shared";

export function BookCard({ book }: { book: BookModel }) {
  return (
    <Stack>
      <Link to={`/books/${book.id}`}>
      <Card.Root p={0}>
        <Card.Body p={0}>
          <Image
            src={`${config.backendUrl}/uploads/cover-images/${
              book.coverImageFileName
            }`}
            h={"250px"}
          />
        </Card.Body>
      </Card.Root>
      </Link>
      <Box>
        <Link to={`/books/${book.id}`}>
        <Text>{book.title}</Text>
        </Link>
        <Text color={"GrayText"} fontSize={"sm"}>
          {book.author}
        </Text>
      </Box>
    </Stack>
  );
}
