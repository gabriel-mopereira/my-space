"use client";

import { Button, ButtonWrapper } from "@/components/primitives/button";

const ContactOpenButton = ({
  baseUrl,
  username,
}: {
  baseUrl: string;
  username: string;
}) => {
  "use client";

  const handleClick = () => {
    window.open(`${baseUrl}${username}`, "_blank");
  };

  return (
    <ButtonWrapper>
      <Button
        className="font-chicago-kare text-md md:text-lg"
        onClick={handleClick}
      >
        Open
      </Button>
    </ButtonWrapper>
  );
};

export default ContactOpenButton;
