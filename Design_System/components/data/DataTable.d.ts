export interface DataTableColumn {
  header: React.ReactNode;
  /** Key into the row object; ignored when `cell` is given. */
  key?: string;
  cell?: (row: any) => React.ReactNode;
  width?: string;
}
/**
 * Dense records table used by every listing screen (pases, bitácoras, notas).
 * @startingPoint section="Data" subtitle="Tabla de registros con pestaña de filtros" viewport="700x300"
 */
export interface DataTableProps {
  columns: DataTableColumn[];
  rows: any[];
  dense?: boolean;
  emptyLabel?: string;
  /** Muestra la pestaña flotante de filtros al costado izquierdo de la tabla. */
  onFilterToggle?: () => void;
  filterOpen?: boolean;
  /** Filtros activos; pinta el contador sobre la pestaña. */
  filterCount?: number;
  style?: React.CSSProperties;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
export interface UserCellProps { name: string; sub?: string; src?: string }
export declare function UserCell(props: UserCellProps): JSX.Element;
