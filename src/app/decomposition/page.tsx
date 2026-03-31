"use client";

import { Activity, Info, TrendingDown, Zap, Landmark, Home } from "lucide-react";
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const FACTORS = [
  {
    name: "Credit Conditions",
    shortName: "Credit",
    weight: 40,
    color: "#a855f7",
    icon: Landmark,
    iconColor: "text-violet-400",
    bg: "bg-violet-500/10",
    variables: "30-Yr Mortgage Rate, Federal Funds Rate",
    description:
      "Interest-rate tightening is the strongest leading indicator of housing stress. Rising mortgage rates compress affordability and directly suppress demand and new construction."
  },
  {
    name: "Labor Factors",
    shortName: "Labor",
    weight: 35,
    color: "#3b82f6",
    icon: TrendingDown,
    iconColor: "text-blue-400",
    bg: "bg-blue-500/10",
    variables: "Unemployment Rate, Average Wage Index (AWI)",
    description:
      "Labor market deterioration reduces household income and purchasing power, weakening mortgage serviceability and increasing delinquency risk."
  },
  {
    name: "Inflation Dynamics",
    shortName: "Inflation",
    weight: 15,
    color: "#ef4444",
    icon: Zap,
    iconColor: "text-red-400",
    bg: "bg-red-500/10",
    variables: "CPI Year-over-Year Growth",
    description:
      "Elevated inflation erodes real wages and purchasing power. It also motivates central bank rate hikes that indirectly tighten credit conditions across housing markets."
  },
  {
    name: "Housing Price Index",
    shortName: "HPI",
    weight: 10,
    color: "#10b981",
    icon: Home,
    iconColor: "text-green-400",
    bg: "bg-green-500/10",
    variables: "HPI_SA (Freddie Mac, Seasonally Adjusted)",
    description:
      "Rapid nominal price appreciation disconnects from income fundamentals, amplifying systemic risk and borrower leverage beyond sustainable thresholds."
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900/95 border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-sm">
        <p className="font-bold text-white mb-1">{d.name}</p>
        <p className="text-foreground/60">Weight: <span className="font-semibold text-white">{d.weight}%</span></p>
      </div>
    );
  }
  return null;
};

export default function DecompositionPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Activity className="text-primary" size={32} />
          Stress Decomposition
        </h1>
        <p className="text-foreground/60 mt-1">Isolating structural vulnerabilities into distinct economic factors via adaptive weighting.</p>
      </div>

      {/* Top row: bars + pie chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Component Weight Bars */}
        <div className="glass rounded-2xl p-8 border border-border/50">
          <h3 className="text-xl font-semibold mb-2">Component Contribution Weights</h3>
          <p className="text-foreground/60 text-sm mb-8">
            Weights dynamically update via structural break detection to reflect different economic regimes (e.g., Inflationary vs. Disinflationary periods).
          </p>

          <div className="space-y-7">
            {FACTORS.map((factor, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground/80 flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${factor.bg}`}>
                      <factor.icon size={13} className={factor.iconColor} />
                    </div>
                    {factor.name}
                  </span>
                  <span className="font-bold text-foreground">{factor.weight}%</span>
                </div>
                <div className="h-2.5 w-full bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${factor.weight}%`, backgroundColor: factor.color }}
                  />
                </div>
                <p className="text-xs text-foreground/40 pl-1">Variables: {factor.variables}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="glass rounded-2xl p-6 border border-border/50 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Weight Distribution</h3>
          <p className="text-foreground/60 text-sm mb-4">
            Visual breakdown of DHSI component contributions under the current economic regime.
          </p>
          <div className="flex-1 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={FACTORS.map(f => ({ ...f, fill: f.color }))}
                  cx="50%"
                  cy="50%"
                  innerRadius="45%"
                  outerRadius="70%"
                  paddingAngle={4}
                  dataKey="weight"
                  nameKey="name"
                  stroke="none"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => (
                    <span style={{ color: "rgba(248,250,252,0.7)", fontSize: 12 }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center label overlay hint */}
          <p className="text-center text-xs text-foreground/30 mt-2">
            Hover segments for details · Regime-adaptive via LASSO
          </p>
        </div>
      </div>

      {/* Factor Deep-Dive Cards */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground/90">
          <Info className="text-primary w-5 h-5" />
          Factor Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FACTORS.map((factor, i) => (
            <div key={i} className="glass rounded-xl p-5 border border-border/40 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${factor.bg}`}>
                <factor.icon size={20} className={factor.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm text-foreground">{factor.name}</h4>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ color: factor.color, backgroundColor: `${factor.color}20` }}
                  >
                    {factor.weight}%
                  </span>
                </div>
                <p className="text-xs text-foreground/50 mb-2">{factor.variables}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptive Weighting Explainer */}
      <div className="glass rounded-xl p-6 border border-border/40 bg-gradient-to-br from-background/80 to-primary/5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Info size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">How Adaptive Weighting Works</h4>
            <p className="text-sm text-foreground/70 leading-relaxed max-w-3xl">
              Traditional price-to-income ratios apply static weights regardless of the economic environment. The DHSI uses <strong>rolling-window LASSO regularization</strong> to re-estimate factor contributions as regimes shift. During tightening cycles, <em>credit conditions</em> dominate the index. During recessions, <em>labor deterioration</em> becomes the primary stress driver. A change-point detection module identifies these structural breaks in real time, allowing DHSI to serve as a true early-warning system rather than a lagging indicator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
