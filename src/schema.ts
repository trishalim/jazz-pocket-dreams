import {
  Account,
  CoList,
  CoMap,
  ImageDefinition,
  Profile,
  co,
} from "jazz-tools";

export class BookReview extends CoMap {
  title = co.string;
  author = co.string;
  rating = co.number;
  dateRead = co.Date;
  review = co.optional.string;
  cover? = co.ref(ImageDefinition, { optional: true });
  deleted = co.optional.boolean;
}

export class ListOfBookReviews extends CoList.Of(co.ref(BookReview)) {
  getAll(this: ListOfBookReviews) {
    return this.filter(
      (bookReview): bookReview is BookReview => !bookReview?.deleted,
    );
  }
}

/** The profile is an app-specific per-user public `CoMap`
 *  where you can store top-level objects for that user */
export class JazzProfile extends Profile {
  bookReviews = co.ref(ListOfBookReviews);
}

export class JazzAccount extends Account {
  profile = co.ref(JazzProfile);

  /** The account migration is run on account creation and on every log-in.
   *  You can use it to set up the account root and any other initial CoValues you need.
   */
  migrate() {}
}
