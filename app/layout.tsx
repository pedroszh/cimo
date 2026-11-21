import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/layout/motion-provider";
import { site } from "@/lib/content";
import "./globals.css";

// Fonte variável: um único arquivo cobre todos os pesos (300–700).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.product} by ${site.name} — Saiba quanto sobra no fim do dia`,
  description: site.description,
  openGraph: {
    title: `${site.product} · ${site.name}`,
    description: site.description,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1B2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
