import { useState } from "react";
import { Book } from "./schema";
import { BookComponent } from "./components/Book.tsx";
import { useAccount } from "./main";

function App() {
  const { me } = useAccount();
  const [book, setBook] = useState<Book>();

  const createBook = () => {
    const newBook = Book.create(
      {
        title: "Project Hail Mary",
        author: "Blake Crouch",
      },
      { owner: me },
    );
    setBook(newBook);
  };

  return (
    <div>
      {book && <BookComponent book={book} />}
      <button className="border p-3 rounded" onClick={createBook}>Create Book</button>
    </div>
  )
}

export default App;
