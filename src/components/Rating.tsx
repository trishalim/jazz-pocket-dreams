import StarIcon from "@/components/icons/StarIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";
import clsx from "clsx";

export default function Rating({
  rating,
  className = "",
  size = "md",
}: {
  rating?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const max = 5;
  const outline = max - (rating || 0);
  return (
    <div
      className={clsx(
        className,
        "inline-flex gap-0.5 text-yellow-400",
        {
          sm: "text-sm",
          md: "text-base",
          lg: "text-3xl",
        }[size],
      )}
    >
      {rating ? [...Array(rating)].map((x, i) => <StarIcon key={i} />) : <></>}
      {[...Array(outline)].map((x, i) => (
        <StarOutlineIcon key={i} />
      ))}
    </div>
  );
}
