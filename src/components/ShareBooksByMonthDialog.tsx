"use client";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogBody,
  DialogProps,
  DialogTitle,
} from "@/components/Dialog";
import Rating from "@/components/Rating";
import { BookReview } from "@/schema";
import clsx from "clsx";
import html2canvas from "html2canvas";
import { ProgressiveImg, useAccount } from "jazz-react";
import { useState } from "react";

export default function ShareButton() {
  const isShareSupported =
    typeof navigator.share === "function" &&
    /CriOS/.test(navigator.userAgent) === false;
  const handleShare = async () => {
    const element = document.getElementById("shareImage");
    if (!element) return;

    try {
      html2canvas(element).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");

        if (isShareSupported) {
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
      await handleDownload();
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
      {isShareSupported && (
        <Button
          size="sm"
          className="lg:hidden"
          variant="secondary"
          onClick={handleShare}
        >
          Share
        </Button>
      )}
      <Button size="sm" variant="secondary" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
}

export function ShareBooksByMonthDialog(
  props: Omit<DialogProps, "children"> & {
    books?: BookReview[];
    month?: string;
  },
) {
  const { me } = useAccount();
  const { books = [], month, open, ...dialogProps } = props;

  if (!me) return;

  return (
    <Dialog open={open} {...dialogProps}>
      <DialogTitle>Share your monthly reads</DialogTitle>
      <DialogBody>
        <div className="border relative">
          <div className="absolute right-4 top-4">
            <ShareButton />
          </div>
          <div
            className="aspect-[9/16] bg-white w-full flex flex-col justify-center p-3 dark:bg-slate-900"
            id="shareImage"
          >
            <p className="text-center uppercase font-medium mb-8 text-slate-900 dark:text-slate-200">
              My {month} reads
            </p>

            <div className="flex flex-wrap justify-center gap-y-5">
              {books.map((book) => (
                <div
                  className={clsx("space-y-2 flex flex-col", {
                    "w-1/2 px-3": [1, 2, 4].includes(books.length),
                    "w-1/3 px-1.5": [3, 5, 6].includes(books.length),
                    "w-1/4 px-1": books.length > 6,
                  })}
                  key={book.id}
                >
                  {book.cover ? (
                    <ProgressiveImg image={book.cover} maxWidth={600}>
                      {({ src }) => (
                        <div className="relative">
                          <img
                            alt=""
                            className="max-h-full max-w-full rounded-l-sm rounded-r-md"
                            src={src}
                          />
                        </div>
                      )}
                    </ProgressiveImg>
                  ) : (
                    <div className="flex-1 flex items-center flex-col justify-center text-center max-w-full rounded-l-sm rounded-r-md bg-slate-100 dark:bg-slate-800">
                      <p className="font-medium text-sm line-clamp-2 text-slate-900 dark:text-white">
                        {book.title}
                      </p>
                      <p className="text-xs line-clamp-1 mt-2">{book.author}</p>
                    </div>
                  )}
                  <Rating size="sm" rating={book.rating} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
