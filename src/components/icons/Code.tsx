import type { IconProps } from "./types";

const Code = ({
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
      d="M6 5H5v3h1Zm0 0h1V2H6ZM0 7h1V6H0Zm1 1h1V7H1Zm1 1h1V8H2Zm2 2h1V8H4ZM1 6h1V5H1Zm1-1h1V4H2Zm6 4h1V8H8Zm1-1h1V7H9Zm0-2h1V5H9Zm1 1h1V6h-1ZM8 5h1V4H8Zm0 0"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export { Code };
