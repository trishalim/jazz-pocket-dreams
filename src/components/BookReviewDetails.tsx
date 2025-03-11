import { BookReview } from "@/schema";
import { BookCoverReadOnly } from "./BookCover";
import { Heading } from "./Heading";
import Rating from "./Rating";

export function BookReviewDetails({ bookReview }: { bookReview: BookReview }) {
  return (
    <div className="flex-1">
      <BookCoverReadOnly className="mb-8" bookReview={bookReview} />

      <Heading className="mb-2">{bookReview.title}</Heading>
      <p className="mb-6">by {bookReview.author}</p>

      <Rating size="lg" className="mb-6" rating={bookReview.rating} />

      {bookReview.review && (
        <p className="leading-relaxed">{bookReview.review}</p>
      )}
    </div>
  );
}
