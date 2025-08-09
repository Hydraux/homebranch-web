import { config } from "@/shared/config";
import type { BookModel } from "../model/BookModel";

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  isFavorited?: boolean;
  publishedYear?: string;
}

export async function updateBook(
  id: string,
  request: UpdateBookRequest
): Promise<BookModel> {
  try {
    const response = await fetch(`${config.backendUrl}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: BookModel = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update book:", error);
    throw error; // Re-throw the error for further handling
  }
}
