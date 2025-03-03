"use client";

import { BookCoverReadOnly } from "@/components/BookCover";
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
import html2canvas from "html2canvas";
import { ProgressiveImg, useAccount } from "jazz-react";
import { useEffect, useMemo, useState } from "react";

export default function ShareButton() {
  // Check if device is mobile based on user agent
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobile = mobileRegex.test(userAgent.toLowerCase());

  const handleShare = async () => {
    const element = document.getElementById("shareImage");
    if (!element) return;

    try {
      html2canvas(element).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");

        if (navigator.share) {
          // Convert dataUrl to a file
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], "pocket-dreams.png", {
                type: "image/png",
              });
              const shareData = {
                files: [file],
              };

              navigator.share(shareData);
            });
        } else {
          // Download image if share API not available
          const link = document.createElement("a");
          link.download = "pocket-dreams.png";
          link.href = dataUrl;
          link.click();
        }
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("shareImage");
    if (!element) return;
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "pocket-dreams.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="flex gap-2">
      {isMobile && (
        <Button size="sm" variant="secondary" onClick={handleShare}>
          Share
        </Button>
      )}
      <Button size="sm" variant="secondary" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
}

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
        <div className="border relative">
          <div className="absolute right-4 top-4">
            <ShareButton />
          </div>
          <div
            className="aspect-[9/16] bg-white w-full flex flex-col justify-center p-3 "
            id="shareImage"
          >
            <p className="text-center uppercase font-medium mb-8">
              My March reads
            </p>

            <div className="flex flex-wrap justify-center gap-y-5">
              {booksThisMonth?.books.map((book) => (
                <div className="space-y-3 w-1/3 px-3" key={book.id}>
                  <ProgressiveImg image={book.cover} maxWidth={600}>
                    {({ src }) => (
                      <img
                        className="max-h-full max-w-full rounded-l-sm rounded-r-md shadow-lg"
                        src={src}
                      />
                    )}
                  </ProgressiveImg>
                  <Rating size="sm" rating={book.rating} />
                </div>
              ))}
            </div>
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
