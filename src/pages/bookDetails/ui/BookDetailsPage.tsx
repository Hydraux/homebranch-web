import { DeleteConfirmationDialog } from "@/components/ui/modals/DeleteConfirmationDialog";
import type { BookModel } from "@/entities/book";
import { config } from "@/shared";
import {
  Box,
  HStack,
  IconButton,
  Heading,
  Separator,
  Image,
  Text,
} from "@chakra-ui/react";
import { HiPencil, HiHeart, HiBookOpen } from "react-icons/hi";
import { Link } from "react-router";


export interface BookDetailsPageProps {
  book: BookModel;
}

export default function BookDetailsPage({book}: BookDetailsPageProps) {
  return (
    <>
    <Box p={4}>
      <HStack align={"start"}>
        <Box>
          <Image
            src={`${config.backendUrl}/uploads/cover-images/${
              book.coverImageFileName
            }`}
            alt={book.title}
            w={"200px"}
          />
          <HStack mt={2} justify={"space-between"}>
            <DeleteConfirmationDialog
              title={`Delete book: ${book.title}`}
              action={`/delete-book/${book.id}`}
            />
            <IconButton variant={"subtle"}>
              <HiPencil />
            </IconButton>
            <IconButton variant={"subtle"}>
              <HiHeart />
            </IconButton>
            <IconButton variant={"subtle"} asChild>
              <Link to={`/books/${book.id}/read`}>
                <HiBookOpen />
              </Link>
            </IconButton>
          </HStack>
        </Box>
        <Box p={4} flex={1}>
          <Heading>{book.title}</Heading>
          <Text color={"GrayText"} fontSize={"sm"}>
            {book.author}
          </Text>
          <Separator my={4} />
          <Text fontSize={"md"}>Published Year: {book.publishedYear}</Text>
        </Box>
      </HStack>
    </Box>
    </>
  );
}
