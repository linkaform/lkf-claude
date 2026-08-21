export interface TooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom";
  children?: React.ReactNode;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
