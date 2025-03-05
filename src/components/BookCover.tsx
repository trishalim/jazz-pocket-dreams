"use client";

import { Button } from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import { BookReview, DraftBookReview } from "@/schema";
import clsx from "clsx";
import { createImage } from "jazz-browser-media-images";
import { useAccount } from "jazz-react";
import { ProgressiveImg } from "jazz-react";
import { ChangeEvent, useRef } from "react";

const BookCoverContainer = ({
  children,
  className = "",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) => {
  return (
    <div
      className={clsx(
        {
          "h-[240px] lg:h-[260px]": size === "md",
          "h-[180px]": size === "sm",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MockCover = ({
  bookReview,
}: { bookReview: BookReview | DraftBookReview }) => {
  return (
    <div className="flex aspect-[3/4] h-full flex-col items-center justify-center gap-3 rounded-l-sm rounded-r-md bg-slate-100 px-3 text-center shadow-lg">
      <p className="font-medium">{bookReview.title}</p>
      <p className="text-xs">{bookReview.author}</p>
    </div>
  );
};

export function BookCoverReadOnly({
  bookReview,
  className,
  size = "md",
}: {
  bookReview: BookReview | DraftBookReview;
  className?: string;
  size?: "sm" | "md";
}) {
  if (bookReview.cover) {
    return (
      <BookCoverContainer className={className} size={size}>
        <ProgressiveImg image={bookReview.cover}>
          {({ src }) => (
            <img
              className="max-h-full max-w-full rounded-l-sm rounded-r-md shadow-lg"
              src={src}
            />
          )}
        </ProgressiveImg>
      </BookCoverContainer>
    );
  }

  return (
    <BookCoverContainer className={className}>
      <MockCover bookReview={bookReview} />
    </BookCoverContainer>
  );
}

export function BookCoverInput({
  bookReview,
}: { bookReview: BookReview | DraftBookReview }) {
  const { me } = useAccount();
  const inputRef = useRef<HTMLInputElement>(null);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!me?.profile) return;

    const file = event.currentTarget.files?.[0];

    if (file) {
      createImage(file, { owner: me.profile._owner }).then((image) => {
        bookReview.cover = image;
      });
    }
  };

  const onUploadClick = () => {
    inputRef.current?.click();
  };

  const remove = () => {
    bookReview.cover = null;
  };

  if (bookReview.cover) {
    return (
      <div className="group relative inline-block">
        <BookCoverReadOnly
          className="transition-opacity group-hover:opacity-40"
          bookReview={bookReview}
        />
        <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-l-sm rounded-r-md group-hover:flex">
          <Button
            variant="tertiary"
            type="button"
            className="shadow"
            onClick={remove}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  }

  return (
    <BookCoverContainer className="flex w-[180px] flex-col justify-center rounded-l-sm rounded-r-md bg-slate-100 p-3 shadow-lg">
      <button
        className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-500 transition-colors hover:text-slate-600"
        type="button"
        onClick={onUploadClick}
      >
        <PlusIcon className="h-10 w-10" />
        Upload book cover
      </button>
      <label className="sr-only">
        Cover
        <input ref={inputRef} type="file" onChange={onImageChange} />
      </label>
    </BookCoverContainer>
  );
}

export function BookCover({
  bookReview,
  readOnly,
}: {
  bookReview: BookReview;
  readOnly?: boolean;
}) {
  if (readOnly) return <BookCoverReadOnly bookReview={bookReview} />;

  return <BookCoverInput bookReview={bookReview} />;
}
