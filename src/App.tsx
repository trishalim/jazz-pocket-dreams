import {useAccount} from "./main";
import {BookShelfComponent} from "./components/BookShelf.tsx";
import {AddBookShelfForm} from "./components/AddBookShelfForm.tsx";

function App() {
  const { me } = useAccount({
    root: { bookShelves: [{}] },
  });

  console.log('book shelves', me?.root?.bookShelves) // bookShelves is undefined here, why?

  return (
    <div>
      {me?.root?.bookShelves?.map((bookShelf) => (
        <BookShelfComponent key={bookShelf.id} bookShelfId={bookShelf.id}/>
      ))}
      <AddBookShelfForm/>
    </div>
  )
}

export default App;
