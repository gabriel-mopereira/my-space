import type { IconProps } from "./types";

const GitHub = ({
  className,
  size = 24,
  strokeWidth = 0,
  ...props
}: IconProps) => (
  <svg
    className={className}
    height={size}
    viewBox="0 0 12 12"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 12h2v-1H3v-1H2V9H1V8h1v1h1v1h1V9h1V8H3V7H2V4h1V2h1v1h3V2h1v2h1v3H8v1H6v1h1v3h2v-1h1v-1h1V3h-1V2H9V1H2v1H1v1H0v7h1v1h1Zm0 0"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export { GitHub };
