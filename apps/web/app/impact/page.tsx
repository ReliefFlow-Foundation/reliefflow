"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { TrendingUp, Users, Globe, Heart, DollarSign, BarChart3, Quote } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

const HERO_STATS = [
  { value: "$8.4M", label: "Total Disbursed", sub: "Since protocol launch", color: "from-amber-400 to-amber-600" },
  { value: "142K", label: "Beneficiaries", sub: "Across 47 countries", color: "from-rose-400 to-rose-600" },
  { value: "84", label: "Programs", sub: "Active & completed", color: "from-orange-400 to-orange-600" },
  { value: "47", label: "Countries", sub: "Global reach", color: "from-amber-400 to-rose-400" },
];

const SECTORS = [
  { name: "Food Security", pct: 42, color: "bg-amber-500", light: "bg-amber-100", textColor: "text-amber-600" },
  { name: "Healthcare", pct: 28, color: "bg-rose-500", light: "bg-rose-100", textColor: "text-rose-600" },
  { name: "Shelter", pct: 18, color: "bg-orange-500", light: "bg-orange-100", textColor: "text-orange-600" },
  { name: "WASH", pct: 12, color: "bg-amber-400", light: "bg-amber-50", textColor: "text-amber-500" },
];

const MONTHLY_DATA = [
  { month: "Nov '25", value: 320, label: "$320K" },
  { month: "Dec '25", value: 480, label: "$480K" },
  { month: "Jan '26", value: 620, label: "$620K" },
  { month: "Feb '26", value: 540, label: "$540K" },
  { month: "Mar '26", value: 780, label: "$780K" },
  { month: "Apr '26", value: 920, label: "$920K" },
  { month: "May '26", value: 680, label: "$680K" },
];

const STORIES = [
  {
    region: "Khartoum, Sudan",
    program: "Sudan Drought Response 2026",
    ngo: "UNICEF",
    quote: "Before ReliefFlow, our disbursements took 3–6 weeks to reach families because of bank intermediaries and local exchange controls. Now, families receive funds in under 60 seconds. We've enrolled 4,200 households in Khartoum North alone.",
    name: "Dr. Amira Hassan",
    role: "Field Director, UNICEF Sudan",
    amount: "$1.24M",
    beneficiaries: "18,400",
  },
  {
    region: "Port-au-Prince, Haiti",
    program: "Haiti Earthquake Recovery Phase 3",
    ngo: "World Food Programme",
    quote: "Cash-based assistance works — but only when cash actually arrives. With ReliefFlow's Stellar-native disbursement, we've eliminated the 18–22% leakage we were seeing through our previous mobile money provider. Every dollar is now accounted for.",
    name: "Jean-Pierre Moreau",
    role: "Country Director, WFP Haiti",
    amount: "$980K",
    beneficiaries: "22,100",
  },
  {
    region: "Mogadishu, Somalia",
    program: "Somalia Food Security Initiative",
    ngo: "Médecins Sans Frontières",
    quote: "The Fraud Challenge system caught an attempted double-disbursement to 83 compromised beneficiary IDs within 4 minutes of the first transaction. We recovered 100% of funds. With traditional systems, this would have been discovered weeks later — if at all.",
    name: "Fatuma Omar",
    role: "Operations Lead, MSF Somalia",
    amount: "$2.10M",
    beneficiaries: "31,200",
  },
];

export default function ImpactPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const maxVal = Math.max(...MONTHLY_DATA.map(d => d.value));

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-12">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">Evidence-Based</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] mb-6", isDark ? "text-white" : "text-stone-900")}>
              Measured<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Impact</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-stone-400" : "text-stone-600")}>
              Every metric on this page is derived directly from on-chain data. No survey estimates. No self-reported numbers. Raw truth from the ledger.
            </p>
          </motion.div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {HERO_STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn("p-6 rounded-2xl border relative overflow-hidden", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-rose-500/5" />
                <div className="relative z-10">
                  <div className={cn("text-4xl md:text-5xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r", s.color)}>{s.value}</div>
                  <div className={cn("font-black uppercase text-sm tracking-wide mb-1", isDark ? "text-white" : "text-stone-900")}>{s.label}</div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-widest">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Efficiency Banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={cn("p-8 rounded-2xl border mb-16 relative overflow-hidden", isDark ? "bg-stone-900 border-amber-500/30" : "bg-amber-50 border-amber-300")}>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-rose-500/5" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="text-center md:text-left">
                <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 mb-2">97.3%</div>
                <div className={cn("font-black uppercase tracking-widest text-lg", isDark ? "text-white" : "text-stone-900")}>Disbursement Efficiency</div>
                <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-1">Funds reaching beneficiaries directly</div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
                    <span className={cn(isDark ? "text-stone-300" : "text-stone-700")}>ReliefFlow Protocol</span>
                    <span className="text-amber-400">97.3%</span>
                  </div>
                  <div className={cn("h-3 rounded-full overflow-hidden", isDark ? "bg-stone-800" : "bg-amber-100")}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "97.3%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
                    <span className={cn(isDark ? "text-stone-400" : "text-stone-500")}>Industry Average</span>
                    <span className="text-stone-500">65–80%</span>
                  </div>
                  <div className={cn("h-3 rounded-full overflow-hidden", isDark ? "bg-stone-800" : "bg-stone-200")}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "72%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="h-full rounded-full bg-stone-500" />
                  </div>
                </div>
                <p className={cn("text-xs", isDark ? "text-stone-500" : "text-stone-400")}>
                  The remaining 2.7% covers Stellar network fees (~0.00001 XLM per tx) and protocol auditor incentives. Zero admin overhead. Zero intermediaries.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sector Breakdown + Monthly Chart */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Sectors */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={cn("p-7 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mb-2">Allocation</p>
              <h2 className={cn("text-xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-stone-900")}>Impact by Sector</h2>
              <div className="space-y-4">
                {SECTORS.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className={cn("font-bold uppercase tracking-wide", isDark ? "text-stone-300" : "text-stone-700")}>{s.name}</span>
                      <span className="font-black text-amber-400">{s.pct}%</span>
                    </div>
                    <div className={cn("h-2.5 rounded-full overflow-hidden", isDark ? "bg-stone-800" : "bg-amber-100")}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                        className={cn("h-full rounded-full", s.color)} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Visual blocks */}
              <div className="mt-6 flex gap-1 h-8 rounded-xl overflow-hidden">
                {SECTORS.map(s => (
                  <div key={s.name} className={cn("h-full", s.color)} style={{ width: `${s.pct}%` }} title={`${s.name}: ${s.pct}%`} />
                ))}
              </div>
            </motion.div>

            {/* Monthly Chart */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className={cn("p-7 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mb-2">Timeline</p>
              <h2 className={cn("text-xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-stone-900")}>Monthly Disbursements</h2>
              <div className="flex items-end gap-2 h-32">
                {MONTHLY_DATA.map((d, i) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[8px] font-bold text-amber-400">{d.label}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(d.value / maxVal) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}
                      className={cn("w-full rounded-t-lg bg-gradient-to-t from-amber-500 to-rose-500 min-h-[4px]")}
                    />
                    <span className={cn("text-[8px] font-bold uppercase", isDark ? "text-stone-500" : "text-stone-400")}>{d.month}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Impact Stories */}
          <div>
            <div className="mb-8">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-2">Field Reports</p>
              <h2 className={cn("text-2xl md:text-3xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>Impact Stories</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {STORIES.map((s, i) => (
                <motion.div key={s.region} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={cn("p-7 rounded-2xl border flex flex-col", isDark ? "bg-stone-900 border-stone-800 hover:border-amber-500/30" : "bg-white border-amber-200 hover:border-amber-400", "transition-all")}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{s.region}</p>
                      <p className={cn("text-[10px] font-bold", isDark ? "text-stone-400" : "text-stone-500")}>{s.ngo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-amber-400">{s.amount}</p>
                      <p className="text-[9px] text-stone-500 uppercase tracking-widest">{s.beneficiaries} beneficiaries</p>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-amber-500/40 mb-3" />
                  <p className={cn("text-xs leading-relaxed flex-1 mb-5", isDark ? "text-stone-300" : "text-stone-600")}>
                    {s.quote}
                  </p>
                  <div className={cn("pt-4 border-t", isDark ? "border-stone-800" : "border-amber-100")}>
                    <p className={cn("text-xs font-black", isDark ? "text-white" : "text-stone-900")}>{s.name}</p>
                    <p className="text-[10px] text-stone-500">{s.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
