"use client";

import { useEffect, useRef } from "react";

import * as THREE from "three";
import { cn } from "@/lib/utils";

export type DitherWaveProps = {
  /** Content to render on top of the effect */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Downscale factor for dithering pattern (higher = coarser) */
  downScale?: number;
  /** Height of the component in pixels or CSS value */
  height?: number | string;
  /** Wave intensity/amplitude */
  intensity?: number;
  /** Maximum frames per second cap */
  maxFPS?: number;
  /** Overall opacity (0-1) */
  opacity?: number;
  /** Pause rendering when component is off-screen */
  pauseWhenOffscreen?: boolean;
  /** Primary color in the gradient */
  primaryColor?: string;
  /** Quality preset for performance/visual tradeoff */
  quality?: "low" | "medium" | "high";
  /** Scale of the wave pattern (higher = larger waves) */
  scale?: number;
  /** Secondary color in the gradient */
  secondaryColor?: string;
  /** Animation speed multiplier */
  speed?: number;
  /** Tertiary color in the gradient */
  tertiaryColor?: string;
  /** Width of the component in pixels or CSS value */
  width?: number | string;
};

const DitherWave: React.FC<DitherWaveProps> = ({
  children,
  className,
  downScale = 0.5,
  height = "100%",
  intensity = 1.0,
  maxFPS = 60,
  opacity = 1.0,
  pauseWhenOffscreen = true,
  primaryColor = "#5227FF",
  quality = "medium",
  scale = 6.0,
  secondaryColor = "#5227FF",
  speed = 1.0,
  tertiaryColor = "#0a0a0a",
  width = "100%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            b: Number.parseInt(result[3], 16) / 255,
            g: Number.parseInt(result[2], 16) / 255,
            r: Number.parseInt(result[1], 16) / 255,
          }
        : { b: 0, g: 0, r: 0 };
    };

    const color1 = hexToRgb(primaryColor);
    const color2 = hexToRgb(secondaryColor);
    const color3 = hexToRgb(tertiaryColor);

    const rect = container.getBoundingClientRect();
    const actualWidth = rect.width;
    const actualHeight = rect.height;

    const qualitySettings = {
      high: {
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 3),
      },
      low: { antialias: false, pixelRatio: 1 },
      medium: {
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    };
    const settings = qualitySettings[quality];

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: settings.antialias,
      depth: false,
      powerPreference: "high-performance",
      stencil: false,
    });
    renderer.setClearColor(0x00_00_00, 0);

    const pixelRatio = settings.pixelRatio;
    renderer.setSize(actualWidth, actualHeight, false);
    renderer.setPixelRatio(pixelRatio);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.append(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const bufferWidth = actualWidth * pixelRatio;
    const bufferHeight = actualHeight * pixelRatio;

    const uniforms = {
      iResolution: { value: new THREE.Vector2(bufferWidth, bufferHeight) },
      iTime: { value: 0 },
      uColor1: { value: new THREE.Vector3(color1.r, color1.g, color1.b) },
      uColor2: { value: new THREE.Vector3(color2.r, color2.g, color2.b) },
      uColor3: { value: new THREE.Vector3(color3.r, color3.g, color3.b) },
      uDownScale: { value: downScale },
      uIntensity: { value: intensity },
      uOpacity: { value: opacity },
      uScale: { value: scale },
      uSpeed: { value: speed },
    };

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      #define COLOR_COUNT 3

      uniform float iTime;
      uniform vec2 iResolution;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uScale;
      uniform float uDownScale;
      uniform float uOpacity;

      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;

      vec3 colors[COLOR_COUNT];

      void setupColorPalette() {
        colors[0] = uColor1;
        colors[1] = uColor2;
        colors[2] = uColor3;
      }

      float Bayer2(vec2 a) {
        a = floor(a);
        return fract(a.x / 2.0 + a.y * a.y * 0.75);
      }

      #define Bayer4(a)   (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
      #define Bayer8(a)   (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))
      #define Bayer16(a)  (Bayer8(0.5 * (a)) * 0.25 + Bayer2(a))
      #define Bayer32(a)  (Bayer16(0.5 * (a)) * 0.25 + Bayer2(a))
      #define Bayer64(a)  (Bayer32(0.5 * (a)) * 0.25 + Bayer2(a))

      vec3 applyDitheredColor(float value, vec2 pixelCoord) {
        float paletteIndex = clamp(value, 0.0, 1.0) * float(COLOR_COUNT - 1);

        vec3 colorA = vec3(0.0);
        vec3 colorB = vec3(0.0);

        for (int i = 0; i < COLOR_COUNT; i++) {
          if (float(i) == floor(paletteIndex)) {
            colorA = colors[i];
            if (i < COLOR_COUNT - 1) {
              colorB = colors[i + 1];
            } else {
              colorB = colorA;
            }
            break;
          }
        }

        float ditherValue = Bayer64(pixelCoord * 0.25);

        float blendAmount = float(fract(paletteIndex) > ditherValue);

        return mix(colorA, colorB, blendAmount);
      }

      float flowField(vec2 p, float t) {
        return sin(p.x + sin(p.y + t * 0.1)) * sin(p.y * p.x * 0.1 + t * 0.2);
      }

      vec2 computeField(vec2 p, float t) {
        vec2 ep = vec2(0.05, 0.0);
        vec2 result = vec2(0.0);

        for (int i = 0; i < 20; i++) {
          float t0 = flowField(p, t);
          float t1 = flowField(p + ep.xy, t);
          float t2 = flowField(p + ep.yx, t);
          vec2 gradient = vec2((t1 - t0), (t2 - t0)) / ep.xx;
          vec2 tangent = vec2(-gradient.y, gradient.x);

          p += tangent * 0.5 + gradient * 0.005;
          p.x += sin(t * 0.25) * 0.1;
          p.y += cos(t * 0.25) * 0.1;
          result = gradient;
        }

        return result;
      }

      void main() {
        setupColorPalette();

        vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
        uv.x *= iResolution.x / iResolution.y;
        float animTime = iTime * uSpeed;

        vec2 p = uv * uScale;

        vec2 field = computeField(p, animTime);

        float colorValue = length(field) * uIntensity;
        colorValue = clamp(colorValue, 0.0, 1.0);

        vec3 finalColor = applyDitheredColor(colorValue, gl_FragCoord.xy / uDownScale);

        gl_FragColor = vec4(finalColor, uOpacity);
      }
    `;

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      transparent: true,
      uniforms,
      vertexShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let observer: IntersectionObserver | null = null;
    if (pauseWhenOffscreen) {
      observer = new IntersectionObserver(
        (entries) => {
          isVisibleRef.current = entries[0].isIntersecting;
        },
        { threshold: 0 },
      );
      observer.observe(container);
    }

    const frameInterval = 1000 / maxFPS;
    const animate = (currentTime: number) => {
      rafRef.current = requestAnimationFrame(animate);

      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
        lastFrameTimeRef.current = currentTime;
      }

      const elapsed = currentTime - lastFrameTimeRef.current;

      if (elapsed < frameInterval) {
        return;
      }

      lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

      if (pauseWhenOffscreen && !isVisibleRef.current) {
        return;
      }

      uniforms.iTime.value = (currentTime - startTimeRef.current) * 0.001;

      uniforms.uSpeed.value = speed;
      uniforms.uIntensity.value = intensity;
      uniforms.uScale.value = scale;
      uniforms.uDownScale.value = downScale;
      uniforms.uOpacity.value = opacity;

      renderer.render(scene, camera);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      const newWidth = newRect.width;
      const newHeight = newRect.height;

      renderer.setSize(newWidth, newHeight, false);

      const newBufferWidth = newWidth * pixelRatio;
      const newBufferHeight = newHeight * pixelRatio;
      uniforms.iResolution.value.set(newBufferWidth, newBufferHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      if (observer) {
        observer.disconnect();
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        renderer.domElement.remove();
      }
    };
  }, [
    speed,
    intensity,
    scale,
    downScale,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    opacity,
    quality,
    maxFPS,
    pauseWhenOffscreen,
  ]);

  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      ref={containerRef}
      style={{ height: heightStyle, width: widthStyle }}
    >
      {children && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default DitherWave;
