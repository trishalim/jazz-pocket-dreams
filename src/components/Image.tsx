import clsx from "clsx";
import { useProgressiveImg } from "jazz-react";
import { ImageDefinition } from "jazz-tools";

export function Image({
  image,
  className,
  maxWidth = 800,
}: {
  image: ImageDefinition;
  className?: string;
  maxWidth?: number;
}) {
  const { src } = useProgressiveImg({
    image,
    maxWidth,
  });

  return (
    <div className="object-left-bottom object-contain">
      <img className={clsx(className)} alt="" src={src} />
    </div>
  );
}
