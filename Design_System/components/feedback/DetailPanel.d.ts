export interface DetailSectionProps {
  title: string;
  /** Metadato gris junto al título: "2 línea(s)", "Etapa 1 de 4", "4 involucrados". */
  meta?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  padding?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function DetailSection(props: DetailSectionProps): JSX.Element;
export interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function DetailField(props: DetailFieldProps): JSX.Element;
/**
 * Panel lateral de detalle de registro, estilo Notion: entra desde la derecha sin tapar la tabla y se ensancha arrastrando el borde izquierdo.
 * @startingPoint section="Data" subtitle="Panel de detalle redimensionable" viewport="1040x760"
 */
export interface DetailPanelProps {
  open?: boolean;
  /** Antetítulo en mayúsculas: "Detalle del registro". */
  eyebrow?: string;
  /** Folio del registro; se muestra con cifras tabulares. */
  title: React.ReactNode;
  /** Chip de estatus junto al folio. */
  badge?: React.ReactNode;
  /** Acciones de icono del encabezado (imprimir, descargar). */
  actions?: React.ReactNode;
  footerNote?: React.ReactNode;
  footer?: React.ReactNode;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  /** Clave de localStorage donde se recuerda el ancho elegido. */
  storageKey?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function DetailPanel(props: DetailPanelProps): JSX.Element;
