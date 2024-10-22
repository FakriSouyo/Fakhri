// File: src/components/DownloadResume.tsx
import React from 'react';
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { CardSpotlight } from "./ui/CardSpotlight";

const DownloadResume: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <CardSpotlight className="col-span-full md:col-span-1 lg:col-span-1 min-h-[200px]">
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-950/30 backdrop-blur-md p-4 py-8 rounded-3xl flex items-center justify-center border border-white/10 shadow-lg h-full"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" className="text-2xl font-bold flex items-center text-white hover:text-lime-300 hover:bg-transparent relative z-10">
            UNDUH<br />RESUME
            <ArrowUpRight className="w-8 h-8 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </CardSpotlight>
  );
};

export default DownloadResume;
