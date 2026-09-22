import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeoField Bio-Logistics | National UCO Traceability & Clean Bio-Energy Network",
  description:
    "India's leading national UCO (Used Cooking Oil) traceability and clean bio-energy platform. Converting restaurant UCO into FSSAI-compliant revenue and closed-loop biofuel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-cream font-sans text-nearblack antialiased selection:bg-amber selection:text-cream">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
