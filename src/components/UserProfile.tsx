"use client";

import { BookReviewThumbnail } from "@/components/BookReviewThumbnail";
import { Button } from "@/components/Button";
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
  const user = useCoState(JazzAccount, id);
  const profile = useCoState(JazzProfile, user?.profile?.id);
  const [selectedYear, setSelectedYear] = useState(2025);

  const bookReviews = useCoState(
    ListOfBookReviews,
    user?.profile?._refs.bookReviews?.id,
    [{}],
  );

  const booksByYear = useMemo(() => {
    const byYear: Array<{ year: number; books: BookReview[] }> = [];

    bookReviews?.getAll().forEach((bookReview) => {
      const year = bookReview.dateRead.getFullYear();
      if (!byYear.find((y) => y.year === year)) {
        byYear.push({ year, books: [] });
      }
      byYear.find((y) => y.year === year)?.books.push(bookReview);
    });

    return byYear;
  }, [bookReviews]);

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
      byMonth[monthIndex].books.push(bookReview);
    });

    return byMonth;
  }, [booksByYear, selectedYear]);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-lg font-medium sm:text-2xl">
          {profile?.name}&apos;s book shelf
        </h1>
        {profile?._owner.castAs(Group).myRole() === "admin" && (
          <Button href="/add" variant="primary">
            Add book
          </Button>
        )}
      </div>

      <div>
        {booksByYear?.map(({ year }) => (
          <button
            type="button"
            className={clsx(
              "px-2 py-1 rounded-md text-sm mr-2 hover:text-stone-900",
              selectedYear == year
                ? "bg-stone-100 text-stone-900"
                : "text-stone-600",
            )}
            key={year}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {booksByMonth?.map(({ month, books }) => (
        <div key={month} className="flex flex-col mt-8">
          <h2 className="text-sm pb-2 mb-4 border-b">
            <span className=" font-medium">{month}</span>{" "}
            <span className="text-stone-600"> ({books.length} books)</span>
          </h2>
          {books.length == 0 ? (
            <p className="text-stone-600">No books read this month.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-4">
              {books.map((bookReview) => (
                <BookReviewThumbnail key={bookReview.id} id={bookReview.id} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
