import {Book, BookShelf} from "../schema";
import {useAccount} from "../main.tsx";

export function BookComponent({book}: { book: Book }) {
  const { me } = useAccount({
    root: { bookShelves: [{}] },
  });

  const bookShelves = me?.root?.bookShelves;

  const addToShelf = (shelf: BookShelf) => {
    shelf.books?.push(book);
  };

  return (
    <div className="flex border p-3 flex-col gap-3 text-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={book.title}
               className="border rounded py-2 px-3"
               onChange={(event) => {
                  book.title = event.target.value
               }}/>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="author">Author</label>
        <input type="text" id="author" value={book.author}
               className="border rounded py-2 px-3"
               onChange={(event) => {
                 book.author = event.target.value
               }}/>
      </div>

      <div className="grid gap-1">
        {bookShelves?.map((bookShelf) => (
          <button type="button" onClick={() => addToShelf(bookShelf)} className="border p-1 text-xs" key={bookShelf?.id}>{bookShelf?.name}</button>
        ))}
      </div>
    </div>
  );
}
