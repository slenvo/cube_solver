"use client";

import { useState } from "react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <main className="flex flex-col items-center p-10 min-h-screen bg-gradient-to-br from-[#09090f] to-[#141428]">
      <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Rubik's Vision Solver
      </h1>
      <p className="text-gray-400 mb-10">Scan, Verify, and Solve in Real-Time</p>

      {/* Progress Bar */}
      <div className="flex gap-4 mb-10 w-full max-w-2xl justify-between">
        {['Scan', 'Verify', 'Solve', 'Learn'].map((step, idx) => (
          <div 
            key={step} 
            className={`flex-1 text-center py-2 rounded-lg border border-white/10 backdrop-blur-md transition-all ${
              activeStep === idx + 1 ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-gray-500'
            }`}
          >
            {idx + 1}. {step}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl h-[500px] border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl flex items-center justify-center">
        {activeStep === 1 && <p className="text-xl text-cyan-200">Camera Scanner UI (Coming Next)</p>}
        {activeStep === 2 && <p className="text-xl text-cyan-200">Validation Grid (Coming Next)</p>}
        {activeStep === 3 && <p className="text-xl text-cyan-200">Calculating Algorithms...</p>}
        {activeStep === 4 && <p className="text-xl text-cyan-200">Interactive 3D Cube (Coming Next)</p>}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all font-medium"
        >
          Previous
        </button>
        <button 
          onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 transition-all font-medium shadow-lg"
        >
          Next Step
        </button>
      </div>
    </main>
  );
}