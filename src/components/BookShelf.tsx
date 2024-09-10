import { ID } from "jazz-tools";
import { BookShelf } from "../schema";
import { BookComponent } from "./Book.tsx";
import { useCoState } from "../main";
import {AddBookForm} from "./AddBookForm.tsx";

export function BookShelfComponent({ bookShelfId }: { bookShelfId: ID<BookShelf> }) {
  const bookShelf = useCoState(BookShelf, bookShelfId);

  return bookShelf ? (
    <div className="grid gap-3">
      <h1 className="font-medium text-xl">{bookShelf.name}</h1>

      {!bookShelf.books?.length ? <div>No books yet.</div> : <></>}
      <div className="grid grid-cols-3 gap-3">
        {bookShelf.books?.map((book) => (
          book && <BookComponent key={book.id} book={book} />
        ))}
      </div>

      <AddBookForm bookShelfId={bookShelfId}/>
    </div>
  ) : (
    <div>Loading book shelf...</div>
  );
}
