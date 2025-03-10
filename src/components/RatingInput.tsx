"use client";

import StarIcon from "@/components/icons/StarIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";
import clsx from "clsx";

interface RatingInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function RatingInput({
  value = 0,
  onChange,
  className,
  label,
}: RatingInputProps) {
  const handleChange = (newRating: number) => {
    onChange(newRating > 5 ? 5 : newRating);
  };

  return (
    <div className={clsx(className, "grid gap-1")}>
      <label className="text-slate-600 dark:text-slate-300">{label}</label>
      <div className="flex gap-0.5 text-3xl text-yellow-400">
        {[...Array(5)].map((_, i) => {
          return i < value ? (
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => handleChange(i + 1)}
              key={i}
            >
              <StarIcon />
            </button>
          ) : (
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => handleChange(i + 1)}
              key={i}
            >
              <StarOutlineIcon />
            </button>
          );
        })}
      </div>
    </div>
  );
}
