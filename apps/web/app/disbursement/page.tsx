"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, CheckCircle2, Lock, Shield, Zap, ExternalLink, DollarSign, TrendingUp, Activity, BarChart3 } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
  { date: "2026-05-15 09:41", from: "UNICEF Germany", to: "4a7f2e9c1b83d", amount: "USDC 2,400.00", program: "Sudan Drought Response 2026", status: "settled", hash: "0x7a3f…c21e" },
  { date: "2026-05-15 09:38", from: "World Food Programme", to: "8c1d5a2f7e94b", amount: "XLM 14,200", program: "Haiti Earthquake Recovery", status: "settled", hash: "0x2b9c…f843" },
  { date: "2026-05-15 09:35", from: "Médecins Sans Frontières", to: "3e6b9d1a4c72f", amount: "USDC 810.00", program: "Somalia Food Security", status: "settled", hash: "0xd14a…2c7f" },
  { date: "2026-05-15 09:29", from: "OCHA Palestine Fund", to: "9f2a7c5e1b38d", amount: "USDC 5,000.00", program: "Gaza Emergency Aid", status: "pending", hash: "0x91be…7a2d" },
  { date: "2026-05-15 09:22", from: "IRC · DRC Office", to: "6d3c8e2a5f91b", amount: "USDC 1,200.00", program: "DRC Displacement Support", status: "settled", hash: "0xc73f…4d9e" },
  { date: "2026-05-15 09:14", from: "Oxfam Yemen", to: "2a8d6f4c1e73b", amount: "USDC 950.00", program: "Yemen WASH Program", status: "settled", hash: "0x5e2a…b17c" },
  { date: "2026-05-15 08:59", from: "Mercy Corps", to: "7b4e1a9c3f82d", amount: "XLM 8,900", program: "Myanmar Cyclone Response", status: "settled", hash: "0xa92d…3f1e" },
  { date: "2026-05-15 08:51", from: "Save the Children", to: "1c5f8b2e6a94d", amount: "USDC 3,150.00", program: "Sudan Drought Response 2026", status: "settled", hash: "0x4c81…d23a" },
  { date: "2026-05-15 08:43", from: "ActionAid", to: "5d9a2c7f1e46b", amount: "USDC 620.00", program: "Bangladesh Flood Relief", status: "settled", hash: "0xf72c…8b4e" },
  { date: "2026-05-15 08:30", from: "UNHCR Field Office", to: "0e3d6a9b2c57f", amount: "USDC 4,800.00", program: "DRC Displacement Support", status: "settled", hash: "0x1d93…6e5c" },
];

const FLOW_STEPS = [
  { icon: Lock, title: "Escrow", step: "01", desc: "Donor funds are locked in the Aid Escrow smart contract. No NGO or intermediary can access capital before conditions are verified." },
  { icon: Shield, title: "Verify", step: "02", desc: "Field partners cryptographically attest that beneficiaries are registered, eligible, and in the Beneficiary Registry contract." },
  { icon: Zap, title: "Release", step: "03", desc: "Upon multi-party attestation, the contract automatically releases funds directly to beneficiary Stellar accounts. Sub-second settlement." },
  { icon: CheckCircle2, title: "Confirm", step: "04", desc: "Every transaction is permanently recorded on Stellar ledger. Community monitors can audit or challenge any disbursement within 72 hours." },
];

const STATS = [
  { label: "Today's Volume", value: "$23,930", icon: DollarSign, color: "text-amber-400" },
  { label: "Total This Month", value: "$1.84M", icon: TrendingUp, color: "text-rose-400" },
  { label: "Avg. Transaction", value: "$2,393", icon: BarChart3, color: "text-orange-400" },
  { label: "Settlement Rate", value: "99.7%", icon: Activity, color: "text-emerald-400" },
];

export default function DisbursementPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-12">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">On-Chain Ledger</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] mb-6", isDark ? "text-white" : "text-stone-900")}>
              Disbursement<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Ledger</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-stone-400" : "text-stone-600")}>
              A real-time feed of every fund transfer, cryptographically verified on Stellar Mainnet. No transaction hidden. No fees skimmed.
            </p>
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

          {/* Live indicator */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Live — Stellar Mainnet</p>
          </div>

          {/* Transaction Table */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className={cn("rounded-2xl border overflow-x-auto mb-16", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className={cn("border-b text-[9px] font-black uppercase tracking-widest", isDark ? "border-stone-800 text-stone-600" : "border-amber-100 text-stone-400")}>
                  <th className="text-left px-5 py-3">Date / Time</th>
                  <th className="text-left px-5 py-3">From (NGO)</th>
                  <th className="text-left px-5 py-3">To (Beneficiary)</th>
                  <th className="text-left px-5 py-3">Amount</th>
                  <th className="text-left px-5 py-3">Program</th>
                  <th className="text-left px-5 py-3">TX Hash</th>
                  <th className="text-right px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className={cn("border-b text-xs transition-colors", isDark ? "border-stone-800/50 hover:bg-stone-800/40" : "border-amber-100/50 hover:bg-amber-50/60", i === TRANSACTIONS.length - 1 ? "border-b-0" : "")}
                  >
                    <td className={cn("px-5 py-3.5 font-mono text-[10px]", isDark ? "text-stone-500" : "text-stone-400")}>{tx.date}</td>
                    <td className={cn("px-5 py-3.5 font-bold", isDark ? "text-stone-300" : "text-stone-700")}>{tx.from}</td>
                    <td className="px-5 py-3.5 font-mono text-[10px] text-amber-500">{tx.to}…</td>
                    <td className={cn("px-5 py-3.5 font-black", isDark ? "text-white" : "text-stone-900")}>{tx.amount}</td>
                    <td className={cn("px-5 py-3.5 text-[10px] max-w-[180px] truncate", isDark ? "text-stone-400" : "text-stone-500")}>{tx.program}</td>
                    <td className="px-5 py-3.5 font-mono text-[10px] text-stone-500">{tx.hash}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border",
                        tx.status === "settled" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30")}>
                        {tx.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* How it works */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-3">Protocol</p>
              <h2 className={cn("text-3xl md:text-4xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>How Disbursement Works</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {FLOW_STEPS.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={cn("relative p-6 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
                  {i < FLOW_STEPS.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-8 w-5 h-5 text-amber-500/40 hidden md:block z-10" />
                  )}
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", isDark ? "bg-amber-500/10" : "bg-amber-50")}>
                    <step.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="text-[9px] font-mono text-stone-500 mb-1">Step {step.step}</div>
                  <h3 className={cn("font-black uppercase tracking-tight text-base mb-2", isDark ? "text-white" : "text-stone-900")}>{step.title}</h3>
                  <p className={cn("text-xs leading-relaxed", isDark ? "text-stone-400" : "text-stone-600")}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={cn("p-8 rounded-2xl border text-center relative overflow-hidden", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-rose-500/5" />
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-3">Verify Yourself</p>
              <h3 className={cn("text-2xl font-black uppercase tracking-tight mb-3", isDark ? "text-white" : "text-stone-900")}>Every TX is on Stellar Mainnet</h3>
              <p className={cn("text-sm mb-6 max-w-md mx-auto", isDark ? "text-stone-400" : "text-stone-600")}>
                Use Stellar Expert or Horizon API to independently verify any transaction. We do not ask you to trust us.
              </p>
              <a href="https://stellar.expert/explorer/public" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20 hover:opacity-90 transition-all">
                Open Stellar Explorer <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
