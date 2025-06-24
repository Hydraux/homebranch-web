import { config } from "@/shared/config";
import type { BookModel } from "../model/BookModel";

export async function fetchBooks() {
  console.log("Fetching books from backend...");
  try {
    const response = await fetch(`${config.backendUrl}/books`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: BookModel[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error; // Re-throw the error for further handling
  }
}