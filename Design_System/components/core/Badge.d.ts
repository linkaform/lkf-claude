export interface BadgeProps {
  tone?: "brand" | "navy" | "neutral" | "outline" | "success" | "warning" | "process" | "purple" | "magenta" | "danger";
  shape?: "pill" | "square";
  children?: React.ReactNode;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
