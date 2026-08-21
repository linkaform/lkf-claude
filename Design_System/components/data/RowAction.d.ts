export interface RowActionProps {
  /** Texto del tooltip y etiqueta accesible, p. ej. "Ver detalle". */
  label: string;
  icon: React.ReactNode;
  /** "square" en tablas (fondo gris), "circle" en tarjetas y listas, "plain" en tablas muy densas. */
  shape?: "square" | "circle" | "plain";
  /** "accent" pinta el icono en naranja — reservado para la acción de traslado/salida. */
  tone?: "default" | "accent";
  disabled?: boolean;
  onClick?: () => void;
  size?: number;
  style?: React.CSSProperties;
}
export declare function RowAction(props: RowActionProps): JSX.Element;
export interface RowActionsProps { children?: React.ReactNode; style?: React.CSSProperties }
export declare function RowActions(props: RowActionsProps): JSX.Element;
