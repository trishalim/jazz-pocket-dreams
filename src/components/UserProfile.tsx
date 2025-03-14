"use client";

import { AddBookDialog } from "@/components/AddBookDialog";
import { BookReviewThumbnail } from "@/components/BookReviewThumbnail";
import { Button } from "@/components/Button";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/Dropdown";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Promo } from "@/components/Promo";
import { ShareBooksByMonthDialog } from "@/components/ShareBooksByMonthDialog";
import { ShareProfileDialog } from "@/components/ShareProfileDialog";
import { LogoShortIcon } from "@/components/icons/LogoShortIcon";
import {
  BookReview,
  JazzAccount,
  JazzProfile,
  ListOfBookReviews,
} from "@/schema";
import clsx from "clsx";
import { useCoState } from "jazz-react";
import { Group, ID } from "jazz-tools";
import { useMemo, useState } from "react";

export default function UserProfile({ id }: { id: ID<JazzAccount> }) {
  const user = useCoState(JazzAccount, id, {
    profile: {
      bookReviews: [{}],
    },
  });
  const profile = user?.profile;
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showShareProfileDialog, setShowShareProfileDialog] = useState(false);
  const [showShareBooksByMonthDialog, setShowShareBooksByMonthDialog] =
    useState(false);
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);
  const [booksByMonthToShare, setBooksByMonthToShare] = useState<
    { month: string; books: BookReview[] } | undefined
  >();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const canWrite = profile?._owner.castAs(Group).myRole() === "admin";

  const booksByYear = useMemo(() => {
    const byYear: Array<{ year: number; books: BookReview[] }> = [];

    user?.profile?.bookReviews?.getAll().forEach((bookReview) => {
      const year = bookReview.dateRead.getFullYear();
      if (!byYear.find((y) => y.year === year)) {
        byYear.push({ year, books: [] });
      }
      byYear.find((y) => y.year === year)?.books.push(bookReview);
    });

    return byYear;
  }, [user?.profile?.bookReviews]);

  const booksBySelectedYear = useMemo(() => {
    return booksByYear?.find(({ year }) => year === selectedYear);
  }, [booksByYear, selectedYear]);

  const booksByMonth = useMemo(() => {
    if (!booksByYear) return;
    const date = new Date();

    const byMonth: Array<{ month: string; books: BookReview[] }> = [
      { month: "January", books: [] },
      { month: "February", books: [] },
      { month: "March", books: [] },
      { month: "April", books: [] },
      { month: "May", books: [] },
      { month: "June", books: [] },
      { month: "July", books: [] },
      { month: "August", books: [] },
      { month: "September", books: [] },
      { month: "October", books: [] },
      { month: "November", books: [] },
      { month: "December", books: [] },
    ].splice(0, date.getFullYear() == selectedYear ? date.getMonth() + 1 : 12); // don't show future months

    const booksInYear = booksByYear?.find(({ year, books }) => {
      return year == selectedYear;
    });

    booksInYear?.books.forEach((bookReview) => {
      const monthIndex = new Date(bookReview.dateRead).getMonth();
      byMonth[monthIndex]?.books.push(bookReview);
    });

    return byMonth;
  }, [booksByYear, selectedYear]);

  const averageRating = useMemo(() => {
    if (!booksBySelectedYear) return;

    const booksWithRating = booksBySelectedYear.books.filter(
      (book) => book.rating,
    );

    if (!booksWithRating.length) return;

    return (
      Math.round(
        (booksWithRating.reduce((sum, book) => sum + book.rating, 0) /
          booksWithRating.length) *
          10,
      ) / 10
    );
  }, [booksBySelectedYear]);

  const booksPerMonth = useMemo(() => {
    if (!booksBySelectedYear) return;
    const date = new Date();
    const numberOfYears =
      selectedYear < date.getFullYear() ? 12 : date.getMonth() + 1;
    const booksPerMonthValue = booksBySelectedYear.books.length / numberOfYears;
    return Number.isInteger(booksPerMonthValue)
      ? booksPerMonthValue
      : Number(booksPerMonthValue.toFixed(2));
  }, [booksBySelectedYear, booksByMonth]);

  return (
    <>
      <div className="grid gap-4 mb-12">
        {isMobileMenuOpen && (
          <div
            className={clsx(
              "fixed sm:hidden flex right-5 left-5 bottom-5 rounded-full p-2 border z-50 bg-white ease-in-out duration-300 shadow-md",
              "dark:bg-slate-800",
            )}
          >
            <Button
              onClick={() => setShowAddBookDialog(true)}
              variant="primary"
              size="sm"
              className="mr-2"
            >
              Add book
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowShareProfileDialog(true)}
              size="sm"
            >
              Share profile
            </Button>

            <button
              className="ml-auto p-2"
              aria-label="Close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="close" size="sm" />
            </button>
          </div>
        )}

        {canWrite && (
          <Dropdown>
            <DropdownButton
              as="button"
              className="sm:hidden z-40 bg-white ring-1 ring-slate-950/10 shadow-lg rounded-full fixed bottom-6 right-6 p-2.5 dark:bg-slate-800"
            >
              <LogoShortIcon className="size-6 text-purple-600 dark:text-purple-400" />
            </DropdownButton>

            <DropdownMenu anchor="bottom end">
              <DropdownItem onClick={() => setShowShareProfileDialog(true)}>
                Share profile
              </DropdownItem>
              <DropdownItem onClick={() => setShowAddBookDialog(true)}>
                Add book
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        <div className="sm:flex items-center justify-between">
          <Heading>{profile?.name}&apos;s book shelf</Heading>
          {canWrite && (
            <div className="hidden sm:flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowShareProfileDialog(true)}
              >
                Share profile
              </Button>
              <Button
                onClick={() => setShowAddBookDialog(true)}
                variant="primary"
              >
                Add book
              </Button>
            </div>
          )}
        </div>

        <ShareProfileDialog
          open={showShareProfileDialog}
          onClose={() => setShowShareProfileDialog(false)}
        />

        <ShareBooksByMonthDialog
          open={showShareBooksByMonthDialog}
          onClose={() => {
            setShowShareBooksByMonthDialog(false);
          }}
          books={booksByMonthToShare?.books}
          month={booksByMonthToShare?.month}
        />

        <AddBookDialog
          onClose={() => setShowAddBookDialog(false)}
          open={showAddBookDialog}
        />

        {booksByYear?.length > 1 && (
          <div>
            {booksByYear?.map(({ year }) => (
              <button
                type="button"
                className={clsx(
                  "px-2 py-1 rounded-md text-sm mr-2 hover:text-slate-900",
                  selectedYear == year
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600",
                )}
                key={year}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {booksBySelectedYear && (
          <div className="flex flex-col md:flex-row gap-y-4 gap-x-10 mt-2">
            {[
              {
                value: booksBySelectedYear.books.length,
                label: "books read this year",
                icon: "book",
                iconColor: "text-pink-500",
              },
              {
                value: averageRating,
                label: "average rating",
                icon: "star",
                iconColor: "text-amber-400",
              },
              {
                value: booksPerMonth,
                label: "books read per month",
                icon: "month",
                iconColor: "text-green-600",
              },
            ].map(
              ({ value, label, icon, iconColor }) =>
                value && (
                  <div key={label} className="flex items-center">
                    <Icon
                      name={icon}
                      className={clsx(iconColor, "mr-3")}
                      size="md"
                    />
                    <p className="font-semibold mr-1.5 text-slate-900 dark:text-slate-200">
                      {value}
                    </p>
                    <p>{label}</p>
                  </div>
                ),
            )}
          </div>
        )}

        {booksByMonth?.map(({ month, books }) => (
          <div key={month} className="flex flex-col mt-8">
            <div className="flex justify-between items-center pb-2 mb-4 border-b">
              <h2 className="text-sm">
                <span className=" font-medium text-slate-900 dark:text-slate-200">
                  {month}
                </span>{" "}
                <span>
                  {" "}
                  ({books.length} {books.length === 1 ? "book" : "books"})
                </span>
              </h2>

              {!!books.length && canWrite && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setBooksByMonthToShare({ month, books });
                    setShowShareBooksByMonthDialog(true);
                  }}
                >
                  <Icon name="image" size="xs" />
                  Share
                </Button>
              )}
            </div>
            {books.length == 0 ? (
              <p className="text-slate-600">No books read this month.</p>
            ) : (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-4">
                {books.map((bookReview) => (
                  <BookReviewThumbnail key={bookReview.id} id={bookReview.id} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Promo />
    </>
  );
}
