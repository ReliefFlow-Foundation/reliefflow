"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Heart, Shield, Globe, Users, ArrowRight, Moon, Sun, Wallet, X,
  ChevronRight, AlertCircle, Zap, Lock, MapPin, HandHeart,
  CheckCircle2, Eye, GitBranch, Activity, Building2, Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    freighter?: {
      isConnected: () => Promise<boolean>;
      getAddress: () => Promise<{ address: string } | { error: string }>;
      getNetwork: () => Promise<{ network: string; networkPassphrase: string } | { error: string }>;
      requestAccess: () => Promise<{ address: string } | { error: string }>;
    };
  }
}

const MAINNET_PASSPHRASE = "Public Global Stellar Network ; September 2015";

function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!window.freighter) {
        window.open("https://freighter.app", "_blank");
        setError("Freighter not found. Install it to continue.");
        return;
      }
      const result = await window.freighter.requestAccess();
      if ("error" in result) throw new Error(result.error);
      const net = await window.freighter.getNetwork();
      if ("error" in net) throw new Error(net.error);
      if (net.networkPassphrase !== MAINNET_PASSPHRASE) {
        setError("Switch to Stellar Mainnet in Freighter settings.");
        return;
      }
      setAddress(result.address);
    } catch (err: any) {
      setError(err.message || "Connection failed.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => setAddress(null);
  return { address, isConnecting, error, connect, disconnect };
}

const ThemeToggle = ({ isDark }: { isDark: boolean }) => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" />;
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
        isDark ? "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20" : "bg-amber-50 border-amber-200 hover:bg-amber-100"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Sun className="w-4 h-4 text-amber-400" />
          </motion.span>
        ) : (
          <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Moon className="w-4 h-4 text-amber-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

const WalletModal = ({ isOpen, onClose, wallet }: {
  isOpen: boolean; onClose: () => void; wallet: ReturnType<typeof useWallet>;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-stone-950/80 backdrop-blur-xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-sm bg-stone-900 border border-stone-800 rounded-2xl p-7 shadow-2xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-t-2xl" />
          <div className="flex items-center justify-between mb-7">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Connect Wallet</h3>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.3em] mt-1">Stellar · Mainnet Only</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors">
              <X className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {wallet.error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-300">{wallet.error}</p>
            </div>
          )}

          {wallet.address ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">Connected · Mainnet</p>
                </div>
                <p className="font-mono text-xs text-white break-all leading-relaxed">{wallet.address}</p>
              </div>
              <button
                onClick={() => { wallet.disconnect(); onClose(); }}
                className="w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={wallet.connect}
              disabled={wallet.isConnecting}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/30 transition-all text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                <Wallet className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="font-black text-white uppercase text-sm tracking-wide">Freighter</p>
                <p className="text-[10px] text-stone-500 mt-0.5">Official Stellar Extension</p>
              </div>
              {wallet.isConnecting
                ? <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                : <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-amber-400 transition-colors" />
              }
            </button>
          )}
          <p className="text-center text-[10px] text-stone-700 mt-5 uppercase tracking-widest">Soroban · ReliefFlow Foundation</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const STATS = [
  { label: "Aid Disbursed", value: "$8.4M", icon: HandHeart, color: "text-amber-400" },
  { label: "Active Missions", value: "84", icon: MapPin, color: "text-rose-400" },
  { label: "Beneficiaries", value: "142K", icon: Users, color: "text-orange-400" },
  { label: "Zero Leakage", value: "100%", icon: Shield, color: "text-amber-300" },
];

const PILLARS = [
  {
    icon: Building2, title: "Aid Escrow", tag: "contracts/aid-escrow",
    desc: "A sovereign vault for humanitarian capital. Supports multi-signature consensus across verified NGO consortiums. Funds are locked until disbursement conditions are met—not a moment before.",
    accent: "amber",
  },
  {
    icon: Fingerprint, title: "Beneficiary Registry", tag: "contracts/beneficiary-registry",
    desc: "Privacy-first identity layer using hashed identifiers. Aid eligibility is managed without ever storing PII on a public ledger—protecting dignity while enabling verifiable targeting.",
    accent: "rose",
  },
  {
    icon: Eye, title: "Fraud Challenge", tag: "contracts/fraud-challenge",
    desc: "A decentralized auditing mechanism allowing authorized monitors and community members to challenge suspicious transactions in real time, with automatic flow suspension pending review.",
    accent: "orange",
  },
];

const PIPELINE = [
  { n: "01", title: "Campaign Created", desc: "An NGO creates a verified relief project on-chain. Funding goals, beneficiary criteria, and disbursement rules are encoded in the Aid Escrow contract." },
  { n: "02", title: "Global Donors Fund", desc: "Donors worldwide contribute via Stellar assets. Every dollar is traceable, locked in escrow, and visible to the public in real time." },
  { n: "03", title: "Beneficiaries Verified", desc: "Field partners register beneficiaries using the privacy-preserving registry. No PII stored on-chain—dignity is non-negotiable." },
  { n: "04", title: "Direct Disbursement", desc: "Funds flow directly to beneficiaries' Stellar wallets the moment conditions are verified. No intermediaries. Zero leakage." },
];

export default function ReliefFlowPage() {
  const [walletOpen, setWalletOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wallet = useWallet();
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme !== "light";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      isDark ? "bg-stone-950 text-stone-100" : "bg-amber-50 text-stone-900"
    )}>
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={cn("absolute inset-0", isDark ? "bg-stone-950" : "bg-amber-50/80")} />
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-amber-600" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 bg-rose-600" />
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.08),rgba(255,255,255,0))]"
            : "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))]"
        )} />
      </div>

      <WalletModal isOpen={walletOpen} onClose={() => setWalletOpen(false)} wallet={wallet} />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className={cn(
          "mx-4 mt-4 flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl",
          isDark ? "bg-stone-950/70 border-stone-800" : "bg-white/80 border-amber-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className={cn("font-black text-lg uppercase tracking-tight leading-none block", isDark ? "text-white" : "text-stone-900")}>ReliefFlow</span>
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.4em]">Soroban · Mainnet</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Programs", href: "/programs" },
              { label: "Disbursement", href: "/disbursement" },
              { label: "Beneficiaries", href: "/beneficiaries" },
              { label: "Impact", href: "/impact" },
              { label: "Integrity", href: "/integrity" },
              { label: "Roadmap", href: "/roadmap" },
            ].map(({ label, href }) => (
              <a key={href} href={href}
                className={cn("text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-amber-500",
                  isDark ? "text-stone-500" : "text-stone-500")}
              >{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle isDark={isDark} />
            {wallet.address ? (
              <button
                onClick={() => setWalletOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono">{wallet.address.slice(0, 4)}…{wallet.address.slice(-4)}</span>
              </button>
            ) : (
              <button
                onClick={() => setWalletOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20 hover:opacity-90 transition-all"
              >
                <Wallet className="w-3.5 h-3.5" /> Connect
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="mission" className="relative pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-8",
                isDark ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" : "bg-amber-100 border border-amber-300 text-amber-700"
              )}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Humanitarian Aid · Zero Leakage
              </div>

              <h1 className={cn(
                "text-[4rem] md:text-[6rem] font-black leading-[0.85] tracking-[-0.04em] uppercase mb-8",
                isDark ? "text-white" : "text-stone-900"
              )}>
                Aid That<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                  Actually
                </span>
                <br />Arrives.
              </h1>

              <p className={cn(
                "text-base md:text-lg leading-relaxed mb-10",
                isDark ? "text-stone-400" : "text-stone-600"
              )}>
                ReliefFlow eliminates disbursement leakage—the silent drain of aid funds to intermediaries and corruption. Every dollar is cryptographically traceable from donor to beneficiary.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setWalletOpen(true)}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xl shadow-amber-500/20 hover:opacity-90 transition-all"
                >
                  Launch Dashboard <ArrowRight className="w-4 h-4" />
                </button>
                <a href="#pipeline" className={cn(
                  "flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm border transition-all",
                  isDark ? "border-stone-700 text-stone-400 hover:border-amber-500/30 hover:text-white" : "border-amber-200 text-stone-600 hover:border-amber-400"
                )}>
                  View Pipeline
                </a>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className={cn(
                "rounded-3xl p-8 border relative overflow-hidden",
                isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200"
              )}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[60px]" />
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-6">Live Aid Flow</div>
                {[
                  { from: "UNICEF Germany", to: "Beneficiary #8821", amount: "€420", status: "settled" },
                  { from: "OpenAid DAO", to: "Beneficiary #1104", amount: "$850", status: "settled" },
                  { from: "Anonymous", to: "Beneficiary #9903", amount: "USDC 120", status: "pending" },
                  { from: "Red Cross CH", to: "Beneficiary #5502", amount: "€2,100", status: "settled" },
                ].map((tx, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between p-3 rounded-xl mb-2 border",
                    isDark ? "bg-stone-800 border-stone-700" : "bg-stone-50 border-stone-200"
                  )}>
                    <div>
                      <p className="text-[10px] font-mono text-stone-500">{tx.from}</p>
                      <p className={cn("text-xs font-bold", isDark ? "text-white" : "text-stone-900")}>{tx.to}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-amber-400">{tx.amount}</p>
                      <p className={cn("text-[9px] font-bold uppercase tracking-wider",
                        tx.status === "settled" ? "text-emerald-500" : "text-amber-500"
                      )}>{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-5 rounded-2xl border transition-all",
                isDark ? "bg-stone-900 border-stone-800 hover:border-amber-500/30" : "bg-white border-amber-200 hover:border-amber-300"
              )}
            >
              <s.icon className={cn("w-5 h-5 mb-3", s.color)} />
              <div className={cn("text-3xl font-black tracking-tight mb-1", isDark ? "text-white" : "text-stone-900")}>{s.value}</div>
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROTOCOL */}
      <section id="protocol" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">Protocol</p>
            <h2 className={cn("text-4xl md:text-5xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>
              Three Contracts.<br />
              <span className="text-amber-400">Total Transparency.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={cn(
                  "p-7 rounded-2xl border transition-all hover:shadow-xl",
                  isDark
                    ? "bg-stone-900 border-stone-800 hover:border-amber-500/30"
                    : "bg-white border-amber-200 hover:border-amber-300"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                  isDark ? "bg-amber-500/10" : "bg-amber-50"
                )}>
                  <p.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-[9px] font-mono text-stone-500 mb-2 tracking-wider">{p.tag}</div>
                <h3 className={cn("text-xl font-black uppercase tracking-tight mb-3", isDark ? "text-white" : "text-stone-900")}>{p.title}</h3>
                <p className={cn("text-sm leading-relaxed", isDark ? "text-stone-400" : "text-stone-600")}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section id="pipeline" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4">Aid Pipeline</p>
            <h2 className={cn("text-4xl md:text-5xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>
              From Donor to<br />
              <span className="text-amber-400">Beneficiary.</span>
            </h2>
          </div>

          <div className="space-y-6">
            {PIPELINE.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "flex gap-6 p-6 rounded-2xl border transition-all",
                  isDark ? "bg-stone-900 border-stone-800 hover:border-amber-500/20" : "bg-white border-amber-200"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-amber-400 font-mono">{step.n}</span>
                </div>
                <div>
                  <h3 className={cn("font-black uppercase text-sm tracking-wide mb-1.5", isDark ? "text-white" : "text-stone-900")}>{step.title}</h3>
                  <p className={cn("text-sm leading-relaxed", isDark ? "text-stone-400" : "text-stone-600")}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contribute" className="px-6 py-20">
        <div className={cn(
          "max-w-4xl mx-auto rounded-3xl p-12 md:p-16 border text-center relative overflow-hidden",
          isDark ? "bg-stone-900 border-stone-800" : "bg-white border-amber-200"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-rose-500/5 to-transparent" />
          <div className="relative z-10">
            <h2 className={cn("text-4xl md:text-6xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-stone-900")}>
              Aid Is<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                Not Optional.
              </span>
            </h2>
            <p className={cn("text-base md:text-lg mb-10 max-w-xl mx-auto", isDark ? "text-stone-400" : "text-stone-600")}>
              ReliefFlow is open-source infrastructure for the humanitarian sector. Join hundreds of contributors building the protocol that will reach millions in crisis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setWalletOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xl shadow-amber-500/20 hover:opacity-90 transition-all"
              >
                <Wallet className="w-4 h-4" /> Connect & Donate
              </button>
              <a href="https://github.com/ReliefFlow-Foundation/ReliefFlow" target="_blank" rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm border transition-all",
                  isDark ? "border-stone-700 text-stone-400 hover:border-amber-500/30 hover:text-white" : "border-amber-200 text-stone-600 hover:border-amber-400"
                )}
              >
                <GitBranch className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={cn("border-t px-6 py-12", isDark ? "border-stone-800" : "border-amber-200")}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className={cn("font-black text-base uppercase tracking-tight", isDark ? "text-white" : "text-stone-900")}>ReliefFlow</span>
              <span className={cn("text-[10px] block uppercase tracking-widest", isDark ? "text-stone-600" : "text-stone-500")}>Humanitarian Aid Infrastructure</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {["GitHub", "Twitter", "Discord", "Docs"].map(l => (
              <a key={l} href="#" className={cn("text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-amber-500", isDark ? "text-stone-500" : "text-stone-500")}>{l}</a>
            ))}
          </div>
          <p className="text-[10px] text-stone-600 uppercase tracking-widest">© 2026 ReliefFlow Foundation · MIT</p>
        </div>
      </footer>
    </div>
  );
}
