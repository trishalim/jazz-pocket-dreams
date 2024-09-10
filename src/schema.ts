import { CoMap, co, CoList } from "jazz-tools";

export class Book extends CoMap {
  title = co.string;
  author = co.string;
  // scoreAdventurous? = co.number;
  // scoreMysterious? = co.number;
  // scoreEmotional? = co.number;
  // scoreInspiring? = co.number;
  // scoreFunny? = co.number;
  // scoreLightHearted? = co.number;
}

export class ListOfBooks extends CoList.Of(co.ref(Book)) {}

export class BookShelf extends CoMap {
  name = co.string;
  books = co.ref(ListOfBooks);
}
