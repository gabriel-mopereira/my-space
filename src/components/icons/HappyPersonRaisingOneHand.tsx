import { IconProps } from "./types";

const HappyPersonRaisingOneHand = ({
  size = 24,
  className,
  strokeWidth,
  ...props
}: IconProps) => (
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
      d="M3 12h5v-2h1v2h1V9H9V8H7v1H6V8H4V7H3V4H1v4h1v1h1v1h1v1H3Zm2-5h3V6H5ZM1 3h2V2H2V1H1Zm3 3h1V5h1V4h1v1h1v1h1V3H8V2H5v1H4Zm0 0"
      strokeWidth={strokeWidth}
      stroke="currentColor"
    />
  </svg>
);

export { HappyPersonRaisingOneHand };
