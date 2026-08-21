export interface ProgressProps {
  value?: number;
  height?: number;
  tone?: "brand" | "success" | "warning" | "danger";
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Progress(props: ProgressProps): JSX.Element;
