import Image from "next/image";
import { cn } from "@/lib/utils";

/** Moldura de celular para os prints mobile do app (780×1688). */
export function PhoneFrame({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 60vw, 260px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[780/1688] w-full rounded-[2.4rem] border border-line-strong bg-[#08121d] p-[3.2%] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.85),inset_0_0_0_1px_rgb(255_255_255/0.04)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-bg">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" priority={priority} />
      </div>
      <span aria-hidden className="absolute left-1/2 top-[1.6%] h-[1.6%] w-[26%] -translate-x-1/2 rounded-full bg-black/80" />
    </div>
  );
}

/** Janela de navegador para os prints desktop do app (2560×1600). */
export function BrowserFrame({
  src,
  alt,
  className,
  priority,
  url = "vertice.cimo.tech.br",
  sizes = "(max-width: 1024px) 100vw, 1100px",
}: {
  sizes?: string;
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  url?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line-strong bg-[#0a1724] shadow-[0_50px_120px_-40px_rgb(0_0_0/0.9)]", className)}>
      <div className="flex h-9 items-center gap-3 border-b border-line px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-cream/15" />
          <span className="size-2.5 rounded-full bg-cream/15" />
          <span className="size-2.5 rounded-full bg-cream/15" />
        </div>
        <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center rounded-md border border-line bg-white/[0.03] px-3 text-[11px] text-subtle">
          <span className="truncate">{url}</span>
        </div>
        <span className="w-10" />
      </div>
      <div className="relative aspect-[2560/1600] w-full">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}
