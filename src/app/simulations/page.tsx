"use client";

import { useState } from "react";
import { BarChart3, SlidersHorizontal, Zap } from "lucide-react";
import AiInsights from "@/components/AiInsights";

const PRESETS = [
  {
    label: "Baseline",
    description: "Normal conditions (~2019)",
    unemployment: 3.5,
    inflation: 2.3,
    mortgageRate: 3.9,
    color: "border-green-500/40 hover:border-green-500/70 text-green-400",
    dot: "bg-green-500",
  },
  {
    label: "2008 Crisis",
    description: "Financial collapse peak",
    unemployment: 10.0,
    inflation: 3.8,
    mortgageRate: 6.5,
    color: "border-red-500/40 hover:border-red-500/70 text-red-400",
    dot: "bg-red-500",
  },
  {
    label: "COVID-19 Shock",
    description: "Pandemic peak unemployment",
    unemployment: 14.7,
    inflation: 1.2,
    mortgageRate: 3.1,
    color: "border-orange-500/40 hover:border-orange-500/70 text-orange-400",
    dot: "bg-orange-500",
  },
  {
    label: "2022 Rate Hikes",
    description: "Fed tightening cycle",
    unemployment: 3.5,
    inflation: 8.0,
    mortgageRate: 7.1,
    color: "border-purple-500/40 hover:border-purple-500/70 text-purple-400",
    dot: "bg-purple-500",
  },
  {
    label: "Stress Test",
    description: "Worst-case scenario",
    unemployment: 12.0,
    inflation: 10.0,
    mortgageRate: 10.5,
    color: "border-rose-500/40 hover:border-rose-500/70 text-rose-400",
    dot: "bg-rose-500",
  },
];

export default function SimulationsPage() {
  const [unemployment, setUnemployment] = useState(4.2);
  const [inflation, setInflation] = useState(3.1);
  const [mortgageRate, setMortgageRate] = useState(6.8);

  // A naive mock simulation calculation for visual feedback
  // (In production, this connects to the ML Regularized LASSO model weights)
  const simulatedDhsi = Math.min(100, Math.max(0, 50 + (unemployment * 3) + (inflation * 2.5) + (mortgageRate * 1.5) - 30)).toFixed(1);

  const getRiskLabel = (score: number) => {
    if (score >= 75) return { label: "High Risk", color: "text-red-400" };
    if (score >= 60) return { label: "Elevated", color: "text-orange-400" };
    return { label: "Stable", color: "text-green-400" };
  };

  const risk = getRiskLabel(Number(simulatedDhsi));

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setUnemployment(preset.unemployment);
    setInflation(preset.inflation);
    setMortgageRate(preset.mortgageRate);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <BarChart3 className="text-primary" size={32} />
          Macroeconomic Simulations
        </h1>
        <p className="text-foreground/60 mt-1">"What-If" scenario planning to view stress reactions dynamically.</p>
      </div>

      {/* Historical Scenario Presets */}
      <div className="glass rounded-xl p-5 border border-border/40">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Historical Scenario Presets</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PRESETS.map((preset, i) => (
            <button
              key={i}
              onClick={() => applyPreset(preset)}
              className={`glass rounded-xl p-3 border text-left transition-all duration-200 group ${preset.color}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${preset.dot}`} />
                <span className="font-semibold text-xs text-foreground">{preset.label}</span>
              </div>
              <p className="text-[11px] text-foreground/50 leading-tight">{preset.description}</p>
              <div className="mt-2 pt-2 border-t border-border/30 space-y-0.5">
                <p className="text-[10px] text-foreground/40">U: {preset.unemployment}% · CPI: {preset.inflation}%</p>
                <p className="text-[10px] text-foreground/40">Mortgage: {preset.mortgageRate}%</p>
              </div>
            </button>
          ))}
        </div>
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
                <span className="text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded transition-transform group-hover:scale-110">{unemployment.toFixed(1)}%</span>
              </div>
              <input
                type="range" min="2" max="15" step="0.1"
                value={unemployment} onChange={(e) => setUnemployment(Number(e.target.value))}
                className="w-full h-2.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:h-3"
              />
              <div className="flex justify-between text-[10px] text-foreground/30 mt-1 px-0.5">
                <span>2% (full employ.)</span><span>15% (severe)</span>
              </div>
            </div>

            {/* Inflation Slider */}
            <div className="group">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium text-foreground/80">CPI Inflation YoY (%)</span>
                <span className="text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded transition-transform group-hover:scale-110">{inflation.toFixed(1)}%</span>
              </div>
              <input
                type="range" min="0" max="12" step="0.1"
                value={inflation} onChange={(e) => setInflation(Number(e.target.value))}
                className="w-full h-2.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-red-500 transition-all hover:h-3"
              />
              <div className="flex justify-between text-[10px] text-foreground/30 mt-1 px-0.5">
                <span>0% (deflationary)</span><span>12% (crisis)</span>
              </div>
            </div>

            {/* Mortgage Rate Slider */}
            <div className="group">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium text-foreground/80">30-Yr Mortgage Rate (%)</span>
                <span className="text-purple-500 font-bold bg-purple-500/10 px-2 py-0.5 rounded transition-transform group-hover:scale-110">{mortgageRate.toFixed(1)}%</span>
              </div>
              <input
                type="range" min="2" max="12" step="0.1"
                value={mortgageRate} onChange={(e) => setMortgageRate(Number(e.target.value))}
                className="w-full h-2.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-purple-500 transition-all hover:h-3"
              />
              <div className="flex justify-between text-[10px] text-foreground/30 mt-1 px-0.5">
                <span>2% (ultra-low)</span><span>12% (extreme)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          <div className="glass rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
            <div className="relative z-10 w-full">
              <span className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-2 block">Simulated DHSI Score</span>
              <div className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 mb-2 transition-all duration-300">
                {simulatedDhsi}
              </div>
              <div className={`text-lg font-bold mb-3 ${risk.color}`}>{risk.label}</div>
              <p className="text-sm text-foreground/60 max-w-sm mx-auto">
                Real-time projection based on selected inputs. High values (&gt;75) indicate structural vulnerability.
              </p>
            </div>

            {/* Dynamic Status Indicator bottom bar */}
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
