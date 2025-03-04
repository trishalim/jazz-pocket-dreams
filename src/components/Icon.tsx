import { clsx } from "clsx";
import {
  CheckIcon,
  CopyIcon,
  ImageIcon,
  type LucideIcon,
  ShareIcon,
} from "lucide-react";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

const icons = {
  check: CheckIcon,
  copy: CopyIcon,
  share: ShareIcon,
  image: ImageIcon,
  close: CloseIcon,
};

// copied from tailwind line height https://tailwindcss.com/docs/font-size
const sizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 28,
  "2xl": 32,
  "3xl": 36,
  "4xl": 40,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
};

const strokeWidths = {
  xs: 2.5,
  sm: 2.5,
  md: 1.5,
  lg: 1.5,
  xl: 1.5,
  "2xl": 1.25,
  "3xl": 1.25,
  "4xl": 1.25,
  "5xl": 1,
  "6xl": 1,
  "7xl": 1,
  "8xl": 1,
  "9xl": 1,
};

export function Icon({
  name,
  icon,
  size = "md",
  className,
  rounded,
  ...svgProps
}: {
  name?: string;
  icon?: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
  rounded?: boolean;
} & React.SVGProps<SVGSVGElement>) {
  if (!icon && (!name || !icons.hasOwnProperty(name))) {
    throw new Error(`Icon not found`);
  }

  // @ts-ignore
  const IconComponent = icons?.hasOwnProperty(name) ? icons[name] : icon;

  return (
    <IconComponent
      aria-hidden="true"
      size={sizes[size]}
      strokeWidth={strokeWidths[size]}
      className={clsx(className, {
        "p-1 rounded-full": rounded,
      })}
      {...svgProps}
    />
  );
}
