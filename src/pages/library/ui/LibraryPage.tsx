import { BookCard, type BookModel } from "@/entities/book";
import { Flex, For } from "@chakra-ui/react";

export function LibraryPage({books}: { books: BookModel[] }) {
  return (
    <Flex wrap={"wrap"} width={"100%"} ml={4} gap={4}>
      <For each={books}>
        {(book, index) => (
          <BookCard
            book={book}
          />
        )}
      </For>
    </Flex>
  );
}
