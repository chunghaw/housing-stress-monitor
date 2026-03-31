import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DHSI Engine | Housing Stress Monitor",
  description: "Dynamic Housing Stress Index — an adaptive early-warning framework for systemic housing market stress. CSE 6242 · Georgia Tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex h-screen overflow-hidden selection:bg-primary/30`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl h-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
