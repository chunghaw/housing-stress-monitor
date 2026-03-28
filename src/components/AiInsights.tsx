"use client";

import { useState, useRef } from "react";
import { Sparkles, Loader2, Send, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: "user" | "assistant";
  content: string;
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
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am your DHSI Economic Analyst. I monitor the current macroeconomic indicators. Ask me to break down systemic vulnerabilities or simulate market scenarios!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "Why is the DHSI score at this level?",
    "How would a 2% spike in mortgage rates impact housing stress?",
    "What is the historical relationship between CPI and housing?"
  ]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setSuggestedQuestions([]); // Hide suggestions while loading
    
    // Instantly scroll to the user's message so it is fully visible.
    // We intentionally DO NOT auto-scroll after the AI finishes generating. 
    // This anchors the viewport to the start of the AI's response, enabling natural, top-down reading!
    setTimeout(() => scrollToBottom(), 50);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMessages,
          contextData: { dhsiScore, unemployment, inflation, mortgageRate, context } 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.insight || "Failed to fetch AI insights");
      }
      
      setMessages([...newMessages, { role: "assistant", content: data.insight }]);
      
      if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
        setSuggestedQuestions(data.suggestedQuestions);
      }
    } catch (err: any) {
      console.error(err);
      setMessages([...newMessages, { role: "assistant", content: `Error: ${err.message || "Connection failed."}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("glass rounded-2xl flex flex-col relative overflow-hidden h-[500px]", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border/50 relative z-10 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="text-primary w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-lg tracking-tight">AI Analyst Chat</h3>
            <p className="text-xs text-foreground/50">Context-aware macroeconomic analysis</p>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5 pb-2 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-primary/20">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground ml-auto rounded-tr-sm" 
                  : "bg-foreground/5 text-foreground/80 border border-border/50 rounded-tl-sm mr-auto"
              )}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </motion.div>
          ))}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-foreground/50 bg-foreground/5 w-fit px-4 py-3 rounded-2xl rounded-tl-sm border border-border/50"
            >
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-xs font-medium">Analyzing market data...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Suggested Questions */}
      {suggestedQuestions.length > 0 && !loading && (
        <div className="px-5 pb-2 flex flex-col gap-2 relative z-10">
          <span className="text-[10px] text-foreground/40 uppercase tracking-wider font-semibold px-1 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> Suggested Follow-ups
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-[11px] font-medium bg-background/60 hover:bg-primary/20 hover:text-primary transition-colors border border-border/60 rounded-full px-3 py-1.5 text-foreground/70 text-left max-w-full truncate"
                title={q}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 pt-2 relative z-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about housing stress..."
            className="w-full bg-background/50 border border-border/50 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
