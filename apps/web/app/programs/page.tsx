"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MapPin, Users, TrendingUp, Calendar, Shield, Globe, Activity, DollarSign } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

const PROGRAMS = [
  {
    name: "Sudan Drought Response 2026",
    ngo: "UNICEF / Save the Children",
    region: "East Africa",
    country: "Sudan",
    beneficiaries: 18400,
    funded: 87,
    disbursed: "$1.24M",
    target: "$1.43M",
    start: "Jan 2026",
    end: "Dec 2026",
    status: "active",
    accent: "amber",
  },
  {
    name: "Haiti Earthquake Recovery Phase 3",
    ngo: "World Food Programme",
    region: "Caribbean",
    country: "Haiti",
    beneficiaries: 22100,
    funded: 72,
    disbursed: "$980K",
    target: "$1.36M",
    start: "Mar 2026",
    end: "Nov 2026",
    status: "active",
    accent: "rose",
  },
  {
    name: "Somalia Food Security Initiative",
    ngo: "Médecins Sans Frontières",
    region: "East Africa",
    country: "Somalia",
    beneficiaries: 31200,
    funded: 95,
    disbursed: "$2.10M",
    target: "$2.21M",
    start: "Oct 2025",
    end: "Sep 2026",
    status: "active",
    accent: "amber",
  },
  {
    name: "Bangladesh Flood Relief",
    ngo: "ActionAid / BRAC",
    region: "South Asia",
    country: "Bangladesh",
    beneficiaries: 14800,
    funded: 100,
    disbursed: "$760K",
    target: "$760K",
    start: "Aug 2025",
    end: "Feb 2026",
    status: "completed",
    accent: "emerald",
  },
  {
    name: "Gaza Emergency Aid",
    ngo: "OCHA / Islamic Relief",
    region: "Middle East",
    country: "Palestine",
    beneficiaries: 41000,
    funded: 63,
    disbursed: "$1.89M",
    target: "$3.00M",
    start: "Jan 2026",
    end: "Dec 2026",
    status: "emergency",
    accent: "red",
  },
  {
    name: "DRC Displacement Support",
    ngo: "IRC / UNHCR",
    region: "Central Africa",
    country: "DR Congo",
    beneficiaries: 9800,
    funded: 51,
    disbursed: "$420K",
    target: "$823K",
    start: "Feb 2026",
    end: "Aug 2026",
    status: "active",
    accent: "orange",
  },
  {
    name: "Yemen WASH Program",
    ngo: "Oxfam / Water.org",
    region: "Middle East",
    country: "Yemen",
    beneficiaries: 12600,
    funded: 78,
    disbursed: "$554K",
    target: "$711K",
    start: "Nov 2025",
    end: "Oct 2026",
    status: "active",
    accent: "blue",
  },
  {
    name: "Myanmar Cyclone Response",
    ngo: "Mercy Corps / Plan Int.",
    region: "Southeast Asia",
    country: "Myanmar",
    beneficiaries: 7400,
    funded: 44,
    disbursed: "$291K",
    target: "$661K",
    start: "Apr 2026",
    end: "Oct 2026",
    status: "active",
    accent: "amber",
  },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  completed: "bg-stone-500/10 text-stone-400 border-stone-500/30",
  emergency: "bg-red-500/10 text-red-400 border-red-500/30",
};

const REGIONS = ["All", "East Africa", "Caribbean", "South Asia", "Middle East", "Central Africa", "Southeast Asia"];
const STATUSES = ["All", "Active", "Completed", "Emergency"];

const OVERVIEW_STATS = [
  { label: "Active Programs", value: "8", icon: Activity, color: "text-amber-400" },
  { label: "Total Beneficiaries", value: "157,300", icon: Users, color: "text-rose-400" },
  { label: "Total Disbursed", value: "$8.24M", icon: DollarSign, color: "text-orange-400" },
  { label: "Countries Covered", value: "8", icon: Globe, color: "text-amber-300" },
];

export default function ProgramsPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [statusFilter, setStatusFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");

  const filtered = PROGRAMS.filter(p => {
    const statusMatch = statusFilter === "All" || p.status.toLowerCase() === statusFilter.toLowerCase();
    const regionMatch = regionFilter === "All" || p.region === regionFilter;
    return statusMatch && regionMatch;
  });

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">Aid Operations</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] mb-6",
              isDark ? "text-white" : "text-stone-900")}>
              Active Relief<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Programs</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-stone-400" : "text-stone-600")}>
              Every program is governed on-chain. Disbursement conditions, beneficiary rosters, and fund flows are publicly auditable in real time.
            </p>
          </motion.div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {OVERVIEW_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn("p-5 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}
              >
                <s.icon className={cn("w-5 h-5 mb-3", s.color)} />
                <div className={cn("text-3xl font-black tracking-tight mb-1", isDark ? "text-white" : "text-stone-900")}>{s.value}</div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn("flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border mb-8",
              isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}
          >
            <div className="flex-1">
              <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={cn("px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border",
                      statusFilter === s
                        ? "bg-amber-500 border-amber-500 text-white"
                        : isDark ? "border-stone-700 text-stone-500 hover:border-amber-500/30" : "border-amber-200 text-stone-500 hover:border-amber-400"
                    )}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-2">Region</p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => setRegionFilter(r)}
                    className={cn("px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border",
                      regionFilter === r
                        ? "bg-amber-500 border-amber-500 text-white"
                        : isDark ? "border-stone-700 text-stone-500 hover:border-amber-500/30" : "border-amber-200 text-stone-500 hover:border-amber-400"
                    )}
                  >{r}</button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Program Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={cn(
                  "p-6 rounded-2xl border hover:shadow-xl transition-all group",
                  isDark ? "bg-stone-900 border-stone-800 hover:border-amber-500/30" : "bg-white border-amber-200 hover:border-amber-400"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <h3 className={cn("font-black text-base uppercase tracking-tight leading-tight mb-1.5",
                      isDark ? "text-white" : "text-stone-900")}>{p.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500">
                      <MapPin className="w-3 h-3" />{p.country} · {p.region}
                    </div>
                  </div>
                  <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border shrink-0", STATUS_STYLES[p.status])}>
                    {p.status}
                  </span>
                </div>

                <div className={cn("text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1")}>{p.ngo}</div>

                {/* Progress bar */}
                <div className="mt-4 mb-4">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className={cn("font-bold uppercase tracking-wider", isDark ? "text-stone-400" : "text-stone-600")}>Funded</span>
                    <span className="font-black text-amber-400">{p.funded}%</span>
                  </div>
                  <div className={cn("h-1.5 rounded-full overflow-hidden", isDark ? "bg-stone-800" : "bg-amber-100")}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.funded}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.07 }}
                      className={cn("h-full rounded-full", p.funded === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-amber-500 to-rose-500")}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1.5">
                    <span className={cn("font-mono", isDark ? "text-stone-500" : "text-stone-500")}>{p.disbursed} disbursed</span>
                    <span className={cn("font-mono", isDark ? "text-stone-600" : "text-stone-400")}>Target: {p.target}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-800/50">
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <Users className="w-3 h-3 text-stone-500" />
                    <span className={cn("font-bold", isDark ? "text-stone-400" : "text-stone-600")}>{p.beneficiaries.toLocaleString()} beneficiaries</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
                    <Calendar className="w-3 h-3" />
                    <span>{p.start} – {p.end}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={cn("text-center py-20 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
              <p className="text-stone-500 font-bold uppercase tracking-widest text-sm">No programs match filters</p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
