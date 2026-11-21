import { cn } from "@/lib/utils";

/**
 * Logotipo oficial da CIMO, redesenhado em SVG a partir dos arquivos enviados
 * (public/brand/*.png). O "M" em forma de montanha com o ponto âmbar é o símbolo.
 * `currentColor` define a cor das letras (creme no fundo escuro, marinho no claro).
 */
export function CimoLogo({ className, title = "CIMO", mono }: { className?: string; title?: string; mono?: boolean }) {
  return (
    <svg viewBox="160 76 880 264" className={cn("aspect-[880/264] h-6 w-auto", className)} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true}>
      <g fill="none" stroke="currentColor" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
        {/* C */}
        <path d="M325 176.6 A80.5 80.5 0 1 0 325 289.4" />
        {/* I */}
        <path d="M417.5 153 V313" />
        {/* M — montanhas */}
        <path d="M501 313 L573 185 L625 262 L697 153 L767 313" />
        {/* O */}
        <circle cx="930.5" cy="233" r="80.5" />
      </g>
      <circle cx="695.5" cy="97.5" r="16" fill={mono ? "currentColor" : "var(--cimo-accent)"} />
    </svg>
  );
}

/** Símbolo da marca: o "M" de montanhas com o sol âmbar. */
export function CimoSymbol({ className, title, mono }: { className?: string; title?: string; mono?: boolean }) {
  return (
    <svg
      viewBox="130 170 540 460"
      className={cn("size-8", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M178 575 L299 358 L380 489 L499 307 L622 575"
        fill="none"
        stroke="currentColor"
        strokeWidth="58"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="500.5" cy="216.5" r="27" fill={mono ? "currentColor" : "var(--cimo-accent)"} />
    </svg>
  );
}

/** Ícone do app (símbolo em um quadrado arredondado), como no cabeçalho do Vértice. */
export function VerticeAppIcon({ className }: { className?: string }) {
  return (
    <span className={cn("grid size-9 place-items-center rounded-xl border border-line-strong bg-surface text-fg", className)}>
      <CimoSymbol className="size-5" />
    </span>
  );
}
