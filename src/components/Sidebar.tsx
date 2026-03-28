"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, BarChart3, LayoutDashboard, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Stress Decomp", href: "/decomposition", icon: Activity },
  { name: "Simulations", href: "/simulations", icon: BarChart3 },
  { name: "Tableau Reports", href: "/tableau", icon: LayoutDashboard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r border-border glass relative z-10">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2 text-primary font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Activity size={18} strokeWidth={2.5} />
          </div>
          DHSI Engine
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        <p className="px-2 text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4">
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
                <item.icon size={18} className={cn(isActive ? "text-primary" : "text-foreground/50")} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors">
          <Settings size={18} className="text-foreground/50" />
          Settings
        </button>
      </div>
    </aside>
  );
}
