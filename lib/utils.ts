import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

/** Converte uma série (0–100) em um path SVG suavizado. */
export function linePath(values: number[], width: number, height: number, pad = 4) {
  if (values.length < 2) return "";
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => [i * step, pad + (1 - v / 100) * (height - pad * 2)] as const);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

export function areaPath(values: number[], width: number, height: number, pad = 4) {
  const line = linePath(values, width, height, pad);
  return line ? `${line} L ${width},${height} L 0,${height} Z` : "";
}

export const formatNumber = (n: number, decimals = 0) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
