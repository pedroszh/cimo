import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CimoLogo } from "@/components/ui/brand";
import { site } from "@/lib/content";

/**
 * Página legal provisória. O texto definitivo está em revisão jurídica —
 * substitua o conteúdo de `children` quando ele for aprovado.
 */
export function LegalPage({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <div className="container-x max-w-3xl py-10 md:py-16">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Voltar para o início">
            <CimoLogo className="h-7 text-fg" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-medium text-muted hover:text-fg">
            <ArrowLeft className="size-4" /> Voltar
          </Link>
        </div>
        <h1 className="mt-16 text-4xl font-bold tracking-[-0.04em] md:text-6xl">{title}</h1>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-muted">
          {children ?? (
            <>
              <p className="rounded-2xl border border-accent/40 bg-accent/[0.08] p-5 text-fg">
                Este documento está em revisão jurídica e será publicado em breve.
              </p>
              <p>
                Em caso de dúvidas, fale com a {site.name} pelo e-mail{" "}
                <a className="font-semibold text-accent underline-offset-4 hover:underline" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
