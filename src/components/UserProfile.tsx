"use client";

import { BookReviewThumbnail } from "@/components/BookReviewThumbnail";
import { Button } from "@/components/Button";
import {
  BookReview,
  JazzAccount,
  JazzProfile,
  ListOfBookReviews,
} from "@/schema";
import { useCoState } from "jazz-react";
import { Group, ID } from "jazz-tools";
import { useMemo } from "react";

export default function UserProfile({ id }: { id: ID<JazzAccount> }) {
  const user = useCoState(JazzAccount, id);
  const profile = useCoState(JazzProfile, user?.profile?.id);

  const bookReviews = useCoState(
    ListOfBookReviews,
    user?.profile?._refs.bookReviews?.id,
    [{}],
  );

  const booksByMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();

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
    ].splice(0, currentMonth + 1); // don't show future months

    bookReviews?.getAll().forEach((bookReview) => {
      const monthIndex = new Date(bookReview.dateRead).getMonth();
      byMonth[monthIndex].books.push(bookReview);
    });

    return byMonth;
  }, [bookReviews]);

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

      {booksByMonth.map(({ month, books }) => (
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
