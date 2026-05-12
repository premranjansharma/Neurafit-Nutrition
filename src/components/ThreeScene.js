import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

import front from "../assets/front.jpeg";
import back from "../assets/back.jpeg";
import left from "../assets/left.jpeg";
import right from "../assets/right.jpeg";
import top from "../assets/top.jpeg";
import bottom from "../assets/bottom.jpeg";

function Cube() {
  const meshRef = useRef();

  const textures = useTexture([front, back, left, right, top, bottom]);

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />

      {textures.map((tex, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} map={tex} />
      ))}
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas style={{ height: "400px" }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} />
      <Cube />
      <OrbitControls />
    </Canvas>
  );
}