import {useAccount, useCoState} from "./main";
import {BookShelfComponent} from "./components/BookShelf.tsx";
import {AddBookShelfForm} from "./components/AddBookShelfForm.tsx";
import { ListOfBookShelves } from "./schema.ts";

function App() {
  const { me } = useAccount();
  const bookShelves = useCoState(ListOfBookShelves, me.root?._refs.bookShelves?.id, [{books: []}])

  return (
    <div>
      {bookShelves?.map((bookShelf) => (
        <BookShelfComponent key={bookShelf.id} bookShelfId={bookShelf.id}/>
      ))}
      <AddBookShelfForm/>
    </div>
  )
}

export default App;
