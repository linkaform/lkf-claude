export interface PaginationProps {
  page?: number;
  totalPages?: number;
  recordsOnPage?: number;
  totalRecords?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
