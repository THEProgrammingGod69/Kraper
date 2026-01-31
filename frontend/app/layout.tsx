import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Hydra VR - Kraft Your World",
  description: "AI-powered academic research paper generation platform",
};

import { AuthProvider } from "@/lib/context/AuthContext";

import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} font-sans antialiased bg-hydra-bg text-white selection:bg-hydra-lavender selection:text-hydra-bg`}>
        <AuthProvider>
          <Navbar />
          <div className="pt-24 min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
