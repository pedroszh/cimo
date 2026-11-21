# CIMO — Website institucional + Vértice

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide.

## Executar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # produção
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Cores oficiais (marinho, creme, âmbar) | `app/globals.css` → variáveis `--cimo-*` |
| Fonte (Space Grotesk) | `app/layout.tsx` |
| Textos, navegação, perfis, recursos, contato, redes | `lib/content.ts` |
| Endereço do app (botões Criar conta / Entrar) | `APP_URL` em `lib/content.ts` |
| Instagram e TikTok | `site.social` em `lib/content.ts` (itens sem link não aparecem) |
| Contas da calculadora | `lib/day-calc.ts` |
| Logo e símbolo (SVG) | `components/ui/brand.tsx` · originais em `public/brand/` |
| Prints do app | `public/app/` (mobile, desktop, recortes) |
| Termos e privacidade | `app/termos`, `app/privacidade` (texto em revisão jurídica) |

## Estrutura

```
app/                 layout, página, estilos globais, API de contato
components/layout/   navbar, footer, provider de motion
components/sections/ hero, sobre, vértice, recursos, inteligência, experiência, diferenciais, CTA
components/product/  dashboard demonstrativo e gráficos SVG
components/features/ ilustrações dos cards de recursos (registro `visuals`)
components/ui/       primitivas (Reveal, Eyebrow, botões, números animados, marca)
lib/                 conteúdo, motor de cálculo demo, utilitários
```

### Adicionar um recurso
Inclua um item em `features` (`lib/content.ts`) escolhendo um `visual` existente,
ou crie uma nova ilustração em `components/features/visuals.tsx` e registre-a em `visuals`.
O grid tem 3 colunas: mantenha a soma dos `span` de cada linha igual a 3.

## Acessibilidade e motion
Todas as animações respeitam `prefers-reduced-motion` (Framer `MotionConfig` + CSS).
