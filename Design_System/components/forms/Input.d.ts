export interface InputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  invalid?: boolean;
  iconLeft?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
