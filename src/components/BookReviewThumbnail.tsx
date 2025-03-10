"use client";

import { BookCover, BookCoverReadOnly } from "@/components/BookCover";
import StarIcon from "@/components/icons/StarIcon";
import { useCoState } from "jazz-react";
import { ID } from "jazz-tools";
import Link from "next/link";
import { BookReview } from "../schema";

export function BookReviewThumbnail({ id }: { id: ID<BookReview> }) {
  const bookReview = useCoState(BookReview, id, {
    cover: {},
  });

  console.log(id, bookReview);

  if (!bookReview) return <></>;

  return (
    <div className="inline-flex shrink-0 sm:rounded sm:block sm:space-y-4 md:w-[200px]">
      <Link
        href={`/book/${bookReview.id}`}
        className="relative sm:block sm:flex-1"
      >
        <BookCoverReadOnly bookReview={bookReview} />

        <span className="sr-only max-md:hidden">
          {bookReview.title} by {bookReview.author}
        </span>

        {bookReview.rating === 5 && (
          <StarIcon className="text-2xl text-yellow-400 top-1.5 right-1.5 absolute sm:hidden" />
        )}
      </Link>

      <div className="flex-1 hidden sm:block">
        <Link href={`/book/${bookReview.id}`}>
          <h2 className="mb-1 text-sm font-medium">{bookReview.title}</h2>
        </Link>
        <div className="mb-2 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>{bookReview.author}</p>
          <div className="flex items-center gap-0.5 text-xs font-semibold leading-none">
            <StarIcon className="-mt-px text-base text-yellow-400" />
            {bookReview.rating}
          </div>
        </div>
      </div>
    </div>
  );
}
