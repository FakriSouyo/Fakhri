// File: src/components/Works.tsx
import React from 'react';
import { Button } from "./ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { CardSpotlight } from "./ui/CardSpotlight";
import { FaGithub, FaBehance } from 'react-icons/fa';

const Works: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <CardSpotlight className="col-span-full md:col-span-1 lg:col-span-1">
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gray-950/30 backdrop-blur-md p-3 rounded-3xl flex flex-col justify-between h-full text-white border border-white/10 shadow-lg"
      >
        <div className="flex flex-col justify-between py-3">
          <div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base font-bold mb-1"
            >
              KARYA
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-1 text-xs"
            >
              Mencari desain yang bersih dan cepat? Saya orang yang tepat.
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex space-x-2"
          >
            <Button variant="ghost" className="text-white rounded-full text-xs px-2 py-0.5 text-[10px] hover:text-lime-300 hover:bg-transparent">
              <FaGithub className="mr-1" />
            </Button>
            <Button variant="ghost" className="text-white rounded-full text-xs px-2 py-0.5 text-[10px] hover:text-lime-300 hover:bg-transparent">
              <FaBehance className="mr-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </CardSpotlight>
  );
};

export default Works;
