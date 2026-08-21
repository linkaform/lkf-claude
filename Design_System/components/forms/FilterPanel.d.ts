export interface FilterSectionProps {
  title: string;
  /** Filtros activos dentro de la sección; pinta el badge azul junto al título. */
  count?: number;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}
export declare function FilterSection(props: FilterSectionProps): JSX.Element;
/**
 * Cajón de filtros de las pantallas de listado, abierto por la pestaña flotante de la tabla.
 * @startingPoint section="Data" subtitle="Cajón de filtros con chips contados" viewport="700x420"
 */
export interface FilterPanelProps {
  open?: boolean;
  /** Total de filtros activos; se muestra junto al título "Filtros". */
  activeCount?: number;
  width?: number;
  onClear?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function FilterPanel(props: FilterPanelProps): JSX.Element;
