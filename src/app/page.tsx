"use client";

import { useState, useEffect } from "react";
import { AlertCircle, TrendingUp, DollarSign, Activity, Loader2, Info, Database, Brain, GitBranch, Users } from "lucide-react";
import AiInsights from "@/components/AiInsights";
import DhsiChart from "@/components/DhsiChart";

export default function Dashboard() {
  const [dhsiScore, setDhsiScore] = useState<number | null>(null);
  const [unemployment, setUnemployment] = useState<number | null>(null);
  const [inflation, setInflation] = useState<number | null>(null);
  const [mortgageRate, setMortgageRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the latest actual data point from the CSV to power the Top Cards
  useEffect(() => {
    fetch("/data/hpi.csv")
      .then(res => res.text())
      .then(csv => {
        import("papaparse").then(Papa => {
          Papa.default.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              const data = results.data as any[];
              if (data.length > 0) {
                const latestRow = data[data.length - 1];

                const unemp = latestRow.unemployment_rate || 4.2;
                const infl = latestRow.CPI ? (latestRow.CPI / 100) : 3.1;
                const mortgage = latestRow.mortgage_rate_30 || latestRow.mortgage_rate_15 || 6.8;

                // Same DHSI proxy logic used in the DhsiChart to maintain consistency
                const stress = Math.min(100, Math.max(0, 30 + (unemp * 3) + (infl * 1.5) + (mortgage * 2)));

                setDhsiScore(Number(stress.toFixed(1)));
                setUnemployment(Number(unemp.toFixed(1)));
                setInflation(Number(infl.toFixed(1)));
                setMortgageRate(Number(mortgage.toFixed(1)));
              }
              setLoading(false);
            }
          });
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getDhsiStatus = (score: number | null) => {
    if (!score) return { text: "Loading", color: "text-foreground/50", border: "border-border" };
    if (score >= 75) return { text: "High Risk", color: "text-red-500", border: "border-red-500/50" };
    if (score >= 60) return { text: "Elevated", color: "text-orange-500", border: "border-orange-500/50" };
    return { text: "Stable", color: "text-green-500", border: "border-green-500/50" };
  };

  const currentStatus = getDhsiStatus(dhsiScore);

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Economic Overview</h1>
          <p className="text-foreground/60 mt-1">An early-warning framework for systemic housing market stress.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/20 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Analytics Pipeline
          </div>
          <div className="text-xs text-foreground/50 text-right">
            Latest Data: Q1 2025
          </div>
        </div>
      </div>

      {/* Executive Summary Panel */}
      <div className="glass rounded-xl p-6 md:p-8 border border-border/40 mt-2 mb-2 bg-gradient-to-br from-background/80 to-primary/5">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <Info className="text-primary w-6 h-6" />
          The Objective: Why Build the DHSI?
        </h2>
        <div className="flex flex-col gap-4 text-sm md:text-base text-foreground/80 leading-relaxed">
          <p>
            <strong>The Problem:</strong> Traditional affordability metrics, like simple price-to-income ratios, fundamentally ignore the complexities and cumulative pressures building up in the macroeconomy. They fail to identify cascading vulnerabilities <em>before</em> systemic crises occur (e.g., the 2008 crash).
          </p>
          <p>
            <strong>Our Solution:</strong> The <em>Dynamic Housing Stress Index (DHSI)</em>. By aggregating granular data spanning 1991–2025 from the BLS, FRED, and Freddie Mac, we engineered an adaptive, multidimensional framework that explicitly maps structural shifts in labor deterioration, inflationary pressure, and credit tightening.
          </p>
        </div>
      </div>

      {/* Top Value Cards (Live Data) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Latest DHSI Score",
            value: dhsiScore,
            suffix: "/ 100",
            icon: AlertCircle,
            color: currentStatus.color,
            bg: "bg-foreground/5",
            customBorder: currentStatus.border,
            subtitle: `Condition: ${currentStatus.text}`
          },
          { title: "Unemployment", value: unemployment, suffix: "%", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10", subtitle: "BLS Labor Data" },
          { title: "CPI Inflation YoY", value: inflation, suffix: "%", icon: DollarSign, color: "text-red-500", bg: "bg-red-500/10", subtitle: "Purchasing Power" },
          { title: "30-Yr Mortgage", value: mortgageRate, suffix: "%", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10", subtitle: "FRED Credit Conditions" },
        ].map((metric, idx) => (
          <div key={idx} className={`glass rounded-xl p-5 flex flex-col relative overflow-hidden group border ${metric.customBorder ? metric.customBorder : 'border-border/40'} hover:border-primary/50 transition-colors`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground/80">{metric.title}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.bg}`}>
                <metric.icon size={16} className={metric.color} />
              </div>
            </div>

            <div className="text-4xl font-black tracking-tight mt-1 flex items-baseline gap-1">
              {loading || metric.value === null ? (
                <Loader2 className="w-6 h-6 animate-spin text-primary mt-2" />
              ) : (
                <>
                  {metric.value.toFixed(1)}
                  <span className="text-base text-foreground/50 font-medium tracking-normal">{metric.suffix}</span>
                </>
              )}
            </div>
            <div className="text-xs font-medium text-foreground/50 mt-3 uppercase tracking-wider">
              {metric.subtitle}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Left Column - Chart */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass rounded-2xl p-6 h-[500px] border border-border/50 flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="text-primary" size={24} />
              Historical DHSI & Macro Trends
            </h3>
            <p className="text-sm text-foreground/60 mb-6">
              Visualizing systemic housing stress against asset inflation (1991–2025). The proxy algorithm heavily weights credit and labor conditions over time.
            </p>
            <div className="flex-1 w-full min-h-0 relative z-10">
              <DhsiChart />
            </div>
          </div>
        </div>

        {/* Right Column - AI Analyst */}
        <div className="flex flex-col h-[500px]">
          <AiInsights
            dhsiScore={dhsiScore || 0}
            unemployment={unemployment || 0}
            inflation={inflation || 0}
            mortgageRate={mortgageRate || 0}
            className="flex-1 h-full shadow-lg"
          />
        </div>
      </div>

      {/* Methodology Highlights */}
      <div className="mt-2">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground/90">
          <Brain className="text-primary w-5 h-5" />
          Methodology Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Database,
              color: "text-cyan-400",
              bg: "bg-cyan-500/10",
              title: "Multi-Source Data Pipeline",
              body: "34+ years of granular data from BLS, FRED, Freddie Mac, and Zillow — spanning 1991 to Q1 2025.",
            },
            {
              icon: Brain,
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              title: "LASSO Regularization",
              body: "Regularized regression dynamically estimates factor weights, penalizing irrelevant variables to isolate true structural drivers.",
            },
            {
              icon: GitBranch,
              color: "text-orange-400",
              bg: "bg-orange-500/10",
              title: "Structural Break Detection",
              body: "Change-point analysis identifies regime shifts — inflationary cycles vs. recessionary contractions — enabling adaptive reweighting.",
            },
            {
              icon: Activity,
              color: "text-green-400",
              bg: "bg-green-500/10",
              title: "Interactive What-If Engine",
              body: "Real-time macroeconomic scenario simulation: adjust unemployment, CPI, and mortgage rates to project future DHSI responses.",
            },
          ].map((card, i) => (
            <div key={i} className="glass rounded-xl p-5 border border-border/40 flex flex-col gap-3 hover:border-primary/30 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.bg}`}>
                <card.icon size={20} className={card.color} />
              </div>
              <h4 className="font-semibold text-sm text-foreground">{card.title}</h4>
              <p className="text-xs text-foreground/60 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="glass rounded-xl p-6 border border-border/40 mt-2 bg-gradient-to-br from-background/80 to-primary/5">
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
          <Users className="text-primary w-5 h-5" />
          Project Team · CSE 6242 — Data and Visual Analytics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Rezvan Heydari", role: "Tableau & Visualization" },
            { name: "Chung Haw Tan", role: "Full-Stack & Deployment" },
            { name: "Ela Khachatryan", role: "ML Modeling & LASSO" },
            { name: "Joseph Wu", role: "Data Pipeline & Analysis" },
          ].map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-foreground/5 border border-border/30 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <p className="font-semibold text-sm text-foreground">{member.name}</p>
              <p className="text-xs text-foreground/50">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
