import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const countryData = [
  { name: "USA", role: "♚ King", flag: "🇺🇸", lat: 38, lng: -97 },
  { name: "China", role: "♛ Queen", flag: "🇨🇳", lat: 35, lng: 103 },
  { name: "Russia", role: "♜ Rook", flag: "🇷🇺", lat: 61, lng: 105 },
  { name: "EU", role: "♝ Bishop", flag: "🇪🇺", lat: 50, lng: 10 },
  { name: "India", role: "♞ Knight", flag: "🇮🇳", lat: 21, lng: 78 },
  { name: "Turkey", role: "♟ Pawn", flag: "🇹🇷", lat: 39, lng: 35 },
  { name: "Iran", role: "♟ Pawn", flag: "🇮🇷", lat: 32, lng: 53 },
  { name: "UK", role: "♝ Bishop", flag: "🇬🇧", lat: 55, lng: -3 },
  { name: "Germany", role: "♜ Rook", flag: "🇩🇪", lat: 51, lng: 10 },
  { name: "France", role: "♞ Knight", flag: "🇫🇷", lat: 46, lng: 2 },
  { name: "Africa", role: "♟ Pawn", flag: "🌍", lat: 1, lng: 17 },
  { name: "Latin America", role: "♟ Pawn", flag: "🌎", lat: -14, lng: -60 },
  { name: "Southeast Asia", role: "♟ Pawn", flag: "🌏", lat: 13, lng: 100 },
  { name: "Japan", role: "♞ Knight", flag: "🇯🇵", lat: 36, lng: 138 },
  { name: "Brazil", role: "♟ Pawn", flag: "🇧🇷", lat: -14, lng: -51 },
  { name: "Australia", role: "♟ Pawn", flag: "🇦🇺", lat: -25, lng: 133 }
];

function convertLatLngToXYZ(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

function CountryMarker({ country }) {
  const [x, y, z] = convertLatLngToXYZ(country.lat, country.lng, 2.1);
  return (
    <group position={[x, y, z]}>
      <mesh scale={[0.05, 0.05, 0.05]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.6} />
      </mesh>
      <Html distanceFactor={10} style={{ color: "white", textAlign: "center", fontSize: "10px" }}>
        {country.flag}
        <br />
        {country.role}
        <br />
        {country.name}
      </Html>
    </group>
  );
}

function Earth({ darkMode }) {
  const texture = useLoader(
    THREE.TextureLoader,
    darkMode
      ? "/assets/earth_nightmap_hd.jpg" // ✅ make sure this is placed in /public/assets/
      : "/assets/earth_daymap.jpg"
  );

  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

export default function Globe({ darkMode }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={darkMode ? 0.25 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} fade />
        <Suspense fallback={<Html>Loading globe...</Html>}>
          <Earth darkMode={darkMode} />
          {countryData.map((c, i) => (
            <CountryMarker key={i} country={c} />
          ))}
        </Suspense>
        <OrbitControls enableZoom enablePan={false} rotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
