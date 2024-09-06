import { useState } from "react";
import { Book } from "./schema";
import { BookComponent } from "./components/Book.tsx";
import {useAccount, useCoState} from "./main";
import { ID, Group } from "jazz-tools";

function App() {
  const { me } = useAccount();

  const [bookId, setBookId] = useState<ID<Book> | undefined>(
    (window.location.search?.replace("?book=", "") || undefined) as ID<Book> | undefined,
  );
  const book = useCoState(Book, bookId)

  console.log({book})

  const createBook = () => {
    const group = Group.create({ owner: me });
    group.addMember("everyone", "writer");

    const newBook = Book.create(
      {
        title: "Project Hail Mary",
        author: "Blake Crouch",
      },
      { owner: group },
    );

    setBookId(newBook.id);
    window.history.pushState({}, "", `?book=${newBook.id}`);
  };

  if (book) {
    return <BookComponent book={book} />;
  } else {
    return <button onClick={createBook}>Create Book</button>;
  }
}

export default App;
