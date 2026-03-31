"use client";

import { useState } from "react";
import { LayoutDashboard, ExternalLink, Maximize2, RefreshCw } from "lucide-react";

const TABLEAU_VIEWS = [
  {
    name: "Housing Stress Overview",
    description: "National-level DHSI and macro-economic stress indicators",
    url: "https://public.tableau.com/views/HousingStressMarketMonitoringDashboard/HousingStressOverview",
  },
];

export default function TableauPage() {
  const [activeView] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const currentView = TABLEAU_VIEWS[activeView];
  const embedUrl = `${currentView.url}?:showVizHome=no&:embed=true&:toolbar=yes&:animate_transition=yes`;
  const publicUrl = `https://public.tableau.com/app/profile/rezvan.heydari/viz/HousingStressMarketMonitoringDashboard/HousingStressOverview`;

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <LayoutDashboard className="text-primary" size={32} />
            Tableau Dashboard
          </h1>
          <p className="text-foreground/60 mt-1">
            Interactive Housing Stress Market Monitoring Dashboard — published on Tableau Public.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setLoaded(false); setIframeKey(k => k + 1); }}
            className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-border/50 text-sm font-medium hover:bg-foreground/5 transition-colors"
            title="Reload dashboard"
          >
            <RefreshCw size={14} />
            Reload
          </button>
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/30 text-sm font-medium hover:bg-primary/10 transition-colors text-primary"
          >
            <Maximize2 size={14} />
            Full Screen
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* View Info Banner */}
      <div className="glass rounded-xl px-5 py-4 border border-border/40 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div>
            <p className="font-semibold text-sm text-foreground">{currentView.name}</p>
            <p className="text-xs text-foreground/50">{currentView.description}</p>
          </div>
        </div>
        <div className="text-xs text-foreground/40 font-mono">
          Source: Tableau Public · Team DHSI
        </div>
      </div>

      {/* Embedded Tableau Dashboard */}
      <div className="glass rounded-2xl border border-border/50 overflow-hidden relative" style={{ height: "calc(100vh - 260px)", minHeight: "600px" }}>
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 z-10 pointer-events-none">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-foreground/60">Loading Tableau Dashboard…</p>
          </div>
        )}
        <iframe
          key={iframeKey}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: "none", display: "block" }}
          onLoad={() => setLoaded(true)}
          title="Housing Stress Market Monitoring Dashboard"
          allowFullScreen
        />
      </div>

      {/* Footer Attribution */}
      <div className="text-center text-xs text-foreground/30 pb-2">
        Dashboard built with Tableau Public · Data sources: BLS, FRED, Freddie Mac, Zillow ·{" "}
        <a href={publicUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors underline underline-offset-2">
          View on Tableau Public
        </a>
      </div>
    </div>
  );
}
