import getBooks from "@/application/usecases/books/getBooks";
import BookShelfPresenter from "../presenters/BookShelfPresenter";

export default async function BookShelfContainer() {
    const books = await getBooks();

    return <BookShelfPresenter books={books.data} />;
}