import type { IconProps } from "./types";

const InformationSource = ({
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
      d="M4 9h3V8H6V5H4v1h1v2H4Zm-3 1h1V9H1Zm1 1h1v-1H2ZM0 9h1V4H0Zm3 3h5v-1H3Zm5-1h1v-1H8ZM1 4h1V3H1Zm8 6h1V9H9ZM2 3h1V2H2Zm3 1h1V3H5Zm5 5h1V4h-1ZM3 2h5V1H3Zm6 2h1V3H9ZM8 3h1V2H8Zm0 0"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export { InformationSource };
