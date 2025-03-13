import { BookReviewForm } from "@/components/BookReviewForm";
import {
  Dialog,
  DialogBody,
  DialogProps,
  DialogTitle,
} from "@/components/Dialog";
import { Errors } from "@/components/Errors";
import { useToast } from "@/contexts/ToastContext";
import { BookReview, DraftBookReview, ListOfBookReviews } from "@/schema";
import { useAccount } from "jazz-react";
import { useState } from "react";

export function AddBookDialog(props: Omit<DialogProps, "children">) {
  const { me } = useAccount({
    root: { draft: {} },
    profile: {
      bookReviews: [],
    },
  });

  const toast = useToast();

  const [errors, setErrors] = useState<string[]>([]);

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!me?.root) return;

    const validation = DraftBookReview.validate(me.root.draft);
    setErrors(validation.errors);
    if (validation.errors.length > 0) {
      return;
    }

    if (!me.profile.bookReviews) {
      me.profile.bookReviews = ListOfBookReviews.create([], me.profile._owner);
    }

    me.profile.bookReviews.push(me.root.draft as BookReview);
    me.root.draft = DraftBookReview.create(
      {
        dateRead: new Date(),
      },
      me.profile._owner,
    );
    toast.success("Added a new book to your shelf!");
    props.onClose(true);
  };

  if (!me?.root?.draft) return;

  return (
    <Dialog {...props}>
      <DialogTitle>Add a book to your shelf</DialogTitle>
      <DialogBody>
        <BookReviewForm bookReview={me.root.draft} onSave={onSave} />
        <Errors errors={errors} />
      </DialogBody>
    </Dialog>
  );
}
