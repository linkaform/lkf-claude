export interface ViewMode {
  value: "cards" | "list" | "table";
  label: string;
  icon: React.ReactNode;
}
/** Los tres modos de visualización estándar, listos para `SectionHeader.viewModes`. */
export declare const VIEW_MODES: ViewMode[];
export declare function ViewModeIcons(): null;
