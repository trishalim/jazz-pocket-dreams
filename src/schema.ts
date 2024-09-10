import {CoMap, co, CoList, Account, Profile, Group} from "jazz-tools";

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

export class ListOfBookShelves extends CoList.Of(co.ref(BookShelf)) {}

/** The account root is an app-specific per-user private `CoMap`
 *  where you can store top-level objects for that user */
export class AccountRoot extends CoMap {
  bookShelves = co.ref(ListOfBookShelves);
  books = co.ref(ListOfBooks);
}

export class JazzAccount extends Account {
  profile = co.ref(Profile);
  root = co.ref(AccountRoot);

  /** The account migration is run on account creation and on every log-in.
   *  You can use it to set up the account root and any other initial CoValues you need.
   */
  migrate(this: Account, creationProps?: { name: string }) {
    console.log('migrate')
    super.migrate(creationProps);
    const group = Group.create({ owner: this });
    group.addMember("everyone", "writer");

    if (!this._refs.root) {
      this.root = AccountRoot.create(
        {
          bookShelves: ListOfBookShelves.create(
            ["Want to read", "Reading", "Read"].map((name) => (
              BookShelf.create({ name, books: ListOfBooks.create([], { owner: this }) }, { owner: this })
            )), { owner: this }),
          books: ListOfBooks.create([
            Book.create({ title: "The Great Gatsby", author: "F. Scott Fitzgerald" }, { owner: this }),
            Book.create({ title: "To Kill a Mockingbird", author: "Harper Lee" }, { owner: this }),
            Book.create({ title: "Pride and Prejudice", author: "Jane Austen" }, { owner: this }),
          ], { owner: group }),
        },
        { owner: this },
      );
    }
  }
}

