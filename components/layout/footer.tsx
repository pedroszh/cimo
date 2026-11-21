import { Mail } from "lucide-react";
import Link from "next/link";
import { CimoLogo } from "@/components/ui/brand";
import { links, nav, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  const social = site.social.filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#0a1622]">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 pb-12 pt-16 md:grid-cols-12 md:pt-20">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-5">
          <CimoLogo className="h-8 text-fg" />
          <p className="max-w-sm text-[15px] leading-relaxed text-muted">
            A CIMO cria tecnologia que transforma números soltos em respostas claras. {site.product}: o dinheiro da casa e do carro no mesmo lugar.
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-line-strong px-4 py-2.5 text-[15px] font-medium text-fg transition hover:border-accent/60 hover:text-accent"
          >
            <Mail className="size-4" /> {site.contact.email}
          </a>
        </div>

        <FooterCol title="Navegação" className="md:col-start-7">
          {nav.map((n) => (
            <FooterLink key={n.id} href={`#${n.id}`}>
              {n.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Vértice">
          <FooterLink href={links.createAccount}>Criar conta</FooterLink>
          <FooterLink href={links.login}>Entrar</FooterLink>
          <FooterLink href="#calculadora">Calculadora do dia</FooterLink>
        </FooterCol>

        <FooterCol title="Contato e redes">
          <FooterLink href={`mailto:${site.contact.email}`}>E-mail</FooterLink>
          {social.map((s) => (
            <FooterLink key={s.label} href={s.href} external>
              {s.label}
            </FooterLink>
          ))}
          {site.legal.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} {site.name}. Todos os direitos reservados.</span>
        <span>
          {site.product} by {site.name} · cimo.tec.br
        </span>
      </div>

      {/* Logotipo monumental */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="container-x">
          <CimoLogo mono className="h-auto w-full translate-y-[22%] text-cream/[0.06]" title="" />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 md:col-span-2 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{title}</p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="text-[15px] text-muted transition-colors hover:text-fg"
      >
        {children}
      </Link>
    </li>
  );
}
