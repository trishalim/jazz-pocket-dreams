"use client";

import { MockCover } from "@/components/BookCover";
import { Image } from "@/components/Image";
import StarIcon from "@/components/icons/StarIcon";
import { useCoState } from "jazz-react";
import { ID } from "jazz-tools";
import Link from "next/link";
import { BookReview } from "../schema";

export function BookReviewThumbnail({ id }: { id: ID<BookReview> }) {
  const bookReview = useCoState(BookReview, id, {
    cover: {},
  });

  if (!bookReview) return <></>;

  return (
    <div className="inline-flex flex-col  shrink-0 sm:rounded sm:flex sm:space-y-4">
      <Link
        href={`/book/${bookReview.id}`}
        className="relative flex-1 sm:flex sm:flex-col sm:justify-end sm:flex-1"
      >
        {bookReview.cover ? (
          <Image
            image={bookReview.cover}
            className="rounded-l-sm rounded-r-md h-[180px] shadow-md w-auto"
          />
        ) : (
          <div className="rounded-l-sm rounded-r-md h-[180px] w-[130px] shadow-md w-auto bg-slate-200 flex flex-col justify-center text-center">
            <p>{bookReview.title}</p>
            <p className="text-xs">{bookReview.author}</p>
          </div>
        )}

        <span className="sr-only max-md:hidden">
          {bookReview.title} by {bookReview.author}
        </span>

        {bookReview.rating === 5 && (
          <StarIcon className="text-2xl text-yellow-400 top-1.5 right-1.5 absolute sm:hidden" />
        )}
      </Link>

      <div className="hidden sm:block">
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
