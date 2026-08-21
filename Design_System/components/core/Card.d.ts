export interface CardProps {
  elevation?: "none" | "sm" | "md" | "lg";
  padding?: string;
  interactive?: boolean;
  selected?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
export interface CardTitleProps { children?: React.ReactNode; style?: React.CSSProperties }
export declare function CardTitle(props: CardTitleProps): JSX.Element;
export interface CardDescriptionProps { children?: React.ReactNode; style?: React.CSSProperties }
export declare function CardDescription(props: CardDescriptionProps): JSX.Element;
