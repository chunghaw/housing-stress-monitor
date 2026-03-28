"use client";

import { useState } from "react";
import { AlertCircle, TrendingUp, Home, DollarSign, Activity } from "lucide-react";
import AiInsights from "@/components/AiInsights";
import DhsiChart from "@/components/DhsiChart";

export default function Dashboard() {
  // Mock State for the dashboard (will eventually be powered by your ML backend / CSV parsing)
  const [dhsiScore, setDhsiScore] = useState(68.5); // 0-100 scale
  const [unemployment, setUnemployment] = useState(4.2);
  const [inflation, setInflation] = useState(3.1);
  const [mortgageRate, setMortgageRate] = useState(6.8);

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Economic Overview</h1>
          <p className="text-foreground/60 mt-1">Real-time macro monitoring & systemic housing stress analysis.</p>
        </div>
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/20 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          System Modeling Active
        </div>
      </div>

      {/* Top Value Cards (Mocked) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Current DHSI", value: dhsiScore, suffix: "", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-500/10" },
          { title: "Unemployment", value: unemployment, suffix: "%", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "CPI Inflation YoY", value: inflation, suffix: "%", icon: DollarSign, color: "text-red-500", bg: "bg-red-500/10" },
          { title: "30-Yr Mortgage", value: mortgageRate, suffix: "%", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((metric, idx) => (
          <div key={idx} className="glass rounded-xl p-5 flex flex-col relative overflow-hidden group border border-border/40 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground/60">{metric.title}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.bg}`}>
                <metric.icon size={16} className={metric.color} />
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight">
              {metric.value.toFixed(1)}<span className="text-xl text-foreground/50 font-medium ml-1">{metric.suffix}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Left Column - Charts Placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass rounded-2xl p-6 h-[500px] border border-border/50 flex flex-col">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="text-primary" size={24} />
              Historical DHSI & Macro Trends
            </h3>
            <div className="flex-1 w-full min-h-0">
              <DhsiChart />
            </div>
          </div>
        </div>

        {/* Right Column - AI & Simulation Context */}
        <div className="flex flex-col gap-6">
          {/* AI Layer Component! */}
          <AiInsights 
            dhsiScore={dhsiScore} 
            unemployment={unemployment} 
            inflation={inflation} 
            mortgageRate={mortgageRate} 
          />
          
          {/* Placeholder for Simulation Controls */}
          <div className="glass rounded-2xl p-6 border border-border/50 flex-1">
            <h3 className="font-semibold text-lg mb-4">Macro Sandbox</h3>
            <p className="text-sm text-foreground/60 mb-6 font-medium">
              Adjust economic indicators to simulate stress reactions.
            </p>
            {/* Input Sliders Mockup */}
            <div className="space-y-6">
              {[
                { label: "Fed Funds Rate", val: "4.75%" },
                { label: "Wage Growth (AWI)", val: "2.1%" }
              ].map((slider, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground/80">{slider.label}</span>
                    <span className="text-primary font-bold">{slider.val}</span>
                  </div>
                  <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
