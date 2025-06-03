import FetchResponse from "@/application/interfaces/FetchResponse";
import { Book } from "@/domain/entities/Book";

export default async function getBooks(): Promise<FetchResponse<Book[]>> {
    const response = await fetch("http://homebranch-backend:3000/books");
    await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate a delay TODO: Remove this in production
    const books = response.ok ? await response.json() : [];
    return {
        data: books,
        status: response.status,
        statusText: response.statusText,
    }
}