import { config } from "@/shared/config";
import type { BookModel } from "../model/BookModel";

export async function fetchBookById(bookId: string): Promise<BookModel> {
  console.log("Fetching book by ID from backend...");
  try {
    const response = await fetch(`${config.backendUrl}/books/${bookId}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Book with ID ${bookId} not found`);
      }
      throw new Error('Network response was not ok');
    }
    const data: BookModel = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error; // Re-throw the error for further handling
  }
}