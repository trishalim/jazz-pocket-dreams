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
    <div className="grid gap-3">
      <div>
        <p>Book shelf</p>
        <h1 className="font-medium text-xl">{bookShelf.name}</h1>
      </div>

      <div className="grid gap-3">
        <div>Books</div>
        {bookShelf.books?.map((book) => (
          book && <BookComponent key={book.id} book={book} />
        ))}
      </div>
      <button className="bg-black text-white p-3" onClick={createAndAddBook}>Add book to shelf</button>
    </div>
  ) : (
    <div>Loading bookShelf...</div>
  );
}
