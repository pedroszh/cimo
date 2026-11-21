"use client";

import { CimoSymbol } from "@/components/ui/brand";
import { ButtonLink, Reveal } from "@/components/ui/primitives";
import { finalCta, links } from "@/lib/content";

/** Encerramento centralizado com o brilho âmbar subindo do rodapé (como na referência). */
export function FinalCta() {
  return (
    <section id="comecar" className="relative isolate overflow-hidden border-t border-line py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute bottom-[-26rem] left-1/2 -z-10 h-[44rem] w-[70rem] max-w-[220vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--cimo-accent)_26%,transparent),transparent)]" />

      <div className="container-x flex flex-col items-center text-center">
        <Reveal>
          <CimoSymbol className="size-12 text-fg" />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-8 text-[2.75rem] font-bold leading-[1] tracking-[-0.05em] sm:text-6xl md:text-[5rem]">
            {finalCta.title}
            <br />
            <span className="text-accent">{finalCta.titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-muted">{finalCta.lead}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href={links.createAccount}>Criar conta</ButtonLink>
            <ButtonLink href={links.login} variant="ghost" icon={false}>
              Entrar
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
