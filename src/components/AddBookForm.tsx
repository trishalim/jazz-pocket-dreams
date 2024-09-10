import {useCoState} from "../main.tsx";
import {Book, BookShelf} from "../schema.ts";
import {useState} from "react";
import {ID} from "jazz-tools";

export function AddBookForm({ bookShelfId }: { bookShelfId: ID<BookShelf> }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const bookShelf = useCoState(BookShelf, bookShelfId);

  const addBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    bookShelf?.books?.push(Book.create({
      title, author
    }, { owner: bookShelf._owner }));
  };

  return (
    <form onSubmit={addBook} className="grid gap-3">
      <h2>Add a book</h2>
      <label htmlFor="title">Title</label>
      <input type="text" id="title"
             value={title}
             onChange={(event) => {
               setTitle(event.target.value)
             }}
             className="block border rounded py-2 px-3"
             required/>
      <label htmlFor="author">Author</label>
      <input type="text" id="author"
             value={author}
             onChange={(event) => {
               setAuthor(event.target.value)
             }}
             className="block border rounded py-2 px-3"
             required/>
      <button className="bg-black text-white p-2 rounded" type="submit">
        Add book
      </button>
    </form>
  )
}
