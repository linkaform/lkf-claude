export interface ToastProps {
  tone?: "success" | "error" | "info";
  title: string;
  description?: string;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
