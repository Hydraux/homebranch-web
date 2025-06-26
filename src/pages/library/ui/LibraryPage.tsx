import { BookCard, type BookModel } from "@/entities/book";
import { Flex, For } from "@chakra-ui/react";

export function LibraryPage({books}: { books: BookModel[] }) {
  const sortedBooks = books.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  return (
    <Flex wrap={"wrap"} width={"100%"} ml={4} gap={4}>
      <For each={sortedBooks}>
        {(book, _index) => (
          <BookCard
            book={book}
          />
        )}
      </For>
    </Flex>
  );
}
