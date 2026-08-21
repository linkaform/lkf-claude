export interface SectionHeaderOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
}
/**
 * Header secundario de sección: título y conteo de registros a la izquierda; buscador, acción verde, subnavegación y modo de visualización a la derecha.
 * @startingPoint section="Navigation" subtitle="Header de sección con buscador, acción y vistas" viewport="1280x120"
 */
export interface SectionHeaderProps {
  title: string;
  /** Conteo de registros en gris junto al título. Las pantallas con tabla no usan tarjetas de KPI. */
  totalRecords?: number;
  recordsLabel?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  /** Acción principal de la sección; siempre verde y siempre precedida de "+". */
  actionLabel?: string;
  onAction?: () => void;
  subTabs?: SectionHeaderOption[];
  subTab?: string;
  onSubTabChange?: (value: string) => void;
  /** Normalmente tres: tarjetas (default), tarjetas en lista y tabla. */
  viewModes?: SectionHeaderOption[];
  viewMode?: string;
  onViewModeChange?: (value: string) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
