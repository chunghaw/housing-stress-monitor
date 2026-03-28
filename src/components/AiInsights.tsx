"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface AiInsightsProps {
  dhsiScore: number;
  unemployment: number;
  inflation: number;
  mortgageRate: number;
  context?: string;
  className?: string;
}

export default function AiInsights({ dhsiScore, unemployment, inflation, mortgageRate, context, className }: AiInsightsProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsight = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dhsiScore, unemployment, inflation, mortgageRate, context }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.insight || "Failed to fetch AI insights");
      }
      
      setInsight(data.insight);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch on mount or when key metrics change significantly
  useEffect(() => {
    generateInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dhsiScore]);

  return (
    <div className={cn("glass rounded-2xl p-6 relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="text-primary w-4 h-4" />
          </div>
          <h3 className="font-semibold text-lg tracking-tight">AI Vulnerability Analysis</h3>
        </div>
        <button 
          onClick={generateInsight}
          disabled={loading}
          className="text-foreground/50 hover:text-primary transition-colors disabled:opacity-50"
          title="Regenerate Analysis"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
        </button>
      </div>

      <div className="relative z-10 min-h-[80px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-foreground/60 h-full py-4 text-sm"
            >
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              Synthesizing macroeconomic indicators...
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-400 font-medium py-2"
            >
              {error}
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-foreground/80 leading-relaxed font-medium"
            >
              {insight}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
