export interface EstatusBadgeProps {
  /** Spanish status string, e.g. "Corriendo", "En proceso", "Sin incidencias". */
  estatus: string;
  /** Versión sólida (fondo saturado, texto blanco) para la lista y la tabla. */
  solid?: boolean;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function EstatusBadge(props: EstatusBadgeProps): JSX.Element;
