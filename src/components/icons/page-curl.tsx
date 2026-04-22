import type { IconProps } from "./types";

const PageCurl = ({
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
      d="M0 12h8v-1H7V8h3v1h1V1H0Zm1-1V2h9v5H6v4Zm1-3h3V7H2Zm6 3h1v-1H8Zm1-1h1V9H9ZM2 6h7V5H2Zm0-2h7V3H2Zm0 0"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export { PageCurl };
