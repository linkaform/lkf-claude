export interface AvatarProps {
  src?: string;
  /** Used for initials fallback and alt text. */
  name?: string;
  size?: number;
  ring?: boolean;
  /** Inline style overrides merged last. */
  style?: React.CSSProperties;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
