"use client";

import { useEffect } from "react";
import Grainient from "@/components/grainient";

const Background = () => {
  useEffect(() => {
    document.documentElement.scrollTop =
      (document.documentElement.scrollHeight - window.innerHeight) / 2;
  }, []);

  return (
    <div className="absolute w-full h-full">
      <Grainient
        blendAngle={0}
        blendSoftness={0.1}
        centerX={0}
        centerY={0}
        color1="#8b7bb8"
        color2="#a2a0ca"
        color3="#6b7ec2"
        colorBalance={0}
        contrast={1.5}
        gamma={1}
        grainAmount={0.1}
        grainAnimated={false}
        grainScale={2}
        noiseScale={2}
        rotationAmount={500}
        saturation={1}
        timeSpeed={1}
        warpAmplitude={40}
        warpFrequency={8.5}
        warpSpeed={4}
        warpStrength={1}
        zoom={0.9}
      />
    </div>
  );
};

export default Background;
