"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, LayoutDashboard, PieChart } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Custom logo: house silhouette with an embedded trend line
function DhsiLogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="houseGrad" x1="2" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* House body */}
      <path
        d="M2.5 10.2L11 2.8L19.5 10.2V19C19.5 19.55 19.05 20 18.5 20H14V14.5H8V20H3.5C2.95 20 2.5 19.55 2.5 19V10.2Z"
        fill="url(#houseGrad)"
        fillOpacity="0.9"
      />
      {/* Trend/pulse line overlaid on house */}
      <path
        d="M5.5 15.5L7.8 12L9.5 13.8L11.5 9.5L13.5 12L16 10.5"
        stroke="#0369a1"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navItems = [
  { name: "Overview", href: "/", icon: Home, description: "Live KPIs & trends" },
  { name: "Stress Decomp", href: "/decomposition", icon: PieChart, description: "Factor breakdown" },
  { name: "Simulations", href: "/simulations", icon: BarChart3, description: "What-if scenarios" },
  { name: "Tableau Dashboard", href: "/tableau", icon: LayoutDashboard, description: "Interactive reports" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r border-border/60 glass relative z-10">

      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-5 border-b border-border/60 gap-3">
        {/* Icon mark */}
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/40 ring-1 ring-white/15">
            <DhsiLogoIcon />
          </div>
          {/* Live pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-background shadow shadow-green-400/50 animate-pulse" />
        </div>

        {/* Brand text */}
        <div className="leading-tight min-w-0">
          <p className="text-sm font-bold tracking-tight text-foreground">
            DHSI <span className="text-primary">Engine</span>
          </p>
          <p className="text-[10px] text-foreground/40 tracking-wide truncate">Housing Stress Monitor</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-3">
          Analytics Hub
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative block">
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary font-semibold"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              )}>
                {/* Icon with bg */}
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                  isActive ? "bg-primary/15" : "bg-foreground/5 group-hover:bg-foreground/10"
                )}>
                  <item.icon size={15} className={isActive ? "text-primary" : "text-foreground/40"} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm leading-tight">{item.name}</p>
                  <p className="text-[10px] text-foreground/35 leading-tight mt-0.5 truncate">{item.description}</p>
                </div>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/60 space-y-3">
        {/* Project badge */}
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-blue-600/5 border border-primary/15 px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest">CSE 6242</span>
            <span className="text-[9px] text-foreground/30">·</span>
            <span className="text-[10px] text-foreground/40">Georgia Tech</span>
          </div>
          <p className="text-[10px] text-foreground/35 leading-snug">Economic Conditions &amp; Housing Market Stress</p>
        </div>

        {/* Team */}
        <div className="space-y-1 px-1">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-foreground/25 mb-1.5">Team</p>
          {[
            { name: "Rezvan Heydari", initials: "RH" },
            { name: "Chung Haw Tan", initials: "CT" },
            { name: "Ela Khachatryan", initials: "EK" },
            { name: "Joseph Wu", initials: "JW" },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-primary/15 text-primary text-[8px] font-bold flex items-center justify-center flex-shrink-0">
                {m.initials}
              </span>
              <span className="text-[10px] text-foreground/35 truncate">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
