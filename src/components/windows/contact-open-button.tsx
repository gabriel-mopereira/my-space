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
    <div className="has-focus-visible:outline-2 has-focus-visible:outline-dashed has-focus-visible:outline-muted has-focus-visible:outline-offset-1">
      <ButtonWrapper>
        <Button
          aria-label={`Open ${label}: ${username}`}
          className="font-chicago-kare text-md md:text-lg"
          onClick={handleClick}
        >
          Open
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default ContactOpenButton;
