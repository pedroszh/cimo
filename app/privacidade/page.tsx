import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Política de privacidade — Vértice by CIMO" };

export default function PrivacidadePage() {
  return <LegalPage title="Política de privacidade" />;
}
