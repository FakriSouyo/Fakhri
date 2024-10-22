// File: src/components/Contact.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CardSpotlight } from "./ui/CardSpotlight";
import Lottie from "react-lottie";
import flyAnimation from "../../public/fly.json";

const Contact: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: flyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsAnimating(true);
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    if (!isHovered && lottieRef.current) {
      lottieRef.current.stop();
    }
  };

  return (
    <CardSpotlight className="col-span-1 row-span-2">
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-950/30 backdrop-blur-md p-3 rounded-3xl text-white flex flex-col justify-between h-full border border-white/10 shadow-lg relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute inset-0 flex items-start justify-center pointer-events-none"
          style={{ top: '5%' }}
        >
          <Lottie 
            options={defaultOptions} 
            height={180}
            width={180}
            style={{
              opacity: isHovered || isAnimating ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
            isStopped={!isHovered && !isAnimating}
            eventListeners={[
              {
                eventName: 'complete',
                callback: handleAnimationComplete,
              },
            ]}
            ref={lottieRef}
          />
        </motion.div>
        <div className="flex-grow"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10"
        >
          <h2 className="text-xl font-bold mb-1">INGIN BERBICARA?</h2>
          <h2 className="text-xl font-bold mb-2 text-lime-300">KIRIM PESAN.</h2>
          <p className="text-sm">fakhri@abdillah.works</p>
        </motion.div>
      </motion.div>
    </CardSpotlight>
  );
};

export default Contact;
