"use client";

import { LayoutDashboard, ExternalLink } from "lucide-react";

export default function TableauPage() {
  // Temporary placeholder Tableau Public URL. The team will replace this.
  const tableauUrl = "https://public.tableau.com/views/placeholder/Dashboard";

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <LayoutDashboard className="text-primary" size={32} />
            Tableau Reports
          </h1>
          <p className="text-foreground/60 mt-1">Native integration for your team's Tableau dashboards.</p>
        </div>
        <a 
          href={tableauUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/20 text-sm font-medium hover:bg-primary/10 transition-colors"
        >
          Open in Tableau <ExternalLink size={14} />
        </a>
      </div>

      <div className="glass rounded-2xl border border-border/50 flex flex-col justify-center items-center text-center flex-1 min-h-[600px] overflow-hidden relative">
        {/* Placeholder for iframe / Tableau JS API */}
        <div className="absolute inset-0 bg-foreground/5 animate-pulse -z-10" />
        <LayoutDashboard size={48} className="text-primary/50 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Awaiting Tableau Publication</h3>
        <p className="text-foreground/50 max-w-md mb-6 inline-block">
          Once your team publishes the DHSI dashboard to Tableau Public, we will embed the interactive dashboard directly on this page.
        </p>
        <div className="bg-background/50 border border-border rounded-lg p-4 font-mono text-xs text-left max-w-2xl w-full mx-auto text-foreground/70 shadow-inner">
          {`<iframe 
  src="YOUR_TABLEAU_PUBLIC_LINK_HERE?:showVizHome=no&:embed=true"
  width="100%" 
  height="100%"
  style={{ border: "none", borderRadius: "1rem" }}
/>`}
        </div>
      </div>
    </div>
  );
}
