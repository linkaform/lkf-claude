export interface RadioProps {
  checked?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
