import {
  Account,
  CoList,
  CoMap,
  Group,
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
  cover = co.ref(ImageDefinition, { optional: true });
  deleted = co.optional.boolean;
}

export class DraftBookReview extends CoMap {
  title = co.optional.string;
  author = co.optional.string;
  rating = co.optional.number;
  dateRead = co.optional.Date;
  review = co.optional.string;
  cover? = co.ref(ImageDefinition, { optional: true });
  deleted = co.optional.boolean;

  static validate({ title, author, dateRead }: DraftBookReview) {
    const errors: string[] = [];

    if (!title?.length) {
      errors.push("Please enter a title.");
    }
    if (!author?.length) {
      errors.push("Please enter an author.");
    }
    if (!dateRead) {
      errors.push("Please select date read.");
    }

    return { errors };
  }
}

export class ListOfBookReviews extends CoList.Of(co.ref(BookReview)) {
  getAll(this: ListOfBookReviews) {
    return this.filter(
      (bookReview): bookReview is BookReview => !bookReview?.deleted,
    ).sort((a, b) => {
      const dateA = new Date(a.dateRead);
      const dateB = new Date(b.dateRead);
      return dateA.getTime() - dateB.getTime();
    });
  }
}

/** The profile is an app-specific per-user public `CoMap`
 *  where you can store top-level objects for that user */
export class JazzProfile extends Profile {
  bookReviews = co.ref(ListOfBookReviews);
}

export class JazzAccountRoot extends CoMap {
  draft = co.ref(DraftBookReview);
}

export class JazzAccount extends Account {
  profile = co.ref(JazzProfile);
  root = co.ref(JazzAccountRoot);

  /** The account migration is run on account creation and on every log-in.
   *  You can use it to set up the account root and any other initial CoValues you need.
   */
  migrate(this: JazzAccount) {
    if (!this._refs.root) {
      const group = Group.create({ owner: this });
      this.root = JazzAccountRoot.create({
        draft: DraftBookReview.create(
          {
            dateRead: new Date(),
          },
          group,
        ),
      });
    }

    if (this.profile && !this.profile._refs.bookReviews) {
      this.profile.bookReviews = ListOfBookReviews.create([], {
        owner: this.profile._owner,
      });
    }
  }
}
