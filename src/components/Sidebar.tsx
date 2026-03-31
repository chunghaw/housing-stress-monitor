"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, BarChart3, LayoutDashboard, PieChart } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
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
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r border-border glass relative z-10">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2 text-primary font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Activity size={18} strokeWidth={2.5} />
          </div>
          DHSI Engine
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <p className="px-2 text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-3">
          Analytics Hub
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative block"
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200",
                  isActive
                    ? "text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <item.icon size={17} className={cn(isActive ? "text-primary" : "text-foreground/40")} />
                <div className="min-w-0">
                  <div className="text-sm leading-tight">{item.name}</div>
                  <div className="text-[10px] text-foreground/40 leading-tight mt-0.5">{item.description}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer: Project Info */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-[11px] font-semibold text-primary/80 uppercase tracking-wider mb-0.5">CSE 6242 · Georgia Tech</p>
          <p className="text-[10px] text-foreground/40 leading-snug">Economic Conditions &amp; Housing Market Stress</p>
        </div>
        <div className="px-1 space-y-1">
          {["Rezvan Heydari", "Chung Haw Tan", "Ela Khachatryan", "Joseph Wu"].map((name) => (
            <p key={name} className="text-[10px] text-foreground/30 leading-snug">{name}</p>
          ))}
        </div>
      </div>
    </aside>
  );
}
