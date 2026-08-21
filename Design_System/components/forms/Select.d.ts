export interface SelectProps {
  value?: string;
  defaultValue?: string;
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
