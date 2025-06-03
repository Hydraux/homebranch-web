import { Book } from "@/domain/entities/Book";
import BookCard from "../components/domain/books/BookCard";

interface BookShelfPresenterProps {
    books: Book[];
}

export default function BookShelfPresenter({ books }: BookShelfPresenterProps) {

    const bookCards = books.map((book) => (
        <BookCard key={book.id} {...book} />
    ));

    return (
        <div>
            <h2>Book Shelf</h2>
            {bookCards}
        </div>
    );
}