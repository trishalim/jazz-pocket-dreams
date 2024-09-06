import { Book } from "../schema";

export function BookComponent({ book }: { book: Book }) {
  return (
    <div className="grid grid-cols-6 text-sm border-r border-b [&>*]:p-2 [&>*]:border-l [&>*]:border-t">
      <h2>{book.title}</h2>
      <p className="col-span-3">{book.author}</p>
      <p>Adventurous: {book.scoreAdventurous}</p>
      <p>Mysterious: {book.scoreMysterious}</p>
      <p>Emotional: {book.scoreEmotional}</p>
      <p>Inspiring: {book.scoreInspiring}</p>
      <p>Funny: {book.scoreFunny}</p>
      <p>LightHearted: {book.scoreLightHearted}</p>
    </div>
  );
}
