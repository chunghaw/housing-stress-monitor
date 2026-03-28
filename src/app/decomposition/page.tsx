"use client";

import { Activity, PieChart, Info } from "lucide-react";

export default function DecompositionPage() {
  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Activity className="text-primary" size={32} />
          Stress Decomposition
        </h1>
        <p className="text-foreground/60 mt-1">Isolating structural vulnerabilities into distinct economic factors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-8 border border-border/50">
          <h3 className="text-xl font-semibold mb-6">Component Contribution weights</h3>
          <p className="text-foreground/60 text-sm mb-8">
            These weights will dynamically update via structural break detection modules to signify different economic regimes (e.g., Inflationary vs. Disinflationary environments).
          </p>
          
          <div className="space-y-6">
            {[
              { name: "Labor Factors (Unemployment, AWI)", weight: "35%", color: "bg-blue-500" },
              { name: "Credit Conditions (Mortgage Rates, Fed Funds)", weight: "40%", color: "bg-purple-500" },
              { name: "Inflation Dynamics (CPI YoY)", weight: "15%", color: "bg-red-500" },
              { name: "Housing Price Index (HPI_SA)", weight: "10%", color: "bg-green-500" },
            ].map((factor, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{factor.name}</span>
                  <span className="font-bold text-foreground/80">{factor.weight}</span>
                </div>
                <div className="h-2.5 w-full bg-foreground/10 rounded-full overflow-hidden">
                  <div className={`h-full ${factor.color} rounded-full`} style={{ width: factor.weight }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass rounded-2xl p-6 border border-border/50 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Info size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">What is Adaptive Weighting?</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Traditional price-to-income ratios oversimplify affordability by applying fixed weights to the market. The DHSI utilizes regularized regression (LASSO) to construct a rolling-window estimation. During tightening cycles, credit conditions heavily influence the score. During recessions, labor deterioration will be detected as the primary systemic risk driver.
              </p>
            </div>
          </div>
          
          {/* We will optionally add a Recharts Pie Chart here if the user's ML backend supplies real split data */}
          <div className="glass rounded-2xl flex-1 border border-border/50 flex flex-col items-center justify-center min-h-[250px] p-6 text-center">
            <PieChart size={48} className="text-foreground/20 mb-4" />
            <h4 className="font-medium text-foreground/50 mb-2">Awaiting Phase 2 Machine Learning Pipeline</h4>
            <p className="text-xs text-foreground/40 max-w-sm">
              The exact real-time pie breakdown of system stress requires the LASSO outputs from the teammate's ML backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
