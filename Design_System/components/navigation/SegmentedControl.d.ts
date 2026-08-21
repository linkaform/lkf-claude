export interface SegmentedControlOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
}
export interface SegmentedControlProps {
  value?: string;
  options: SegmentedControlOption[];
  onChange?: (value: string) => void;
  /** Celdas cuadradas de solo icono — el modo de visualización. */
  iconOnly?: boolean;
  height?: number;
  style?: React.CSSProperties;
}
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
