import type { BookModel } from "@/entities/book";
import {axiosInstance} from "@/shared";

export async function fetchBookById(bookId: string): Promise<BookModel> {
  console.log("Fetching book by ID from backend...");
  try {
      return await axiosInstance.get(`/books/${bookId}`)
          .then(response => response.data);
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error; // Re-throw the error for further handling
  }
}