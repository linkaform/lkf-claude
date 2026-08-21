export interface SwitchProps {
  checked?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
