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

const MockCover = ({
  bookReview,
}: { bookReview: BookReview | DraftBookReview }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-l-sm rounded-r-md bg-slate-100 px-3 text-center dark:bg-slate-800">
      <p className="font-medium text-slate-900 dark:text-white line-clamp-3">
        {bookReview.title}
      </p>
      <p className="text-xs line-clamp-2">{bookReview.author}</p>
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
              alt=""
              className="max-h-full max-w-full rounded-l-sm rounded-r-md"
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
      <div>
        <BookCoverReadOnly
          className="transition-opacity group-hover:opacity-40"
          bookReview={bookReview}
        />
        <Button
          variant="secondary"
          type="button"
          className="mt-2 mx-auto"
          size="sm"
          onClick={remove}
        >
          Remove
        </Button>
      </div>
    );
  }

  return (
    <BookCoverContainer className="flex w-[180px] flex-col justify-center rounded-l-sm rounded-r-md bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 hover:border-slate-400  dark:border-slate-600 dark:hover:border-slate-500">
      <button
        className="flex h-full w-full flex-col items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-100"
        type="button"
        onClick={onUploadClick}
      >
        <PlusIcon className="size-6" />
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
