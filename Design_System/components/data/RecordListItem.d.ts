export interface RecordListItemField {
  /** Etiqueta en mayúsculas: "CASETA", "VISITA A", "FECHA DE ENTRADA". */
  label: string;
  /** Valor; vacío se renderiza como "---". */
  value?: React.ReactNode;
}
/**
 * Modo "lista de tarjetas": fila de ancho completo con foto, miniaturas y rejilla de campos etiquetados.
 * @startingPoint section="Data" subtitle="Tarjeta en lista con campos etiquetados" viewport="1040x300"
 */
export interface RecordListItemProps {
  image?: string;
  /** Evidencias adicionales; con más de una se muestra la tira de miniaturas. */
  thumbnails?: string[];
  title: string;
  subtitle?: string;
  folio?: string;
  estatus?: string;
  perfil?: string;
  fields?: RecordListItemField[];
  actions?: React.ReactNode;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function RecordListItem(props: RecordListItemProps): JSX.Element;
