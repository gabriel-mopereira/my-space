"use client";

import { Button, ButtonWrapper } from "@/components/primitives/button";

const ContactOpenButton = ({
  baseUrl,
  label,
  username,
}: {
  baseUrl: string;
  label: string;
  username: string;
}) => {
  const handleClick = () => {
    window.open(`${baseUrl}${username}`, "_blank");
  };

  return (
    <ButtonWrapper>
      <Button
        aria-label={`Open ${label}: ${username}`}
        className="font-chicago-kare text-md md:text-lg"
        onClick={handleClick}
      >
        Open
      </Button>
    </ButtonWrapper>
  );
};

export default ContactOpenButton;
