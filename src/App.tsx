// File: src/App.tsx
import React from 'react';
import { LampContainer } from './components/ui/lamp';
import Hero from './components/Hero';
import Testimonial from './components/Testimonial';
import DownloadResume from './components/DownloadResume';
import Contact from './components/Contact';
import Works from './components/Works';
import Project from './components/Project';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 relative flex flex-col">
      <LampContainer className="w-full">
        {/* Konten lampu */}
      </LampContainer>
      <div className="flex-grow flex items-start justify-center -mt-52">
        <div className="relative z-10 py-4 px-4 w-full">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto">
            <Hero />
            <Testimonial />
            <DownloadResume />
            <Contact />
            <Works />
            <Project />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
