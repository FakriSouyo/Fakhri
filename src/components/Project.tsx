// File: src/components/Project.tsx
import React from 'react';
import { Button } from "./ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { CardSpotlight } from "./ui/CardSpotlight";

const Project: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <CardSpotlight className="col-span-full md:col-span-2 lg:col-span-2">
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gray-950/30 backdrop-blur-md p-3 rounded-3xl flex flex-row justify-between h-full text-white border border-white/10 shadow-lg overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col justify-between py-3 z-10 w-1/2">
          <div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-base font-bold mb-1"
            >
              PROYEK
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mb-1 text-xs"
            >
              Belum punya desain? Saya bisa membuat situs web yang indah dalam waktu singkat.
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button variant="default" className="bg-white/10 text-white rounded-full text-xs px-2 py-0.5 text-[10px] hover:bg-white/20">LIHAT PROYEK SAYA</Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute right-[-25%] top-0 bottom-0 flex items-center justify-center"
          style={{ width: '80%' }}
        >
          <motion.img
            src="/Container3.png"
            alt="Proyek"
            className="object-cover h-[140%] w-auto"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </CardSpotlight>
  );
};

export default Project;
