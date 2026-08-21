export interface PhotoCardDetail {
  icon?: React.ReactNode;
  /** Etiqueta antes del valor: "Ubicación", "Visita a", "Entrada". */
  label?: string;
  value: React.ReactNode;
  /** "danger" pinta la línea en rojo — se usa para la fecha de salida. */
  tone?: "default" | "danger";
}
/**
 * Modo "tarjetas" de una sección de listado: foto grande, folio y estatus superpuestos, metadatos y acciones.
 * @startingPoint section="Data" subtitle="Tarjeta con foto, folio y estatus" viewport="700x560"
 */
export interface PhotoCardProps {
  image?: string;
  title: string;
  /** Empresa o procedencia del registro. */
  subtitle?: string;
  folio?: string;
  estatus?: string;
  /** Chip púrpura de perfil: "Visita General", "Auditor de Gobierno". */
  perfil?: string;
  details?: PhotoCardDetail[];
  /** Fila de `RowAction` al pie de la tarjeta. */
  actions?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function PhotoCard(props: PhotoCardProps): JSX.Element;
