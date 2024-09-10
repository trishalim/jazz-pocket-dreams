import {useAccount} from "./main";
import {BookShelfComponent} from "./components/BookShelf.tsx";
import {AddBookShelfForm} from "./components/AddBookShelfForm.tsx";

function App() {
  const { me } = useAccount({
    root: { bookShelves: [{}] },
  });

  console.log('book shelves', me?.root?.bookShelves) // bookShelves is undefined here, why?

  return (
    <div className="grid gap-12">
      <div className="grid gap-8">
        <h1 className="pb-2 border-b font-semibold">Book shelves</h1>
        {me?.root?.bookShelves?.map((bookShelf) => (
          <BookShelfComponent key={bookShelf.id} bookShelfId={bookShelf.id}/>
        ))}
      </div>
      <AddBookShelfForm/>
    </div>
  )
}

export default App;
