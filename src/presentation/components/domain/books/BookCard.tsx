import { Book } from "@/domain/entities/Book";

export default function BookCard(book: Book){
    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Published: {book.publishedYear}</p>
            <p>Genre: {book.genre}</p>
        </div>
    )
}