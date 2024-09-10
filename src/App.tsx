import { useState } from "react";
import {BookShelf, ListOfBooks} from "./schema";
import {useAccount, useCoState} from "./main";
import { ID, Group } from "jazz-tools";
import {BookShelfComponent} from "./components/BookShelf.tsx";

function App() {
  const { me } = useAccount();

  const [bookShelfId, setBookShelfId] = useState<ID<BookShelf> | undefined>(
    (window.location.search?.replace("?bookShelf=", "") || undefined) as ID<BookShelf> | undefined,
  );
  const bookShelf = useCoState(BookShelf, bookShelfId)

  const [bookShelfName, setBookShelfName] = useState<string>("");

  console.log({bookShelf})

  const createBookShelf = () => {
    const group = Group.create({ owner: me });
    group.addMember("everyone", "writer");

    const newBookShelf = BookShelf.create(
      {
        name: bookShelfName,
        books: ListOfBooks.create([], { owner: group }),
      },
      { owner: group },
    );

    setBookShelfId(newBookShelf.id);
    window.history.pushState({}, "", `?bookShelf=${newBookShelf.id}`);
  };

  if (bookShelf && bookShelfId) {
    return <BookShelfComponent bookShelfId={bookShelfId} />;
  } else {

    return (
      <form action="" onSubmit={createBookShelf} className="grid gap-3">
        <label className="block" htmlFor="bookShelfName">Book shelf name</label>
        <input type="text" id="bookShelfName" value={bookShelfName}
               className="block border rounded py-2 px-3"
               onChange={(event) => {
                 setBookShelfName(event.target.value)
               }}
               required/>
        <button className="bg-black text-white p-2 rounded" type="submit" onClick={createBookShelf}>Create book shelf</button>
      </form>
    )
  }
}

export default App;
