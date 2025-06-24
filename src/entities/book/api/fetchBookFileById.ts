import { config } from "@/shared/config";
import { fetchBookById } from "./fetchBookById";

export async function fetchBookFileById(bookId: string): Promise<Blob> {
  console.log("Fetching book file by ID from backend...");
  try {
    const book = await fetchBookById(bookId);
    const response = await fetch(`${config.backendUrl}/uploads/books/${book.fileName}`);
    return response.blob().then((blob) => {
      if (!response.ok) {
        throw new Error('Network response was not ok while fetching book file');
      }
      return blob;
    });
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error; // Re-throw the error for further handling
  }
}