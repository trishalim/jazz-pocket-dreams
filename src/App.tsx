import {useAccount, useCoState} from "./main";
import {BookShelfComponent} from "./components/BookShelf.tsx";
import {AddBookShelfForm} from "./components/AddBookShelfForm.tsx";
import {useState} from "react";
import {Group, ID} from "jazz-tools";
import {Library, ListOfBooks, ListOfBookShelves} from "./schema.ts";
import {LibraryComponent} from "./components/Library.tsx";

function App() {
  const { me } = useAccount();
  const bookShelves = useCoState(ListOfBookShelves, me.root?._refs.bookShelves?.id, [{books: []}])

  const [libraryId, setLibraryId] = useState<ID<Library> | undefined>(
    (window.location.search?.replace("?library=", "") || undefined) as ID<Library> | undefined,
  );

  const [libraryName, setLibrary] = useState<string>("");

  const library = useCoState(Library, libraryId);
  const createLibrary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const group = Group.create({ owner: me });
    group.addMember("everyone", "writer");

    const newLibrary = Library.create(
      {
        name: libraryName,
        books: ListOfBooks.create([], {owner: group}),
      },
      {owner: group},
    );

    setLibraryId(newLibrary.id);
    window.history.pushState({}, "", `?library=${newLibrary.id}`);
  };

  return (
    <div className="grid gap-12">
      {library && libraryId ?
        <LibraryComponent libraryId={libraryId}></LibraryComponent> :
        <form action="" onSubmit={createLibrary} className="grid gap-3">
          <h2>Create a new library</h2>
          <label className="sr-only" htmlFor="libraryName">Library name</label>
          <input type="text" id="libraryName" value={libraryName}
                 placeholder="Library name"
                 className="block border rounded py-2 px-3"
                 onChange={(event) => {
                   setLibrary(event.target.value)
                 }}
                 required/>
          <button className="bg-black text-white p-2 rounded" type="submit">
            Create library
          </button>
        </form>
      }
      <div className="grid gap-8">
        <h1 className="pb-2 border-b font-semibold">Book shelves by {me?.profile?.name}</h1>
        {bookShelves?.map((bookShelf) => (
          <BookShelfComponent key={bookShelf.id} bookShelfId={bookShelf.id}/>
        ))}
        <AddBookShelfForm/>
      </div>
    </div>
  )
}

export default App;
