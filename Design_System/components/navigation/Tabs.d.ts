export interface TabsProps {
  value: string;
  items: Array<string | { value: string; label: string }>;
  onChange?: (value: string) => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
