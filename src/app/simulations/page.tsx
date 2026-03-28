"use client";

import { useState } from "react";
import { BarChart3, SlidersHorizontal, ArrowRight } from "lucide-react";
import AiInsights from "@/components/AiInsights";

export default function SimulationsPage() {
  const [unemployment, setUnemployment] = useState(4.2);
  const [inflation, setInflation] = useState(3.1);
  const [mortgageRate, setMortgageRate] = useState(6.8);
  
  // A naive mock simulation calculation for visual feedback 
  // (In production, this connects to the ML Regularized LASSO model weights)
  const simulatedDhsi = Math.min(100, Math.max(0, 50 + (unemployment * 3) + (inflation * 2.5) + (mortgageRate * 1.5) - 30)).toFixed(1);

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <BarChart3 className="text-primary" size={32} />
          Macroeconomic Simulations
        </h1>
        <p className="text-foreground/60 mt-1">"What-If" scenario planning to view stress reactions dynamically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="glass rounded-2xl p-6 md:p-8 border border-border/50 flex flex-col gap-8">
          <div className="flex items-center gap-3 border-b border-border/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <SlidersHorizontal size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Adjust Economic Variables</h3>
          </div>

          <div className="space-y-8 flex-1">
            {/* Unemployment Slider */}
            <div className="group">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium text-foreground/80 flex items-center gap-2">
                  Unemployment Rate (%)
                </span>
                <span className="text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded transition-transform group-hover:scale-110">{unemployment}%</span>
              </div>
              <input 
                type="range" min="2" max="15" step="0.1" 
                value={unemployment} onChange={(e) => setUnemployment(Number(e.target.value))}
                className="w-full h-2.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:h-3"
              />
            </div>
            
            {/* Inflation Slider */}
            <div className="group">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium text-foreground/80">CPI Inflation YoY (%)</span>
                <span className="text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded transition-transform group-hover:scale-110">{inflation}%</span>
              </div>
              <input 
                type="range" min="0" max="12" step="0.1" 
                value={inflation} onChange={(e) => setInflation(Number(e.target.value))}
                className="w-full h-2.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-red-500 transition-all hover:h-3"
              />
            </div>

            {/* Mortgage Rate Slider */}
            <div className="group">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium text-foreground/80">30-Yr Mortgage Rate (%)</span>
                <span className="text-purple-500 font-bold bg-purple-500/10 px-2 py-0.5 rounded transition-transform group-hover:scale-110">{mortgageRate}%</span>
              </div>
              <input 
                type="range" min="2" max="12" step="0.1" 
                value={mortgageRate} onChange={(e) => setMortgageRate(Number(e.target.value))}
                className="w-full h-2.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-purple-500 transition-all hover:h-3"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          <div className="glass rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
            <div className="relative z-10 w-full">
              <span className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-2 block">Simulated DHSI Score</span>
              <div className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 mb-4 transition-all duration-300">
                {simulatedDhsi}
              </div>
              <p className="text-sm text-foreground/60 max-w-sm mx-auto">
                Real-time projection based on selected inputs. High values (&gt;75) indicate structural vulnerability.
              </p>
            </div>
            
            {/* Dynamic Status Indicator built into bottom line */}
            {Number(simulatedDhsi) < 60 && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-green-500 opacity-80" />}
            {Number(simulatedDhsi) >= 60 && Number(simulatedDhsi) < 75 && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-orange-500 opacity-80" />}
            {Number(simulatedDhsi) >= 75 && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-red-500 opacity-80 animate-pulse" />}
          </div>

          {/* AI Analysis of the simulation */}
          <AiInsights 
            dhsiScore={Number(simulatedDhsi)}
            unemployment={unemployment}
            inflation={inflation}
            mortgageRate={mortgageRate}
            context="User is running a what-if simulation using the sliders."
            className="flex-1 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
