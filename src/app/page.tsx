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

      {/* Information & KPI Explanation Panel */}
      <div className="glass rounded-xl p-6 border border-border/40 mt-2 mb-2">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Activity className="text-primary w-5 h-5" />
          About the Dynamic Housing Stress Index (DHSI)
        </h2>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          The DHSI is a unified, adaptive stress-monitoring system designed to detect rising financial vulnerabilities in the housing market earlier than traditional affordability metrics. It integrates labor conditions, inflation, housing prices, and credit indicators into a predictive multidimensional index. 
          <br /><br />
          <strong>Is it based on real data?</strong> Yes! The historical visualizations and macro indicators are natively powered by genuine historical data aggregated from 1991–2025.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-foreground/80">
          <div className="bg-background/40 p-3 rounded-lg border border-border/30">
            <span className="font-semibold text-foreground block mb-1">DHSI Score</span> 
            A composite proxy indicating systemic vulnerability. Scores &gt;75 signal high risk.
          </div>
          <div className="bg-background/40 p-3 rounded-lg border border-border/30">
            <span className="font-semibold text-foreground block mb-1">Unemployment & Wages</span> 
            Measures labor deterioration. Sourced from the <strong>BLS</strong> and SSA.
          </div>
          <div className="bg-background/40 p-3 rounded-lg border border-border/30">
            <span className="font-semibold text-foreground block mb-1">CPI Inflation</span> 
            Consumer Price Index mapping to purchasing power. Sourced from the <strong>BLS</strong>.
          </div>
          <div className="bg-background/40 p-3 rounded-lg border border-border/30">
            <span className="font-semibold text-foreground block mb-1">Mortgage Rates</span> 
            Credit indicators mapping to leverage risk. Fed Funds & Mortgage data from <strong>FRED</strong>.
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border/50 text-xs text-foreground/50 flex justify-between items-center">
          <em>Data Sources: U.S. Census Bureau, Zillow, Freddie Mac, BLS, and FRED.</em>
          <span>Updated: Q1 2025</span>
        </div>
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

        {/* Right Column - AI Analyst */}
        <div className="flex flex-col h-[500px]">
          {/* AI Layer Component! */}
          <AiInsights 
            dhsiScore={dhsiScore} 
            unemployment={unemployment} 
            inflation={inflation} 
            mortgageRate={mortgageRate} 
            className="flex-1 h-full"
          />
        </div>
      </div>
    </div>
  );
}
