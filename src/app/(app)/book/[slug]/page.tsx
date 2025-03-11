"use client";

import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/Button";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Container } from "@/components/Container";
import { DialogDescription, DialogTitle } from "@/components/Dialog";
import Rating from "@/components/Rating";
import RatingInput from "@/components/RatingInput";
import { useToast } from "@/contexts/ToastContext";
import { BookReview } from "@/schema";
import clsx from "clsx";
import { useCoState } from "jazz-react";
import { Group, ID } from "jazz-tools";
import { use, useState } from "react";

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
      onChange={(e) => (bookReview.title = e.target.value)}
      className={clsx(
        className,
        "w-full rounded bg-transparent border border-transparent px-2 py-1 hover:border-slate-300 hover:shadow-sm",
        "dark:hover:border-slate-800 text-slate-900 dark:text-slate-200",
      )}
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
  const className = "text-slate-700";

  if (readOnly) {
    return <p className={className}>by {bookReview.author}</p>;
  }

  return (
    <input
      value={bookReview.author}
      placeholder="Author"
      className={clsx(
        className,
        "w-full rounded bg-transparent border border-transparent px-2 py-1 hover:border-slate-300 hover:shadow-sm",
        "dark:hover:border-slate-800 text-slate-900 dark:text-slate-200",
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
  const className = "text-slate-700 max-w-[10rem]";

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
        "w-full rounded bg-transparent border border-transparent px-2 py-1 hover:border-slate-300 hover:shadow-sm",
        "dark:hover:border-slate-800 text-slate-900 dark:text-slate-200",
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
  const className = "text-sm leading-relaxed text-slate-600";

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
        "w-full bg-transparent rounded border border-transparent px-2 py-1 hover:border-slate-200 hover:shadow-sm",
        "dark:hover:border-slate-800 text-slate-900 dark:text-slate-200",
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
      label="Rating"
      className={clsx(className, "p-2 label:sr-only")}
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toast = useToast();

  if (!bookReview) return <></>;

  const readOnly = !(bookReview._owner.castAs(Group).myRole() === "admin");

  const deleteBookReview = () => {
    bookReview.deleted = true;
    setIsDeleteDialogOpen(false);
    toast.success("Book review deleted.");
  };

  const restoreBookReview = () => {
    bookReview.deleted = false;
    toast.success("Book review restored.");
  };

  return (
    <Container className="grid gap-12 py-12">
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
            {bookReview?.deleted && <p>This review has been deleted.</p>}

            {!readOnly &&
              (bookReview?.deleted ? (
                <>
                  <Button variant="secondary" onClick={restoreBookReview}>
                    Restore
                  </Button>{" "}
                </>
              ) : (
                <Button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  variant="secondary"
                >
                  Delete
                </Button>
              ))}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        onClose={() => setIsDeleteDialogOpen(false)}
        confirmLabel="Delete review"
        onConfirm={deleteBookReview}
        open={isDeleteDialogOpen}
      >
        <DialogTitle>Delete review</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this review?
        </DialogDescription>
      </ConfirmationDialog>
    </Container>
  );
}
