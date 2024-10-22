import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { motion } from "framer-motion";
import Band from './Band';
import HeroSpotlight from './HeroSpotlight';
import { CardSpotlight } from "./ui/CardSpotlight";

const Hero: React.FC = () => {
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setCanvasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CardSpotlight className="col-span-full md:col-span-2 lg:col-span-2 row-span-2">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-950/30 backdrop-blur-md p-6 rounded-3xl text-black flex flex-row justify-between border border-white/10 shadow-lg h-full"
      >
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-1/2 pr-4 flex items-center"
        >
          <div style={{ width: '100%', height: '100%' }}>
            {canvasLoaded && (
              <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={Math.PI / 2} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <Physics gravity={[0, -40, 0]}>
                    <Band cardRef={cardRef} />
                  </Physics>
                  <HeroSpotlight cardRef={cardRef} />
                  <Environment preset="city" />
                  <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Suspense>
              </Canvas>
            )}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-1/2 pl-4 flex items-center"
        >
          <div className="text-white pt-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              Saya <span className="text-lime-300">Fakhri Abdillah</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-sm leading-relaxed"
            >
              Seorang desainer web dan pengembang yang bersemangat dari Tarakan, Kalimantan Utara. Dengan latar belakang yang kuat dalam menciptakan situs web responsif dan ramah pengguna, saya mengkhususkan diri dalam pengembangan front-end menggunakan teknologi modern.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </CardSpotlight>
  );
};

export default Hero;
