import React, { useRef, useEffect } from 'react';
import { SpotLight, useDepthBuffer } from '@react-three/drei';
import * as THREE from 'three';

interface HeroSpotlightProps {
  cardRef: React.RefObject<THREE.Object3D & {
    translation: () => THREE.Vector3;
  }>;
}

const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ cardRef }) => {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const depthBuffer = useDepthBuffer({ frames: 1 });

  useEffect(() => {
    console.log("HeroSpotlight mounted");
    return () => console.log("HeroSpotlight unmounted");
  }, []);

  useEffect(() => {
    const updateSpotlight = () => {
      if (spotLightRef.current && cardRef.current) {
        const cardPosition = cardRef.current.translation();
        console.log("Card position:", cardPosition);
        // Tetapkan posisi y ke nilai tetap yang tinggi
        spotLightRef.current.position.set(cardPosition.x, 15, cardPosition.z);
        spotLightRef.current.target.position.set(cardPosition.x, 0, cardPosition.z);
      } else {
        console.log("spotLightRef or cardRef is null");
      }
    };

    // Panggil updateSpotlight setiap frame
    const intervalId = setInterval(updateSpotlight, 1000 / 60); // 60 FPS

    return () => clearInterval(intervalId);
  }, [cardRef]);

  return (
    <SpotLight
      ref={spotLightRef}
      position={[0, 15, 0]} // Posisi awal di atas Hero
      distance={30} // Meningkatkan jarak untuk mencakup seluruh Hero
      angle={0.5} // Menyesuaikan sudut untuk mencakup area yang tepat
      attenuation={5}
      anglePower={5}
      intensity={3} // Meningkatkan intensitas
      color="#ffffff"
      castShadow
      penumbra={1}
      depthBuffer={depthBuffer}
    />
  );
};

export default HeroSpotlight;
