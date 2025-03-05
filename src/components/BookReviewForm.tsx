import { BookCoverInput } from "@/components/BookCover";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { BookReview, DraftBookReview } from "@/schema";

export function BookReviewForm({
  bookReview,
  onSave,
}: {
  bookReview: BookReview | DraftBookReview;
  onSave?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSave} className="grid gap-5">
      <BookCoverInput bookReview={bookReview} />

      <Input
        label="Title"
        value={bookReview.title || ""}
        onChange={(e) => (bookReview.title = e.target.value)}
      />

      <Input
        label="Author"
        value={bookReview.author || ""}
        onChange={(e) => (bookReview.author = e.target.value)}
      />

      <Input
        type="date"
        label="Date read"
        value={(bookReview.dateRead || new Date()).toISOString().split("T")[0]}
        onChange={(e) => {
          const date = new Date(e.target.value);
          bookReview.dateRead = date;
        }}
      />

      <Input
        placeholder="Write your review here..."
        label="Review"
        as="textarea"
        value={bookReview.review}
        onChange={(e) => (bookReview.review = e.target.value)}
      />

      {onSave && (
        <Button type="submit" variant="primary">
          Save
        </Button>
      )}
    </form>
  );
}
