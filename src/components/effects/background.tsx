import DitherWave from "./dither-wave";

const Background = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute w-full h-[120vh] top-[-10vh] bottom-[-10vh]"
    >
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
