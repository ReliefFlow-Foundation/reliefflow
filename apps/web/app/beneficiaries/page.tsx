"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Users, Globe, Shield, CheckCircle2, AlertCircle, BookOpen, Fingerprint } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

const BENEFICIARIES = [
  { id: "BEN-0041", hash: "4a7f2e9c1b83", country: "Sudan", program: "Sudan Drought Response 2026", registered: "2026-01-12", verified: true, disbursements: 7 },
  { id: "BEN-0892", hash: "8c1d5a2f7e94", country: "Haiti", program: "Haiti Earthquake Recovery", registered: "2026-03-08", verified: true, disbursements: 4 },
  { id: "BEN-1204", hash: "3e6b9d1a4c72", country: "Somalia", program: "Somalia Food Security", registered: "2025-10-22", verified: true, disbursements: 12 },
  { id: "BEN-3817", hash: "9f2a7c5e1b38", country: "Palestine", program: "Gaza Emergency Aid", registered: "2026-01-30", verified: false, disbursements: 2 },
  { id: "BEN-2053", hash: "6d3c8e2a5f91", country: "DR Congo", program: "DRC Displacement Support", registered: "2026-02-14", verified: true, disbursements: 3 },
  { id: "BEN-4491", hash: "2a8d6f4c1e73", country: "Yemen", program: "Yemen WASH Program", registered: "2025-11-05", verified: true, disbursements: 9 },
  { id: "BEN-0077", hash: "7b4e1a9c3f82", country: "Myanmar", program: "Myanmar Cyclone Response", registered: "2026-04-19", verified: true, disbursements: 1 },
  { id: "BEN-5530", hash: "1c5f8b2e6a94", country: "Sudan", program: "Sudan Drought Response 2026", registered: "2026-01-18", verified: true, disbursements: 6 },
  { id: "BEN-7742", hash: "5d9a2c7f1e46", country: "Bangladesh", program: "Bangladesh Flood Relief", registered: "2025-08-11", verified: true, disbursements: 8 },
  { id: "BEN-1388", hash: "0e3d6a9b2c57", country: "DR Congo", program: "DRC Displacement Support", registered: "2026-03-01", verified: false, disbursements: 0 },
];

const GEO_DISTRIBUTION = [
  { region: "East Africa", count: 58420, pct: 37, color: "bg-amber-500" },
  { region: "Middle East", count: 41800, pct: 27, color: "bg-rose-500" },
  { region: "Central Africa", count: 19600, pct: 12, color: "bg-orange-500" },
  { region: "Caribbean", count: 22100, pct: 14, color: "bg-amber-400" },
  { region: "South Asia", count: 9800, pct: 6, color: "bg-rose-400" },
  { region: "Southeast Asia", count: 6280, pct: 4, color: "bg-orange-400" },
];

const STATS = [
  { label: "Total Registered", value: "158,000", icon: Users, color: "text-amber-400" },
  { label: "Active Recipients", value: "142,300", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Countries", value: "47", icon: Globe, color: "text-rose-400" },
  { label: "Verification Rate", value: "93.8%", icon: Shield, color: "text-orange-400" },
];

export default function BeneficiariesPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">Privacy-First</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] mb-6", isDark ? "text-white" : "text-stone-900")}>
              Beneficiary<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Registry</span>
            </h1>
            <p className={cn("text-lg max-w-2xl mb-6", isDark ? "text-stone-400" : "text-stone-600")}>
              Identity verified. Dignity protected. Every individual in this registry is represented only by a cryptographic hash — never a name, location, or biometric.
            </p>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className={cn("flex items-start gap-4 p-5 rounded-2xl border mb-10",
              isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-300")}>
            <Fingerprint className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className={cn("text-sm font-bold mb-1", isDark ? "text-amber-300" : "text-amber-700")}>Zero PII Stored On-Chain</p>
              <p className={cn("text-xs leading-relaxed", isDark ? "text-stone-400" : "text-stone-600")}>
                No personally identifiable information is recorded on the Stellar blockchain. All identities are cryptographic hashes derived from verified off-chain credentials managed by certified field partners. Beneficiaries retain the right to have their hash removed at any time.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={cn("p-5 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
                <s.icon className={cn("w-5 h-5 mb-3", s.color)} />
                <div className={cn("text-3xl font-black tracking-tight mb-1", isDark ? "text-white" : "text-stone-900")}>{s.value}</div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Beneficiary Table */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className={cn("rounded-2xl border overflow-x-auto mb-14", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
            <div className={cn("px-5 py-4 border-b", isDark ? "border-stone-800" : "border-amber-100")}>
              <p className={cn("text-xs font-black uppercase tracking-widest", isDark ? "text-white" : "text-stone-900")}>Registry — Showing 10 of 158,000</p>
            </div>
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className={cn("border-b text-[9px] font-black uppercase tracking-widest", isDark ? "border-stone-800 text-stone-600" : "border-amber-100 text-stone-400")}>
                  <th className="text-left px-5 py-3">Beneficiary ID</th>
                  <th className="text-left px-5 py-3">Hash (12 chars)</th>
                  <th className="text-left px-5 py-3">Country</th>
                  <th className="text-left px-5 py-3">Program</th>
                  <th className="text-left px-5 py-3">Registered</th>
                  <th className="text-left px-5 py-3">Verified</th>
                  <th className="text-right px-5 py-3">Disbursements</th>
                </tr>
              </thead>
              <tbody>
                {BENEFICIARIES.map((b, i) => (
                  <motion.tr key={b.id}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className={cn("border-b text-xs transition-colors", isDark ? "border-stone-800/50 hover:bg-stone-800/40" : "border-amber-100/50 hover:bg-amber-50/60", i === BENEFICIARIES.length - 1 ? "border-b-0" : "")}>
                    <td className={cn("px-5 py-3.5 font-black font-mono", isDark ? "text-amber-400" : "text-amber-600")}>{b.id}</td>
                    <td className={cn("px-5 py-3.5 font-mono text-[10px]", isDark ? "text-stone-400" : "text-stone-500")}>{b.hash}…</td>
                    <td className={cn("px-5 py-3.5 font-bold", isDark ? "text-stone-300" : "text-stone-700")}>{b.country}</td>
                    <td className={cn("px-5 py-3.5 text-[10px] max-w-[180px] truncate", isDark ? "text-stone-400" : "text-stone-500")}>{b.program}</td>
                    <td className={cn("px-5 py-3.5 font-mono text-[10px]", isDark ? "text-stone-500" : "text-stone-400")}>{b.registered}</td>
                    <td className="px-5 py-3.5">
                      {b.verified
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        : <AlertCircle className="w-4 h-4 text-amber-400" />}
                    </td>
                    <td className={cn("px-5 py-3.5 text-right font-black", isDark ? "text-white" : "text-stone-900")}>{b.disbursements}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Geographic Distribution */}
          <div className="mb-14">
            <div className="mb-8">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-2">Geography</p>
              <h2 className={cn("text-2xl md:text-3xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>Geographic Distribution</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {GEO_DISTRIBUTION.map((g, i) => (
                <motion.div key={g.region} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={cn("p-5 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className={cn("font-black text-sm uppercase tracking-wide", isDark ? "text-white" : "text-stone-900")}>{g.region}</p>
                      <p className={cn("text-[10px] font-bold", isDark ? "text-stone-500" : "text-stone-400")}>{g.count.toLocaleString()} beneficiaries</p>
                    </div>
                    <span className="text-2xl font-black text-amber-400">{g.pct}%</span>
                  </div>
                  <div className={cn("h-1.5 rounded-full overflow-hidden", isDark ? "bg-stone-800" : "bg-amber-100")}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.08 }}
                      className={cn("h-full rounded-full", g.color)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Field Partner Registration */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={cn("p-8 md:p-10 rounded-2xl border relative overflow-hidden", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-rose-500/5" />
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", isDark ? "bg-amber-500/10" : "bg-amber-50")}>
                <BookOpen className="w-7 h-7 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mb-2">For Field Partners</p>
                <h3 className={cn("text-xl font-black uppercase tracking-tight mb-3", isDark ? "text-white" : "text-stone-900")}>Register Beneficiaries</h3>
                <p className={cn("text-sm leading-relaxed mb-6 max-w-xl", isDark ? "text-stone-400" : "text-stone-600")}>
                  Certified field partners can register beneficiaries using our privacy-preserving SDK. All registration flows use local hashing — PII never leaves the field device. Partners must hold a valid ReliefFlow Partner Certificate issued by the Foundation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20 hover:opacity-90 transition-all">
                    Partner Documentation
                  </a>
                  <a href="#" className={cn("inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs border transition-all",
                    isDark ? "border-stone-700 text-stone-400 hover:border-amber-500/30 hover:text-white" : "border-amber-200 text-stone-600 hover:border-amber-400")}>
                    Apply for Certification
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
