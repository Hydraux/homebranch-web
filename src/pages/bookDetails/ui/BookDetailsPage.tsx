import { DeleteConfirmationDialog } from "@/components/ui/modals/DeleteConfirmationDialog";
import { updateBook, type BookModel } from "@/entities/book";
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
import { useState } from "react";
import { HiPencil, HiHeart, HiBookOpen } from "react-icons/hi";
import { Link } from "react-router";


export interface BookDetailsPageProps {
  book: BookModel;
}

export default function BookDetailsPage({book}: BookDetailsPageProps) {
  const [isFavorited, setIsFavorited] = useState(book.isFavorited);

  const favoriteHandler = async () => {
    try {
      setIsFavorited(!isFavorited);
      const updatedBook = await updateBook(book.id, {
        isFavorited: !isFavorited,
      });
      setIsFavorited(updatedBook.isFavorited);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };
  
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
          <HStack mt={2}>
            <DeleteConfirmationDialog
              title={`Delete book: ${book.title}`}
              action={`/delete-book/${book.id}`}
            />
            {/*TODO: Implement edit book functionality */}
            {/* <IconButton variant={"subtle"}>
              <HiPencil />
            </IconButton> */}
            <IconButton variant={"subtle"} onClick={favoriteHandler}>
              <HiHeart color={isFavorited ? "red" : undefined}/>
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
