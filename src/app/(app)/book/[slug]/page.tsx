"use client";

import { BookCoverReadOnly } from "@/components/BookCover";
import { BookReviewForm } from "@/components/BookReviewForm";
import { Button } from "@/components/Button";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Container } from "@/components/Container";
import { DialogDescription, DialogTitle } from "@/components/Dialog";
import { Heading } from "@/components/Heading";
import { Promo } from "@/components/Promo";
import Rating from "@/components/Rating";
import { useToast } from "@/contexts/ToastContext";
import { BookReview } from "@/schema";
import { useCoState } from "jazz-react";
import { Group, ID } from "jazz-tools";
import { use, useState } from "react";

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

  if (readOnly) {
    return (
      <Container className="flex min-h-screen flex-col gap-12 py-12">
        <div className="flex-1">
          <BookCoverReadOnly className="mb-8" bookReview={bookReview} />

          <Heading className="mb-2">{bookReview.title}</Heading>
          <p className="mb-6">by {bookReview.author}</p>

          <Rating size="lg" className="mb-6" rating={bookReview.rating} />

          {bookReview.review && (
            <p className="leading-relaxed">{bookReview.review}</p>
          )}
        </div>

        <Promo />
      </Container>
    );
  }

  return (
    <Container size="sm" className="grid gap-12 py-12">
      {bookReview?.deleted && (
        <div>
          <p className="mb-3">This review has been deleted.</p>
          <Button variant="secondary" onClick={restoreBookReview}>
            Restore
          </Button>
        </div>
      )}

      <BookReviewForm bookReview={bookReview} />

      {!bookReview.deleted && (
        <div className="mt-5">
          <Button
            onClick={() => setIsDeleteDialogOpen(true)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      )}

      {/*{!readOnly &&*/}
      {/*  (bookReview?.deleted ? (*/}
      {/*    <>*/}
      {/*      <Button variant="secondary" onClick={restoreBookReview}>*/}
      {/*        Restore*/}
      {/*      </Button>{" "}*/}
      {/*    </>*/}
      {/*  ) : (*/}
      {/*    <Button*/}
      {/*      onClick={() => setIsDeleteDialogOpen(true)}*/}
      {/*      variant="destructive"*/}
      {/*    >*/}
      {/*      Delete*/}
      {/*    </Button>*/}
      {/*  ))}*/}

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
