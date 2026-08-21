export interface FilterChipProps {
  label: string;
  /** Registros que coinciden con este filtro; se muestra a la derecha de la etiqueta. */
  count?: number;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function FilterChip(props: FilterChipProps): JSX.Element;
