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
import html2canvas from "html2canvas";
import { ProgressiveImg, useAccount } from "jazz-react";

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
            <p className="text-center uppercase font-medium mb-8">
              My {month} reads
            </p>

            <div className="flex flex-wrap justify-center gap-y-5">
              {books.map((book) => (
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
      </DialogBody>
    </Dialog>
  );
}
