"use client";

import { BackToProfileButton } from "@/components/BackToProfileButton";
import { BookReviewDetails } from "@/components/BookReviewDetails";
import { BookReviewForm } from "@/components/BookReviewForm";
import { Button } from "@/components/Button";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Container } from "@/components/Container";
import { DialogDescription, DialogTitle } from "@/components/Dialog";
import { Promo } from "@/components/Promo";
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

  return (
    <Container size="sm" className="flex min-h-screen flex-col gap-12 py-12">
      <BackToProfileButton
        accountId={bookReview._owner.castAs(Group).members[0].id}
      />
      {readOnly ? (
        <>
          <BookReviewDetails bookReview={bookReview} />
          <Promo />
        </>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
}
