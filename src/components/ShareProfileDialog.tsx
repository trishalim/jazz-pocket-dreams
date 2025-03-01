"use client";

import { BookCoverReadOnly } from "@/components/BookCover";
import { BookReviewThumbnail } from "@/components/BookReviewThumbnail";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogBody,
  DialogProps,
  DialogTitle,
} from "@/components/Dialog";
import { Icon } from "@/components/Icon";
import Rating from "@/components/Rating";
import { BookReview } from "@/schema";
import { useAccount } from "jazz-react";
import { useEffect, useMemo, useState } from "react";

export function ShareProfileDialog(
  props: Omit<DialogProps, "children"> & {
    booksByMonth?: { month: string; books: BookReview[] }[];
    year: number;
  },
) {
  const { me } = useAccount();
  const { booksByMonth, year, ...dialogProps } = props;

  const [copyCount, setCopyCount] = useState(0);
  const copied = copyCount > 0;
  const link = `${window.location.origin}/user/${me?.id}`;

  const booksThisMonth = useMemo(() => {
    if (!booksByMonth) return;
    return booksByMonth[new Date().getMonth()];
  }, [booksByMonth]);

  useEffect(() => {
    if (copyCount > 0) {
      const timeout = setTimeout(() => setCopyCount(0), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  if (!me) return;

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Share your profile</DialogTitle>
      <DialogBody>
        <div>
          <div
            className="aspect-[9/16] bg-amber-50 w-full flex flex-col justify-center p-8"
            id="shareImage"
          >
            <p className="text-center font-serif text-2xl font-semibold mb-8">
              My March reads
            </p>

            <div className="grid grid-cols-3 gap-4">
              {booksThisMonth?.books.map((book) => (
                <div className="space-y-3" key={book.id}>
                  <BookCoverReadOnly bookReview={book} size="sm" />
                  <Rating rating={book.rating} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => {
                const element = document.getElementById("shareImage");
                if (!element) return;

                import("html-to-image").then(({ toPng }) => {
                  toPng(element).then((dataUrl: string) => {
                    // Instagram requires HTTPS URLs, so we need to check if on mobile
                    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                      // Instagram Story deep link
                      const instagramURL = `instagram-stories://share?source_image=${encodeURIComponent(dataUrl)}`;
                      window.location.href = instagramURL;
                    } else {
                      // Fallback for desktop - download image
                      const link = document.createElement("a");
                      link.download = `${booksThisMonth?.month || "monthly"}-reads-${year}.png`;
                      link.href = dataUrl;
                      link.click();
                    }
                  });
                });
              }}
            >
              Share to Instagram
            </Button>
          </div>
        </div>

        <label className="sr-only">Profile link</label>
        <input
          type="text"
          className="w-full rounded border p-1"
          value={link}
          readOnly
        />

        <Button
          variant="primary"
          onClick={() => {
            window.navigator.clipboard.writeText(link).then(() => {
              setCopyCount((count) => count + 1);
            });
          }}
        >
          {copied ? (
            <Icon name="check" size="sm" />
          ) : (
            <Icon name="copy" size="sm" />
          )}
          Copy link to clipboard
        </Button>
      </DialogBody>
    </Dialog>
  );
}
