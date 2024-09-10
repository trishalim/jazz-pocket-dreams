import { ID } from "jazz-tools";
import { Library } from "../schema";
import { BookComponent } from "./Book.tsx";
import { useCoState } from "../main";
import {AddBookForm} from "./AddBookForm.tsx";

export function LibraryComponent({ libraryId }: { libraryId: ID<Library> }) {
  const library = useCoState(Library, libraryId);

  return library ? (
    <div className="grid gap-3">
      <h1 className="font-bold text-4xl">Welcome to {library.name} Library!</h1>

      {!library.books?.length ? <div>No books yet.</div> : <></>}
      <div className="grid grid-cols-3 gap-3">
        {library.books?.map((book) => (
          book && <BookComponent key={book.id} book={book} />
        ))}
      </div>

      <div>
        <AddBookForm libraryId={libraryId}/>
      </div>
    </div>
  ) : (
    <div>Loading library...</div>
  );
}
