import Grainient from "@/components/Grainient";

const Background = () => (
  <div className="absolute w-full h-full">
    <Grainient
      color1="#8b7bb8"
      color2="#a2a0ca"
      color3="#6b7ec2"
      timeSpeed={1}
      colorBalance={0}
      warpStrength={1}
      warpFrequency={8.5}
      warpSpeed={4}
      warpAmplitude={40}
      blendAngle={0}
      blendSoftness={0.1}
      rotationAmount={500}
      noiseScale={2}
      grainAmount={0.1}
      grainScale={2}
      grainAnimated={false}
      contrast={1.5}
      gamma={1}
      saturation={1}
      centerX={0}
      centerY={0}
      zoom={0.9}
    />
  </div>
);

export default Background;
