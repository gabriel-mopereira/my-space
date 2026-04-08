import { IconProps } from "./types";

const GitHub = ({ size = 24, className, strokeWidth, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 12"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M2 12h2v-1H3v-1H2V9H1V8h1v1h1v1h1V9h1V8H3V7H2V4h1V2h1v1h3V2h1v2h1v3H8v1H6v1h1v3h2v-1h1v-1h1V3h-1V2H9V1H2v1H1v1H0v7h1v1h1Zm0 0"
      strokeWidth={strokeWidth}
      stroke="currentColor"
    />
  </svg>
);

export { GitHub };
