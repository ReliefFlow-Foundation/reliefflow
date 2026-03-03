import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "ReliefFlow — Humanitarian Aid on Stellar Soroban",
    template: "%s | ReliefFlow",
  },
  description: "ReliefFlow eliminates disbursement leakage in humanitarian aid. Every dollar is cryptographically traceable from donor to beneficiary on Stellar Mainnet.",
  keywords: ["humanitarian aid", "blockchain", "Stellar", "Soroban", "NGO", "disbursement", "transparency"],
  openGraph: {
    title: "ReliefFlow — Aid That Actually Arrives",
    description: "Cryptographically traceable humanitarian aid disbursement on Stellar Soroban. Zero leakage. 97.3% efficiency.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReliefFlow — Humanitarian Aid on Stellar Soroban",
    description: "Zero leakage. Every dollar traceable. Dignity-preserving identity. Aid that actually arrives.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
