/**
 * KPI tile with big numeral and two-tone rule.
 * @startingPoint section="Data" subtitle="Tarjeta de indicador con contador" viewport="700x180"
 */
export interface StatCardProps {
  label: string;
  value?: number | string;
  icon?: React.ReactNode;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function StatCard(props: StatCardProps): JSX.Element;
