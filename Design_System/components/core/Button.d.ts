/**
 * Primary action control for the Clave 10 console.
 * @startingPoint section="Core" subtitle="Acciones primarias, secundarias y de estado" viewport="700x180"
 */
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "success" | "link";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  children?: React.ReactNode;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
