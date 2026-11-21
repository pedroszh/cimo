/**
 * CIMO / Vértice — Conteúdo centralizado do site.
 *
 * Todo texto editável está aqui. Itens com `draft: true` ainda aguardam
 * validação da CIMO. Para esconder os selos "Conteúdo provisório",
 */


/** Endereço do app. Os botões "Criar conta" e "Entrar" levam para cá. */
export const APP_URL = "https://vertice.cimo.tec.br";

export const links = {
  createAccount: APP_URL,
  login: APP_URL,
};

export const site = {
  name: "CIMO",
  product: "Vértice",
  tagline: "Controle financeiro",
  description:
    "Vértice, da CIMO: o dinheiro da casa e do carro no mesmo lugar. Para motoristas de aplicativo e pessoa física saberem quanto sobra no fim do dia.",
  contact: {
    email: "contato@cimo.tec.br",
  },
  /** Redes sociais — preencha o href quando os perfis forem confirmados. Itens sem href não aparecem. */
  social: [
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/cimo_ofical" },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@cimo_oficial" },
  ] as { id: "instagram" | "tiktok"; label: string; href: string }[],
  legal: [
    { label: "Termos de uso", href: "/termos" },
    { label: "Política de privacidade", href: "/privacidade" },
  ],
};

export const nav = [
  { id: "recursos", label: "Recursos" },
  { id: "perfis", label: "Perfis" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "vertice", label: "O Vértice" },
  { id: "calculadora", label: "Calculadora" },
] as const;

export const hero = {
  badge: "Para motoristas de aplicativo e pessoa física",
  title: "O dinheiro da casa e do carro",
  titleAccent: "no mesmo lugar.",
  lead: "Você registra o dia. O Vértice faz as contas e mostra quanto sobrou, quanto falta para a meta e quanto custa cada km rodado.",
  pillars: [
    { k: "Sobrou hoje", v: "o que ficou no bolso" },
    { k: "Meta do dia", v: "quanto ainda falta" },
    { k: "Custo por km", v: "o preço de rodar" },
    { k: "Para onde foi", v: "gastos por categoria" },
  ],
};

/** Seção logo após a hero: a frase da marca + uma tela do app. */
export const productShot = {
  title: "Complexidade entra.",
  titleAccent: "Clareza sai.",
  lead: "Uma tela, as respostas que importam. Sem planilha e sem jargão.",
  image: "/app/cenas/cidade.webp",
  alt: "Vértice no computador e no celular: ganhos de hoje, meta do dia e indicadores do veículo",
};

export const vertice = {
  eyebrow: "Conheça o Vértice",
  title: "Você registra.",
  titleAccent: "O Vértice responde.",
  blocks: [
    {
      q: "O que é",
      a: "Um app de controle financeiro da CIMO, feito para motoristas de aplicativo e para quem quer organizar as finanças pessoais.",
    },
    {
      q: "Para que serve",
      a: "Para saber, todo dia, quanto você ganhou, quanto gastou e quanto realmente sobrou.",
    },
    {
      q: "Qual problema resolve",
      a: "Rodar muito e não ver o dinheiro. Anotações soltas viram um painel claro, com meta, custos e resultado do mês.",
    },
    {
      q: "O que você consegue fazer",
      a: "Registrar o dia, acompanhar a meta, ver custo e lucro por km, controlar contas a pagar e guardar dinheiro para suas metas.",
    },
  ],
  /** Fluxo do diagrama: o que entra, o que sai. */
  inputs: ["Corridas", "Combustível", "Manutenção", "Contas", "Km rodados"],
  outputs: ["Sobrou hoje", "Meta do dia", "Custo por km"],
};

export const howItWorks = {
  eyebrow: "Como funciona",
  title: "Três passos.",
  titleAccent: "Nenhuma planilha.",
  steps: [
    { n: "01", title: "Crie sua conta", text: "Acesse o Vértice pelo navegador do celular ou do computador." },
    { n: "02", title: "Registre o dia", text: "Informe ganhos, gastos, quilômetros e horas trabalhadas." },
    { n: "03", title: "Veja o que sobrou", text: "O Vértice calcula meta, lucro por km e resultado do mês na hora." },
  ],
};

export type ProfileId = "motorista" | "pf";

export const profiles: {
  id: ProfileId;
  label: string;
  title: string;
  titleAccent: string;
  text: string;
  bullets: string[];
  screen: { src: string; alt: string };
  /** Notificações que aparecem ao redor do celular (valores dos prints de demonstração). */
  chips: { label: string; value: string; tone?: "accent" | "signal" }[];
}[] = [
  {
    id: "motorista",
    label: "Motorista",
    title: "Seu dia,",
    titleAccent: "no seu bolso.",
    text: "Feito para quem roda. Veja a meta em tempo real e descubra quanto o carro custa de verdade.",
    bullets: ["Meta do dia e quanto falta", "Ganho por km e por hora", "Lucro e custo por km", "Combustível, manutenção, seguro e IPVA"],
    screen: { src: "/app/mobile/meta-do-dia.png", alt: "Tela do Vértice com a meta do dia do motorista" },
    chips: [
      { label: "Ganhos de hoje", value: "R$ 214,50", tone: "accent" },
      { label: "Lucro por km", value: "R$ 0,34" },
      { label: "Meta do dia", value: "72%", tone: "signal" },
    ],
  },
  {
    id: "pf",
    label: "Pessoa física",
    title: "Sua casa,",
    titleAccent: "em ordem.",
    text: "Receitas, despesas e contas organizadas, com metas para guardar dinheiro.",
    bullets: ["Resultado do mês", "Para onde foi o dinheiro", "Contas a pagar e a receber", "Metas de economia"],
    screen: { src: "/app/mobile/pessoa-fisica.png", alt: "Tela do Vértice com o resultado do mês da pessoa física" },
    chips: [
      { label: "Resultado de novembro", value: "R$ 1.576,90", tone: "accent" },
      { label: "Despesas", value: "62% do que entrou" },
      { label: "Situação", value: "Confortável", tone: "signal" },
    ],
  },
];

/** Recursos — bento com recortes reais do app (dados fictícios). */
export const features = {
  title: "Tudo que você precisa saber.",
  titleAccent: "Nada que atrapalhe.",
  /**
   * Cada recurso é uma cena em camadas: foto (gerada no Paper, em public/app/cenas),
   * recorte real do app e um chip com um número dos prints de demonstração.
   */
  items: [
    {
      title: "Meta do dia",
      headline: ["Sua meta,", "em tempo real."],
      text: "Quanto já ganhou, quanto falta e quanto rende cada km.",
      bullets: ["Ganhos de hoje e % da meta", "Quanto falta para bater", "Ganho por km e por hora"],
      scene: "/app/cenas/motorista.webp",
      sceneAlt: "Motorista dirigindo à noite na cidade",
      crop: { src: "/app/recortes/meta-do-dia.png", w: 716, h: 1246, alt: "Recorte do app: ganhos de hoje e meta do dia" },
      chip: { icon: "target", label: "Faltam para a meta", value: "R$ 85,50" },
      orbits: ["M-30 690 C 320 540, 760 620, 1230 320", "M-30 110 C 420 40, 820 80, 1230 20"],
    },
    {
      title: "Lucro por km",
      headline: ["Quanto o carro", "custa de verdade."],
      text: "O que sobra de verdade a cada km e a cada hora no volante.",
      bullets: ["Lucro e custo por km", "Lucro por hora no volante", "Custos operacionais do mês"],
      scene: "/app/cenas/carro-estrada.webp",
      sceneAlt: "Carro prata em uma estrada litorânea ao anoitecer",
      crop: { src: "/app/recortes/veiculo-indicadores.png", w: 716, h: 762, alt: "Recorte do app: lucro por km e por hora" },
      chip: { icon: "chart", label: "Gasto em novembro", value: "R$ 2.401,20" },
      orbits: ["M-30 640 C 360 700, 800 560, 1230 640", "M-30 90 C 400 160, 840 40, 1230 110"],
    },
    {
      title: "Para onde foi o dinheiro",
      headline: ["Para onde foi", "cada real."],
      text: "Os gastos do mês separados por categoria, com o peso de cada um.",
      bullets: ["Gastos por categoria", "Percentual de cada gasto", "Comparação com o mês anterior"],
      scene: "/app/cenas/combustivel.webp",
      sceneAlt: "Bomba de combustível em um posto à noite",
      crop: { src: "/app/recortes/para-onde-foi.png", w: 716, h: 1236, alt: "Recorte do app: gastos por categoria" },
      chip: { icon: "fuel", label: "Combustível · 24%", value: "R$ 565,30" },
      orbits: ["M-30 560 C 300 760, 820 760, 1230 520", "M-30 60 C 360 140, 860 20, 1230 90"],
    },
    {
      title: "Metas de economia",
      headline: ["Guarde dinheiro", "para o que importa."],
      text: "Crie quantas metas quiser e saiba quanto guardar por mês para chegar lá.",
      bullets: ["Quantas metas quiser", "Quanto guardar por mês", "Progresso de cada meta"],
      scene: "/app/cenas/serra.webp",
      sceneAlt: "Carro em uma estrada na serra ao pôr do sol",
      crop: { src: "/app/recortes/pf-metas.png", w: 716, h: 1086, alt: "Recorte do app: metas de economia" },
      chip: { icon: "save", label: "Guardar por mês", value: "R$ 720,00" },
      orbits: ["M-30 720 C 420 560, 820 700, 1230 420", "M-30 100 C 380 30, 860 120, 1230 40"],
    },
  ] as {
    title: string;
    headline: [string, string];
    text: string;
    bullets: string[];
    scene: string;
    sceneAlt: string;
    crop: { src: string; w: number; h: number; alt: string };
    chip: { icon: "target" | "chart" | "fuel" | "save"; label: string; value: string };
    orbits: string[];
  }[],
};

export const calculator = {
  eyebrow: "Calculadora do dia",
  title: "Quanto custa",
  titleAccent: "cada km rodado?",
  lead: "Mexa nos valores e veja as mesmas contas que o Vértice faz com os seus registros.",
  disclaimer: "Simulação ilustrativa · no app, os números vêm dos seus registros",
};

export const differentials = {
  eyebrow: "Diferenciais",
  title: "Feito para",
  titleAccent: "a vida real.",
  items: [
    {
      n: "01",
      title: "Linguagem do dia a dia",
      text: "Sobrou hoje, falta para a meta, custo por km. Sem jargão financeiro.",
    },
    {
      n: "02",
      title: "Casa e carro juntos",
      text: "Os gastos do veículo e os da casa no mesmo lugar, para ver o resultado completo.",
    },
    {
      n: "03",
      title: "Pensado para o celular",
      text: "Abre no navegador do celular, com o botão de registrar sempre à mão.",
    },
    {
      n: "04",
      title: "Relatório de rendimentos",
      text: "Resumo em PDF do que você recebeu, mês a mês, para apresentar ou levar ao contador.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Comece agora",
  title: "Saiba quanto sobra",
  titleAccent: "no fim do dia.",
  lead: "Crie sua conta e tenha o dinheiro da casa e do carro organizado em um só lugar.",
};
