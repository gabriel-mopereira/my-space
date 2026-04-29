"use client";

import { useEffect } from "react";
import DitherWave from "./dither-wave";

const Background = () => {
  useEffect(() => {
    document.documentElement.scrollTop =
      (document.documentElement.scrollHeight - window.innerHeight) / 2;
  }, []);

  return (
    <div aria-hidden="true" className="absolute w-full h-full">
      <DitherWave
        downScale={0.5}
        intensity={1}
        primaryColor="#8b7bb8"
        quality="low"
        scale={3}
        secondaryColor="#a2a0ca"
        speed={0.2}
        tertiaryColor="#6b7ec2"
        width="100%"
      />
    </div>
  );
};

export default Background;
