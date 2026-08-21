export interface AppHeaderMenuSection {
  title: string;
  links: string[];
}
export interface AppHeaderItem {
  label: string;
  /** Presence of sections turns the item into a mega-menu trigger with a chevron. */
  sections?: AppHeaderMenuSection[];
}
/**
 * Barra principal sticky: logo y selector de ubicación a la izquierda; mega menú, notificaciones y avatar alineados a la derecha.
 * @startingPoint section="Navigation" subtitle="Header principal con mega menú a la derecha" viewport="1280x80"
 */
export interface AppHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  location?: string;
  items?: Array<string | AppHeaderItem>;
  activeItem?: string;
  notificationCount?: number;
  user?: { name?: string; email?: string; avatar?: string };
  onSelect?: (label: string) => void;
  onLocationClick?: () => void;
  onNotificationsClick?: () => void;
  style?: React.CSSProperties;
}
export declare function AppHeader(props: AppHeaderProps): JSX.Element;
