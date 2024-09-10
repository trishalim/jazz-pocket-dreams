import {useAccount} from "../main.tsx";
import {Book} from "../schema.ts";
import {useState} from "react";
import {Group} from "jazz-tools";

export function AddBookForm() {
  const { me } = useAccount();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const createBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const group = Group.create({ owner: me });
    group.addMember("everyone", "writer");

    console.log('creating')
    const book = Book.create(
      {title, author},
      { owner: group },
    );

    me.root?.books?.push(book);

  };
  return (
    <form onSubmit={createBook} className="grid gap-3">
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
