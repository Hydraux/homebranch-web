import { BookCard, useBookStore } from "@/entities/book";
import type { BookModel } from "@/entities/book/model/BookModel";
import { Flex, For, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
