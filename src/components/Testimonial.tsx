import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { CardSpotlight } from "./ui/CardSpotlight";

const Testimonial: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <CardSpotlight className="col-span-full md:col-span-1 lg:col-span-1 row-span-2">
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5 }}
        className="bg-gray-950/30 backdrop-blur-md p-4 rounded-3xl text-white flex flex-col justify-between border border-white/10 shadow-lg h-full relative z-10"
      >
        <div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold mb-2 text-lime-300"
          >
            "
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm mb-4"
          >
            Bekerja dengan Diego adalah pengalaman yang benar-benar transformatif untuk situs web B2B kami. Sejak awal, profesionalisme dan dedikasinya sangat jelas. Dia secara konsisten melampaui harapan kami, tidak hanya memenuhi tetapi melampaui persyaratan proyek.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-sm">ISMAIL MOHAMMED</p>
              <p className="text-xs text-gray-300">SecureSlice</p>
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="rounded-full bg-white/10 text-white p-1 hover:bg-white/20">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-white/10 text-white p-1 hover:bg-white/20">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </CardSpotlight>
  );
};

export default Testimonial;
