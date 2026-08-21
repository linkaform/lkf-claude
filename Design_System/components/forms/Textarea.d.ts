export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
