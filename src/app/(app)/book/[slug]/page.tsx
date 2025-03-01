"use client";

import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import Rating from "@/components/Rating";
import RatingInput from "@/components/RatingInput";
import { BookReview } from "@/schema";
import clsx from "clsx";
import { useCoState } from "jazz-react";
import { Group, ID } from "jazz-tools";
import { use } from "react";

const BookReviewTitle = ({
  bookReview,
  readOnly,
}: {
  bookReview: BookReview;
  readOnly: boolean;
}) => {
  const className = "font-serif text-2xl font-bold lg:text-4xl";

  if (readOnly) {
    return <h1 className={className}>{bookReview.title}</h1>;
  }

  return (
    <input
      value={bookReview.title}
      placeholder="Book title"
      className={clsx(
        className,
        "w-full rounded border border-transparent px-2 py-1 hover:border-gray-300 hover:shadow-sm",
      )}
      onChange={(e) => (bookReview.title = e.target.value)}
    ></input>
  );
};

const BookReviewAuthor = ({
  bookReview,
  readOnly,
}: {
  bookReview: BookReview;
  readOnly: boolean;
}) => {
  const className = "text-gray-700";

  if (readOnly) {
    return <p className={className}>by {bookReview.author}</p>;
  }

  return (
    <input
      value={bookReview.author}
      placeholder="Author"
      className={clsx(
        className,
        "w-full rounded border border-transparent px-2 py-1 hover:border-gray-300 hover:shadow-sm",
      )}
      onChange={(e) => (bookReview.author = e.target.value)}
    ></input>
  );
};

const BookReviewDateRead = ({
  bookReview,
  readOnly,
}: {
  bookReview: BookReview;
  readOnly: boolean;
}) => {
  const className = "text-gray-700 max-w-[10rem]";

  if (readOnly) {
    return (
      bookReview.dateRead && (
        <p className={className}>{bookReview.dateRead.toLocaleDateString()}</p>
      )
    );
  }

  return (
    <input
      type="date"
      value={bookReview.dateRead?.toISOString().split("T")[0]}
      placeholder="Date read"
      className={clsx(
        className,
        "w-full rounded border border-transparent px-2 py-1 hover:border-gray-300 hover:shadow-sm",
      )}
      onChange={(e) => {
        const date = new Date(e.target.value);
        bookReview.dateRead = date;
      }}
    ></input>
  );
};

const BookReviewReview = ({
  bookReview,
  readOnly,
}: {
  bookReview: BookReview;
  readOnly: boolean;
}) => {
  const className = "text-sm leading-relaxed text-gray-600";

  if (readOnly) {
    if (bookReview.review) {
      return <p className={className}>{bookReview.review}</p>;
    }
  }

  return (
    <textarea
      value={bookReview.review}
      placeholder="Write your review here..."
      className={clsx(
        className,
        "w-full rounded border border-transparent px-2 py-1 hover:border-gray-300 hover:shadow-sm",
      )}
      onChange={(e) => (bookReview.review = e.target.value)}
    ></textarea>
  );
};

const BookReviewRating = ({
  bookReview,
  readOnly,
}: {
  bookReview: BookReview;
  readOnly: boolean;
}) => {
  const className = "text-2xl sm:mx-0";

  if (readOnly) {
    return <Rating className={className} rating={bookReview.rating} />;
  }

  return (
    <RatingInput
      className={clsx(className, "p-2")}
      onChange={(rating) => (bookReview.rating = rating)}
      value={bookReview.rating}
    />
  );
};

export default function Page({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const bookReview = useCoState(BookReview, slug as ID<BookReview>);

  if (!bookReview) return <></>;

  const readOnly = !(bookReview._owner.castAs(Group).myRole() === "admin");

  const deleteBook = () => {
    bookReview.deleted = true;
  };

  return (
    <Container className="grid gap-12 py-8">
      <div className="flex flex-col gap-6 sm:flex-row md:gap-10">
        <div className="w-[180px]">
          <BookCover bookReview={bookReview} readOnly={readOnly} />
        </div>

        <div className="-mx-2 grid max-w-lg flex-1 gap-3 sm:mx-0">
          <BookReviewTitle bookReview={bookReview} readOnly={readOnly} />
          <BookReviewAuthor bookReview={bookReview} readOnly={readOnly} />
          <BookReviewDateRead bookReview={bookReview} readOnly={readOnly} />
          <BookReviewRating bookReview={bookReview} readOnly={readOnly} />
          <BookReviewReview bookReview={bookReview} readOnly={readOnly} />
          <div className="mt-5 space-y-2">
            {bookReview?.deleted ? (
              <>
                <p>This review has been deleted.</p>{" "}
                <Button
                  variant="secondary"
                  onClick={() => (bookReview.deleted = false)}
                >
                  Restore
                </Button>{" "}
              </>
            ) : (
              <Button
                onClick={() => (bookReview.deleted = true)}
                variant="secondary"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
