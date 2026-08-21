export interface KpiChipProps {
  value: number | string;
  /** Sustantivo que acompaña la cifra; "" para mostrar solo el número. */
  label?: string;
  tone?: "brand" | "neutral" | "danger" | "success";
  style?: React.CSSProperties;
}
export declare function KpiChip(props: KpiChipProps): JSX.Element;
