import {useState} from "react";
import {Group} from "jazz-tools";
import {BookShelf, ListOfBooks} from "../schema.ts";
import {useAccount} from "../main.tsx";

export function AddBookShelfForm() {

  const [bookShelfName, setBookShelfName] = useState<string>("");
  const { me } = useAccount();

  const createBookShelf = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('creating')

    const group = Group.create({ owner: me });
    group.addMember("everyone", "writer");

    const newBookShelf = BookShelf.create(
      {
        name: bookShelfName,
        books: ListOfBooks.create([], { owner: me }),
      },
      { owner: me },
    );

    console.log({newBookShelf})

    me.root?.bookShelves?.push(newBookShelf);

    console.log('my shelves', me.root?.bookShelves)
  };

  return (
    <form action="" onSubmit={createBookShelf} className="grid gap-3">
      <label className="block" htmlFor="bookShelfName">Book shelf name</label>
      <input type="text" id="bookShelfName" value={bookShelfName}
             className="block border rounded py-2 px-3"
             onChange={(event) => {
               setBookShelfName(event.target.value)
             }}
             required/>
      <button className="bg-black text-white p-2 rounded" type="submit">Create book shelf
      </button>
    </form>
  )
}
