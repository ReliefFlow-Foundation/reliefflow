"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CheckCircle2, Circle, Clock, Star, GitBranch, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

const PHASES = [
  {
    quarter: "Q2 2026",
    title: "Foundation",
    status: "completed",
    description: "Core protocol infrastructure, security audits, and initial field deployments.",
    milestones: [
      { text: "Aid Escrow smart contract deployed on Stellar Mainnet", done: true },
      { text: "Beneficiary Registry with ZK-hash privacy layer completed", done: true },
      { text: "Fraud Challenge system live with 14 founding monitors", done: true },
      { text: "Initial field deployment: Sudan & Somalia with UNICEF & MSF", done: true },
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Field Deployment",
    status: "in-progress",
    description: "Scaling operations to 12 countries, onboarding 8 major NGO partners.",
    milestones: [
      { text: "Mobile SDK for field partner beneficiary registration (iOS/Android)", done: true },
      { text: "Automated eligibility verification with off-chain oracle network", done: true },
      { text: "Multi-currency support: USDC, XLM, EURC on Stellar", done: false },
      { text: "NGO dashboard v2 with real-time disbursement analytics", done: false },
    ],
  },
  {
    quarter: "Q4 2026",
    title: "Scale",
    status: "upcoming",
    description: "Decentralized governance, expanded monitor network, and ecosystem grants.",
    milestones: [
      { text: "ReliefFlow DAO governance token launch on Stellar", done: false },
      { text: "Expand to 30+ countries with 20 certified NGO partners", done: false },
      { text: "Open grant program: $500K for humanitarian tech integrations", done: false },
      { text: "Cross-chain bridge for Ethereum / Solana donor wallets", done: false },
    ],
  },
  {
    quarter: "Q1 2027",
    title: "Ecosystem",
    status: "future",
    description: "Full protocol decentralization and self-sustaining ecosystem.",
    milestones: [
      { text: "Full DAO governance: NGO vetting, monitor elections, treasury", done: false },
      { text: "ReliefFlow API marketplace for third-party aid tech integrations", done: false },
      { text: "UN OCHA and World Bank official partnership announcement", done: false },
      { text: "$50M disbursement milestone — reaching 1M+ beneficiaries", done: false },
    ],
  },
];

const STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string; border: string }> = {
  completed:   { label: "Completed",   badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400", border: "border-emerald-500/30" },
  "in-progress": { label: "In Progress", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",     dot: "bg-amber-400 animate-pulse", border: "border-amber-500/30" },
  upcoming:    { label: "Upcoming",     badge: "bg-stone-500/10 text-stone-400 border-stone-500/30",       dot: "bg-stone-600",   border: "border-stone-700" },
  future:      { label: "Future",       badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",          dot: "bg-rose-400/50", border: "border-stone-800" },
};

const ISSUES = [
  { id: "#142", title: "Implement XCM bridge for Polkadot donor wallets", label: "enhancement", difficulty: "Advanced" },
  { id: "#138", title: "Build SMS fallback disbursement notification system", label: "feature", difficulty: "Intermediate" },
  { id: "#131", title: "Add Arabic & Somali i18n to field partner mobile app", label: "i18n", difficulty: "Beginner" },
  { id: "#127", title: "Improve fraud challenge UX — inline evidence upload flow", label: "UX", difficulty: "Intermediate" },
  { id: "#119", title: "Write integration tests for Beneficiary Registry contract", label: "testing", difficulty: "Beginner" },
];

const DIFFICULTY_STYLES: Record<string, string> = {
  "Beginner": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Intermediate": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Advanced": "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export default function RoadmapPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-12">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">Protocol Development</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] mb-6", isDark ? "text-white" : "text-stone-900")}>
              Protocol<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Roadmap</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-stone-400" : "text-stone-600")}>
              ReliefFlow&apos;s development is fully public. Every milestone, every commit, every decision — open source and community-governed.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative mb-20">
            {/* Vertical line */}
            <div className={cn("absolute left-6 top-0 bottom-0 w-px", isDark ? "bg-stone-800" : "bg-amber-200")} />

            <div className="space-y-0">
              {PHASES.map((phase, i) => {
                const cfg = STATUS_CONFIG[phase.status];
                return (
                  <motion.div
                    key={phase.quarter}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-16 pb-12"
                  >
                    {/* Phase dot */}
                    <div className={cn("absolute left-4 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      isDark ? "bg-stone-950" : "bg-amber-50",
                      phase.status === "completed" ? "border-emerald-500" : phase.status === "in-progress" ? "border-amber-500" : isDark ? "border-stone-700" : "border-amber-300")}>
                      <div className={cn("w-2.5 h-2.5 rounded-full", cfg.dot)} />
                    </div>

                    {/* Phase card */}
                    <div className={cn("p-7 rounded-2xl border transition-all", isDark ? "bg-stone-900 border-stone-800 hover:border-amber-500/20" : "bg-white border-amber-200")}>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono text-stone-500">{phase.quarter}</span>
                            <span className={cn("px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border", cfg.badge)}>{cfg.label}</span>
                          </div>
                          <h2 className={cn("text-2xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>{phase.title}</h2>
                          <p className={cn("text-sm mt-1.5", isDark ? "text-stone-400" : "text-stone-600")}>{phase.description}</p>
                        </div>
                        {phase.status === "completed" && (
                          <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                        )}
                        {phase.status === "in-progress" && (
                          <Clock className="w-7 h-7 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <div className="space-y-3">
                        {phase.milestones.map((m, j) => (
                          <div key={j} className="flex items-start gap-3">
                            {m.done
                              ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              : <Circle className={cn("w-4 h-4 shrink-0 mt-0.5", isDark ? "text-stone-700" : "text-stone-300")} />
                            }
                            <p className={cn("text-sm", m.done
                              ? (isDark ? "text-stone-300" : "text-stone-700")
                              : (isDark ? "text-stone-600" : "text-stone-400"))}>{m.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Open Issues for Contributors */}
          <div>
            <div className="mb-8">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-2">Open Source</p>
              <h2 className={cn("text-2xl md:text-3xl font-black uppercase tracking-tight mb-3", isDark ? "text-white" : "text-stone-900")}>
                Contribute to ReliefFlow
              </h2>
              <p className={cn("text-sm max-w-xl", isDark ? "text-stone-400" : "text-stone-600")}>
                These GitHub issues are actively seeking contributors. All levels welcome — pick an issue, fork the repo, and join the mission.
              </p>
            </div>

            <div className="space-y-3">
              {ISSUES.map((issue, i) => (
                <motion.a
                  key={issue.id}
                  href="https://github.com/ReliefFlow-Foundation/ReliefFlow/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    "flex items-center justify-between gap-4 p-5 rounded-2xl border transition-all group",
                    isDark ? "bg-stone-900 border-stone-800 hover:border-amber-500/30" : "bg-white border-amber-200 hover:border-amber-400"
                  )}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", isDark ? "bg-amber-500/10" : "bg-amber-50")}>
                      <GitBranch className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-stone-500">{issue.id}</span>
                        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border bg-amber-500/10 text-amber-400 border-amber-500/30")}>{issue.label}</span>
                      </div>
                      <p className={cn("text-sm font-bold truncate", isDark ? "text-white" : "text-stone-900")}>{issue.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={cn("px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border", DIFFICULTY_STYLES[issue.difficulty])}>{issue.difficulty}</span>
                    <ExternalLink className={cn("w-4 h-4 transition-colors", isDark ? "text-stone-600 group-hover:text-amber-400" : "text-stone-300 group-hover:text-amber-500")} />
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 text-center">
              <a href="https://github.com/ReliefFlow-Foundation/ReliefFlow" target="_blank" rel="noopener noreferrer"
                className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm border transition-all",
                  isDark ? "border-stone-700 text-stone-400 hover:border-amber-500/30 hover:text-white" : "border-amber-200 text-stone-600 hover:border-amber-400")}>
                <Star className="w-4 h-4" /> Star us on GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
