"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Shield, Eye, CheckCircle2, AlertTriangle, Clock, Coins, Activity, Zap, Lock, GitBranch } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

const CHALLENGES = [
  { id: "CHG-0091", txHash: "0x7a3f…c21e", filed: "2026-05-10", challenger: "5f8c2a…4d1", amount: "USDC 2,400", status: "dismissed", resolution: "2026-05-12" },
  { id: "CHG-0088", txHash: "0x2b9c…f843", filed: "2026-05-07", challenger: "9e1d7b…3a2", amount: "USDC 5,000", status: "upheld", resolution: "2026-05-09" },
  { id: "CHG-0085", txHash: "0xd14a…2c7f", filed: "2026-05-01", challenger: "3c7f9a…8e1", amount: "USDC 810", status: "dismissed", resolution: "2026-05-03" },
  { id: "CHG-0082", txHash: "0x91be…7a2d", filed: "2026-04-28", challenger: "7a4d2c…5f9", amount: "XLM 14,200", status: "upheld", resolution: "2026-04-30" },
  { id: "CHG-0079", txHash: "0xc73f…4d9e", filed: "2026-04-22", challenger: "1b6e8f…2c4", amount: "USDC 3,150", status: "under review", resolution: "—" },
  { id: "CHG-0074", txHash: "0x5e2a…b17c", filed: "2026-04-15", challenger: "4d9b1a…7f3", amount: "USDC 950", status: "dismissed", resolution: "2026-04-17" },
  { id: "CHG-0071", txHash: "0xa92d…3f1e", filed: "2026-04-08", challenger: "8f2c6e…1b5", amount: "USDC 620", status: "upheld", resolution: "2026-04-10" },
  { id: "CHG-0068", txHash: "0x1d93…6e5c", filed: "2026-04-02", challenger: "2e7a4d…9c6", amount: "USDC 4,800", status: "dismissed", resolution: "2026-04-04" },
];

const STATUS_STYLES: Record<string, string> = {
  "upheld": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "dismissed": "bg-stone-500/10 text-stone-400 border-stone-500/30",
  "under review": "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

const AUDIT_STATS = [
  { label: "Transactions Audited", value: "12,841", icon: Eye, color: "text-amber-400" },
  { label: "Challenges Filed", value: "91", icon: AlertTriangle, color: "text-rose-400" },
  { label: "Upheld Challenges", value: "3", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Avg. Review Time", value: "38 hrs", icon: Clock, color: "text-orange-400" },
];

const CIRCUIT_BREAKERS = [
  { name: "Escrow Contract", status: "Operational", detail: "All escrow functions responding normally" },
  { name: "Beneficiary Registry", status: "Operational", detail: "Registration & lookup endpoints nominal" },
  { name: "Fraud Challenge System", status: "Operational", detail: "Challenge submission open · 0 active holds" },
  { name: "Oracle Network", status: "Operational", detail: "3/3 price oracles synced · Lag: 4.2s" },
  { name: "Multi-Sig Threshold", status: "Operational", detail: "2-of-3 signers active for disbursement queue" },
];

export default function IntegrityPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-12">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">Fraud Challenge System</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] mb-6", isDark ? "text-white" : "text-stone-900")}>
              Protocol<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Integrity</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-stone-400" : "text-stone-600")}>
              ReliefFlow&apos;s Fraud Challenge system is a decentralized auditing layer. Any staked monitor can challenge any disbursement transaction within 72 hours of settlement.
            </p>
          </motion.div>

          {/* How it works */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className={cn("p-7 rounded-2xl border mb-12", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mb-3">Mechanism</p>
            <h2 className={cn("text-xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-stone-900")}>How Fraud Challenges Work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Lock, step: "01", title: "Stake to Monitor", desc: "Monitors stake 100 XLM to join the auditing pool. Stake is returned in full for valid challenges; slashed for repeated false positives." },
                { icon: AlertTriangle, step: "02", title: "File Challenge", desc: "A monitor who suspects fraud submits the transaction hash and evidence. The disbursement is automatically frozen pending review." },
                { icon: Zap, step: "03", title: "Resolution", desc: "A 3-member arbiter panel reviews within 72 hours. If upheld: funds returned, monitor rewarded 5% of challenged amount. If dismissed: stake partially slashed." },
              ].map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", isDark ? "bg-amber-500/10" : "bg-amber-50")}>
                    <s.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-stone-500 mb-1">Step {s.step}</div>
                    <h3 className={cn("font-black uppercase text-sm tracking-wide mb-1.5", isDark ? "text-white" : "text-stone-900")}>{s.title}</h3>
                    <p className={cn("text-xs leading-relaxed", isDark ? "text-stone-400" : "text-stone-600")}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Audit Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {AUDIT_STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={cn("p-5 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
                <s.icon className={cn("w-5 h-5 mb-3", s.color)} />
                <div className={cn("text-3xl font-black tracking-tight mb-1", isDark ? "text-white" : "text-stone-900")}>{s.value}</div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Challenge Table */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className={cn("rounded-2xl border overflow-x-auto mb-14", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
            <div className={cn("px-5 py-4 border-b flex items-center justify-between", isDark ? "border-stone-800" : "border-amber-100")}>
              <p className={cn("text-xs font-black uppercase tracking-widest", isDark ? "text-white" : "text-stone-900")}>Challenge Registry</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">System Operational</p>
              </div>
            </div>
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className={cn("border-b text-[9px] font-black uppercase tracking-widest", isDark ? "border-stone-800 text-stone-600" : "border-amber-100 text-stone-400")}>
                  <th className="text-left px-5 py-3">ID</th>
                  <th className="text-left px-5 py-3">TX Hash</th>
                  <th className="text-left px-5 py-3">Filed</th>
                  <th className="text-left px-5 py-3">Challenger</th>
                  <th className="text-left px-5 py-3">Amount</th>
                  <th className="text-left px-5 py-3">Resolution</th>
                  <th className="text-right px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {CHALLENGES.map((c, i) => (
                  <motion.tr key={c.id}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className={cn("border-b text-xs transition-colors", isDark ? "border-stone-800/50 hover:bg-stone-800/40" : "border-amber-100/50 hover:bg-amber-50/60", i === CHALLENGES.length - 1 ? "border-b-0" : "")}>
                    <td className={cn("px-5 py-3.5 font-black font-mono text-[10px]", isDark ? "text-amber-400" : "text-amber-600")}>{c.id}</td>
                    <td className="px-5 py-3.5 font-mono text-[10px] text-stone-500">{c.txHash}</td>
                    <td className={cn("px-5 py-3.5 font-mono text-[10px]", isDark ? "text-stone-400" : "text-stone-500")}>{c.filed}</td>
                    <td className="px-5 py-3.5 font-mono text-[10px] text-amber-500">{c.challenger}…</td>
                    <td className={cn("px-5 py-3.5 font-black", isDark ? "text-white" : "text-stone-900")}>{c.amount}</td>
                    <td className={cn("px-5 py-3.5 font-mono text-[10px]", isDark ? "text-stone-500" : "text-stone-400")}>{c.resolution}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border", STATUS_STYLES[c.status])}>{c.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Circuit Breaker + Become a Monitor side by side */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Circuit Breaker */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={cn("p-7 rounded-2xl border", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mb-1">Health Check</p>
                  <h2 className={cn("text-lg font-black uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>Circuit Breaker Status</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">All Systems Go</span>
                </div>
              </div>
              <div className="space-y-3">
                {CIRCUIT_BREAKERS.map((cb, i) => (
                  <motion.div key={cb.name} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className={cn("flex items-start gap-3 p-3.5 rounded-xl border", isDark ? "bg-stone-800/50 border-stone-700/50" : "bg-amber-50/50 border-amber-100")}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-black", isDark ? "text-white" : "text-stone-900")}>{cb.name}</p>
                      <p className={cn("text-[10px]", isDark ? "text-stone-500" : "text-stone-400")}>{cb.detail}</p>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest shrink-0">{cb.status}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Become a Monitor */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className={cn("p-7 rounded-2xl border relative overflow-hidden", isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200")}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-rose-500/5" />
              <div className="relative z-10">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5", isDark ? "bg-amber-500/10" : "bg-amber-50")}>
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mb-2">Join the Network</p>
                <h2 className={cn("text-xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-stone-900")}>Become a Monitor</h2>
                <p className={cn("text-sm leading-relaxed mb-6", isDark ? "text-stone-400" : "text-stone-600")}>
                  Community monitors are the last line of defense against fraud. By staking 100 XLM, you earn the right to audit disbursements and earn 5% of any successfully upheld challenge amount.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Coins, text: "Stake 100 XLM to activate monitor status" },
                    { icon: Eye, text: "Access real-time disbursement feeds via API" },
                    { icon: Activity, text: "File challenges directly from the dashboard" },
                    { icon: GitBranch, text: "Earn rewards for valid fraud detection" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className={cn("text-xs", isDark ? "text-stone-400" : "text-stone-600")}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20 hover:opacity-90 transition-all">
                  Register as Monitor
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
