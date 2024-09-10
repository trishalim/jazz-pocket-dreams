import {Book} from "../schema";

export function BookComponent({book}: { book: Book }) {
  return (
    <div className="flex border p-3 flex-col gap-3">
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
    </div>
  );
}
