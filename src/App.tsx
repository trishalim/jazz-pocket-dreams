import {useAccount} from "./main";
import {BookShelfComponent} from "./components/BookShelf.tsx";
import {AddBookShelfForm} from "./components/AddBookShelfForm.tsx";
import {BookComponent} from "./components/Book.tsx";
import {AddBookForm} from "./components/AddBookForm.tsx";

function App() {
  const { me } = useAccount({
    root: { bookShelves: [{}], books: [{}] },
  });

  console.log({ me})
  console.log('book shelves', me?.root?.bookShelves) // bookShelves is undefined here, why?

  return (
    <div className="grid gap-12">
      <div className="grid gap-8">
        <h1 className="pb-2 border-b font-semibold">Books</h1>
        {me?.root?.books?.map((book) => (
          <BookComponent key={book.id} book={book} />
        ))}
        <AddBookForm/>
      </div>
      <div className="grid gap-8">
        <h1 className="pb-2 border-b font-semibold">Book shelves by {me?.profile?.name}</h1>
        {me?.root?.bookShelves?.map((bookShelf) => (
          <BookShelfComponent key={bookShelf.id} bookShelfId={bookShelf.id}/>
        ))}
        <AddBookShelfForm/>
      </div>
    </div>
  )
}

export default App;
