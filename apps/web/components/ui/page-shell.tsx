"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Heart, Moon, Sun, Wallet, X, ChevronRight, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
        isDark
          ? "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20"
          : "bg-amber-50 border-amber-200 hover:bg-amber-100"
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

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Disbursement", href: "/disbursement" },
  { label: "Beneficiaries", href: "/beneficiaries" },
  { label: "Impact", href: "/impact" },
  { label: "Integrity", href: "/integrity" },
  { label: "Roadmap", href: "/roadmap" },
];

export function PageShell({ children }: { children: React.ReactNode }) {
  const [walletOpen, setWalletOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wallet = useWallet();
  const { theme } = useTheme();
  const pathname = usePathname();

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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className={cn("font-black text-lg uppercase tracking-tight leading-none block", isDark ? "text-white" : "text-stone-900")}>ReliefFlow</span>
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.4em]">Soroban · Mainnet</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-amber-500",
                    isActive ? "text-amber-500" : isDark ? "text-stone-500" : "text-stone-500"
                  )}
                >
                  {label}
                </Link>
              );
            })}
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
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
                isDark ? "bg-stone-800 border-stone-700" : "bg-amber-50 border-amber-200"
              )}
            >
              <div className="space-y-1.5">
                <span className={cn("block h-0.5 w-5 transition-all", isDark ? "bg-stone-400" : "bg-stone-600")} />
                <span className={cn("block h-0.5 w-5 transition-all", isDark ? "bg-stone-400" : "bg-stone-600")} />
                <span className={cn("block h-0.5 w-3 transition-all", isDark ? "bg-stone-400" : "bg-stone-600")} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={cn(
                "mx-4 mt-2 rounded-2xl border backdrop-blur-xl p-4 lg:hidden",
                isDark ? "bg-stone-950/90 border-stone-800" : "bg-white/90 border-amber-200"
              )}
            >
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block py-2.5 px-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-colors",
                      isActive
                        ? "text-amber-500 bg-amber-500/10"
                        : isDark ? "text-stone-400 hover:text-amber-500" : "text-stone-500 hover:text-amber-600"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-28">
        {children}
      </main>

      {/* FOOTER */}
      <footer className={cn("border-t px-6 py-12 mt-20", isDark ? "border-stone-800" : "border-amber-200")}>
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
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={cn("text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-amber-500", isDark ? "text-stone-500" : "text-stone-500")}>
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-[10px] text-stone-600 uppercase tracking-widest">© 2026 ReliefFlow Foundation · MIT</p>
        </div>
      </footer>
    </div>
  );
}
