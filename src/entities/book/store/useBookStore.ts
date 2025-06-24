import { create } from 'zustand'
import { fetchBooks } from '..'
import type { BookModel } from '../model/BookModel';

interface BookState {
  books: BookModel[];
  fetchBooks: () => Promise<void>;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  fetchBooks: async () => fetchBooks().then((books) => set({ books })),
}));
