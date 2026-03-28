"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart 
} from "recharts";
import { Loader2 } from "lucide-react";

export default function DhsiChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/hpi.csv")
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Process the raw data into a chartable format
            const formatted = results.data.map((row: any, i) => {
              // We check common date column names
              const dateVal = row.Date || row.date || row.DATE || row.Month || row.month || `Month ${i}`;
              
              const unemp = row.unemployment_rate || 5;
              const inflation = row.CPI ? (row.CPI / 100) : 3; // Approx
              const mortgage = row.mortgage_rate_30 || row.mortgage_rate_15 || 6;
              
              // Create a mock DHSI proxy score based on macro factors
              // High unemp, high inflation, high mortgage = higher structural stress.
              const stress = Math.min(100, Math.max(0, 30 + (unemp * 3) + (inflation * 1.5) + (mortgage * 2)));
              
              return {
                dateRaw: String(dateVal),
                dhsi: Number(stress.toFixed(1)),
                unemployment: Number(unemp.toFixed(1)),
                mortgage: Number(mortgage.toFixed(1)),
                hpi: row.HPI_SA || row.HPI_NSA || 100
              };
            });
            setData(formatted);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-primary gap-3">
        <Loader2 className="animate-spin w-8 h-8" />
        <span className="text-sm font-medium animate-pulse">Parsing local CSV datasets...</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorDhsi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorHpi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis 
          dataKey="dateRaw" 
          stroke="rgba(255,255,255,0.3)" 
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} 
          tickFormatter={(val) => {
            // just show year if possible, assuming YYYY-MM-DD
            if (val.length >= 4) return val.substring(0, 4);
            return val;
          }}
          minTickGap={40}
        />
        <YAxis yAxisId="left" orientation="left" domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
        <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} stroke="rgba(16, 185, 129, 0.4)" tick={{ fill: 'rgba(16, 185, 129, 0.6)', fontSize: 11 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(15, 23, 42, 0.9)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
          itemStyle={{ fontSize: 13, fontWeight: 500 }}
          labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontSize: 12 }}
        />
        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
        <Area yAxisId="left" type="monotone" dataKey="dhsi" name="DHSI Proxy" stroke="#ef4444" strokeWidth={2} fill="url(#colorDhsi)" />
        <Area yAxisId="right" type="monotone" dataKey="hpi" name="Housing Price Index (SA)" stroke="#10b981" strokeWidth={2} fill="url(#colorHpi)" />
        <Line yAxisId="left" type="monotone" dataKey="mortgage" name="30Y Mortgage %" stroke="#a855f7" dot={false} strokeWidth={2} />
        <Line yAxisId="left" type="monotone" dataKey="unemployment" name="Unemployment %" stroke="#3b82f6" dot={false} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
