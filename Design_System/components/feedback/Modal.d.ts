export interface ModalProps {
  open?: boolean;
  title?: string;
  description?: string;
  width?: number;
  onClose?: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Modal(props: ModalProps): JSX.Element;
