import { ID } from "jazz-tools";
import { BookShelf, Book } from "../schema";
import { BookComponent } from "./Book.tsx";
import { useCoState } from "../main";

export function BookShelfComponent({ bookShelfId }: { bookShelfId: ID<BookShelf> }) {
  const bookShelf = useCoState(BookShelf, bookShelfId);

  const createAndAddBook = () => {
    bookShelf?.books?.push(Book.create({
      title: "",
      author: "",
    }, { owner: bookShelf._owner }));
  };

  return bookShelf ? (
    <div className="grid gap-3 p-3 border">
      <h1 className="font-medium text-xl">{bookShelf.name}</h1>

      <div className="grid gap-3">
        {!bookShelf.books?.length ? <div>No books yet.</div> : <></>}
        {bookShelf.books?.map((book) => (
          book && <BookComponent key={book.id} book={book} />
        ))}
      </div>
    </div>
  ) : (
    <div>Loading book shelf...</div>
  );
}
