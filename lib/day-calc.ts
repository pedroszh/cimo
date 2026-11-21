/**
 * Contas do dia do motorista — as mesmas definições exibidas no app Vértice:
 * - Sobrou hoje = ganhos − gastos
 * - Ganho por km = ganhos ÷ km rodados
 * - Custo por km = gastos ÷ km rodados
 * - Lucro por km = (ganhos − gastos) ÷ km rodados   ("ganhos menos gastos, dividido pelos km")
 * - Ganho por hora = ganhos ÷ horas trabalhadas
 * - Lucro por hora = (ganhos − gastos) ÷ horas       ("o que sobra por hora no volante")
 * - % da meta = ganhos ÷ meta do dia
 */

export type DayInput = {
  ganhos: number;
  gastos: number;
  km: number;
  horas: number;
  meta: number;
};

export type DayResult = {
  sobrou: number;
  ganhoPorKm: number;
  custoPorKm: number;
  lucroPorKm: number;
  ganhoPorHora: number;
  lucroPorHora: number;
  percentMeta: number;
  faltaMeta: number;
};

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

export function calcDay({ ganhos, gastos, km, horas, meta }: DayInput): DayResult {
  const sobrou = ganhos - gastos;
  return {
    sobrou,
    ganhoPorKm: safeDiv(ganhos, km),
    custoPorKm: safeDiv(gastos, km),
    lucroPorKm: safeDiv(sobrou, km),
    ganhoPorHora: safeDiv(ganhos, horas),
    lucroPorHora: safeDiv(sobrou, horas),
    percentMeta: meta > 0 ? Math.min(100, (ganhos / meta) * 100) : 0,
    faltaMeta: Math.max(0, meta - ganhos),
  };
}

/** Valores de exemplo (os mesmos dos prints de demonstração do app). */
export const DEFAULT_DAY: DayInput = { ganhos: 214.5, gastos: 60, km: 182, horas: 9, meta: 300 };

export const DAY_FIELDS: { key: keyof DayInput; label: string; min: number; max: number; step: number; kind: "money" | "km" | "hours" }[] = [
  { key: "ganhos", label: "Ganhos do dia", min: 0, max: 800, step: 0.5, kind: "money" },
  { key: "gastos", label: "Gastos do dia", min: 0, max: 400, step: 0.5, kind: "money" },
  { key: "km", label: "Km rodados", min: 0, max: 500, step: 1, kind: "km" },
  { key: "horas", label: "Horas trabalhadas", min: 0, max: 16, step: 0.5, kind: "hours" },
  { key: "meta", label: "Meta do dia", min: 50, max: 1000, step: 10, kind: "money" },
];

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
