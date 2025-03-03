import StarIcon from "@/components/icons/StarIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";

export default function Rating({
  rating,
  className = "",
  size = "md",
}: {
  rating?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const max = 5;
  const outline = max - (rating || 0);
  return (
    <div
      className={`inline-flex gap-0.5 text-yellow-400 ${className} ${size == "sm" ? "text-sm" : "text-base"}`}
    >
      {rating ? [...Array(rating)].map((x, i) => <StarIcon key={i} />) : <></>}
      {[...Array(outline)].map((x, i) => (
        <StarOutlineIcon key={i} />
      ))}
    </div>
  );
}
