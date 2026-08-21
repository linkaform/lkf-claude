/* @ds-bundle: {"format":4,"namespace":"Clave10DesignSystem_b774bd","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"EmptyState","sourcePath":"components/core/EmptyState.jsx"},{"name":"EstatusBadge","sourcePath":"components/core/EstatusBadge.jsx"},{"name":"Progress","sourcePath":"components/core/Progress.jsx"},{"name":"Separator","sourcePath":"components/core/Separator.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"UserCell","sourcePath":"components/data/DataTable.jsx"},{"name":"KpiChip","sourcePath":"components/data/KpiChip.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"PhotoCard","sourcePath":"components/data/PhotoCard.jsx"},{"name":"RecordListItem","sourcePath":"components/data/RecordListItem.jsx"},{"name":"RowAction","sourcePath":"components/data/RowAction.jsx"},{"name":"RowActions","sourcePath":"components/data/RowAction.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"DetailSection","sourcePath":"components/feedback/DetailPanel.jsx"},{"name":"DetailField","sourcePath":"components/feedback/DetailPanel.jsx"},{"name":"DetailPanel","sourcePath":"components/feedback/DetailPanel.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"FilterChip","sourcePath":"components/forms/FilterChip.jsx"},{"name":"FilterSection","sourcePath":"components/forms/FilterPanel.jsx"},{"name":"FilterPanel","sourcePath":"components/forms/FilterPanel.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"},{"name":"SegmentedControl","sourcePath":"components/navigation/SegmentedControl.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ViewModeIcons","sourcePath":"components/navigation/ViewModeIcons.jsx"},{"name":"VIEW_MODES","sourcePath":"components/navigation/ViewModeIcons.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"5f9b0976599d","components/core/Badge.jsx":"f3d8979b7ff9","components/core/Button.jsx":"6182d3d28495","components/core/Card.jsx":"be3af0f61ba5","components/core/EmptyState.jsx":"2b842f8d4ab9","components/core/EstatusBadge.jsx":"34d249733070","components/core/Progress.jsx":"9a0e5a440608","components/core/Separator.jsx":"65b92e84a6cf","components/data/DataTable.jsx":"916e7a7dd98d","components/data/KpiChip.jsx":"98a9ce2b7c22","components/data/Pagination.jsx":"4675c9ecb54d","components/data/PhotoCard.jsx":"357acbac95ab","components/data/RecordListItem.jsx":"47b826cb3936","components/data/RowAction.jsx":"03914e3cb526","components/data/StatCard.jsx":"22c66090b8d0","components/feedback/DetailPanel.jsx":"9c5806b681ce","components/feedback/Modal.jsx":"1a2a34f9a9f5","components/feedback/Spinner.jsx":"bd7487d3a663","components/feedback/Toast.jsx":"aabfbac268a3","components/feedback/Tooltip.jsx":"d31c86498768","components/forms/Checkbox.jsx":"3ad2079eaf63","components/forms/Field.jsx":"ee595e0d433e","components/forms/FilterChip.jsx":"0477ccd60080","components/forms/FilterPanel.jsx":"dd22306f4519","components/forms/Input.jsx":"4687ac1b2bfb","components/forms/Radio.jsx":"e7c7c153788c","components/forms/Select.jsx":"fad6955ab127","components/forms/Switch.jsx":"15c262536169","components/forms/Textarea.jsx":"afa846b29da9","components/navigation/AppHeader.jsx":"4516c3ff619f","components/navigation/SectionHeader.jsx":"9eab8bbe29f4","components/navigation/SegmentedControl.jsx":"85d95f370dbd","components/navigation/Tabs.jsx":"d6e28f6006ef","components/navigation/ViewModeIcons.jsx":"ef4d036010d0","ui_kits/plataforma/App.jsx":"7641588d1e14","ui_kits/plataforma/BitacorasScreen.jsx":"0f4e3e76eac4","ui_kits/plataforma/InicioScreen.jsx":"ad0114da4417","ui_kits/plataforma/LoginScreen.jsx":"55e3c256249c","ui_kits/plataforma/PasesScreen.jsx":"a09e204fca6a","ui_kits/plataforma/TurnosScreen.jsx":"2e980b2858b0","ui_kits/plataforma/icons.jsx":"e5e4d6ebea9b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Clave10DesignSystem_b774bd = window.Clave10DesignSystem_b774bd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  src,
  name = "",
  size = 40,
  ring = false,
  style
}) {
  const initials = (name || "").split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "var(--radius-full)",
      overflow: "hidden",
      flexShrink: 0,
      background: "var(--c10-surface-sunken)",
      color: "var(--c10-text-secondary)",
      fontFamily: "var(--font-sans)",
      fontSize: Math.round(size * 0.35),
      fontWeight: "var(--font-weight-semibold)",
      boxShadow: ring ? "var(--shadow-avatar)" : "none",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  brand: {
    background: "var(--c10-blue)",
    color: "#fff",
    border: "1px solid transparent"
  },
  navy: {
    background: "var(--c10-navy)",
    color: "#fff",
    border: "1px solid transparent"
  },
  neutral: {
    background: "var(--c10-surface-sunken)",
    color: "var(--c10-text-secondary)",
    border: "1px solid transparent"
  },
  outline: {
    background: "transparent",
    color: "var(--c10-text-primary)",
    border: "1px solid var(--c10-border)"
  },
  success: {
    background: "var(--c10-success-bg)",
    color: "var(--c10-success-text)",
    border: "1px solid transparent"
  },
  warning: {
    background: "var(--c10-warning-bg)",
    color: "var(--c10-warning-text)",
    border: "1px solid transparent"
  },
  process: {
    background: "var(--c10-process-bg)",
    color: "var(--c10-process-text)",
    border: "1px solid transparent"
  },
  purple: {
    background: "var(--c10-purple-bg)",
    color: "var(--c10-purple-text)",
    border: "1px solid transparent"
  },
  magenta: {
    background: "var(--c10-magenta-bg)",
    color: "var(--c10-magenta-text)",
    border: "1px solid transparent"
  },
  danger: {
    background: "var(--c10-danger-bg)",
    color: "var(--c10-danger-text)",
    border: "1px solid transparent"
  }
};
function Badge({
  tone = "brand",
  shape = "pill",
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 10px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-xs)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: 1.5,
      whiteSpace: "nowrap",
      borderRadius: shape === "pill" ? "var(--radius-full)" : "var(--radius-sm)",
      ...(TONES[tone] || TONES.brand),
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const VARIANTS = {
  primary: {
    background: "var(--c10-blue)",
    color: "#fff",
    border: "1px solid transparent"
  },
  secondary: {
    background: "var(--c10-surface)",
    color: "var(--c10-text-primary)",
    border: "1px solid var(--c10-border)"
  },
  ghost: {
    background: "transparent",
    color: "var(--c10-text-primary)",
    border: "1px solid transparent"
  },
  destructive: {
    background: "var(--c10-danger)",
    color: "#fff",
    border: "1px solid transparent"
  },
  success: {
    background: "var(--action-create)",
    color: "#fff",
    border: "1px solid transparent"
  },
  link: {
    background: "transparent",
    color: "var(--c10-blue)",
    border: "1px solid transparent",
    textDecoration: "none"
  }
};
const HOVER = {
  primary: "var(--c10-blue-hover)",
  secondary: "var(--c10-bg-app)",
  ghost: "var(--c10-blue)",
  destructive: "#B91C1C",
  success: "#15803D",
  link: "transparent"
};
const SIZES = {
  sm: {
    height: "36px",
    padding: "0 12px"
  },
  md: {
    height: "40px",
    padding: "0 16px"
  },
  lg: {
    height: "44px",
    padding: "0 32px"
  },
  xl: {
    height: "48px",
    padding: "0 16px"
  },
  icon: {
    height: "40px",
    width: "40px",
    padding: 0
  }
};
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  onClick,
  type = "button",
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const hoverStyle = hover && !disabled ? variant === "ghost" ? {
    background: "var(--c10-blue)",
    color: "#fff"
  } : variant === "link" ? {
    textDecoration: "underline"
  } : {
    background: HOVER[variant]
  } : null;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-medium)",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "var(--transition-fast)",
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? "100%" : s.width || "auto",
      userSelect: "none",
      ...v,
      ...s,
      ...hoverStyle,
      ...style
    }
  }, iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  elevation = "sm",
  padding = "20px",
  interactive = false,
  selected = false,
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  const shadow = elevation === "none" ? "none" : elevation === "md" ? "var(--shadow-md)" : elevation === "lg" ? "var(--shadow-lg)" : "var(--shadow-sm)";
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--surface-card)",
      border: "1px solid " + (selected ? "var(--c10-blue-select)" : "var(--c10-border)"),
      borderRadius: "var(--radius-lg)",
      boxShadow: interactive && hover ? "var(--shadow-lg)" : shadow,
      padding,
      transition: "var(--transition-normal)",
      cursor: interactive ? "pointer" : "default",
      fontFamily: "var(--font-sans)",
      color: "var(--c10-text-primary)",
      ...style
    }
  }, children);
}
function CardTitle({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--font-size-md)",
      fontWeight: "var(--font-weight-semibold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--c10-text-primary)",
      ...style
    }
  }, children);
}
function CardDescription({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)",
      margin: "4px 0 0",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card, CardTitle, CardDescription });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/EmptyState.jsx
try { (() => {
function EmptyState({
  title = "No se encontraron registros",
  description,
  icon,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      padding: "48px 24px",
      textAlign: "center",
      borderRadius: "var(--radius-lg)",
      border: "1px dashed var(--c10-border)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      background: "var(--c10-surface-sunken)",
      color: "var(--c10-text-secondary)"
    }
  }, icon) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--font-size-md)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--c10-text-primary)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)",
      maxWidth: "340px"
    }
  }, description) : null, action);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/core/EstatusBadge.jsx
try { (() => {
const norm = s => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const GREEN = {
  bg: "var(--c10-chip-green-bg)",
  bd: "var(--c10-chip-green-bd)",
  fg: "var(--c10-chip-green-fg)"
};
const YELLOW = {
  bg: "var(--c10-chip-yellow-bg)",
  bd: "var(--c10-chip-yellow-bd)",
  fg: "var(--c10-chip-yellow-fg)"
};
const BLUE = {
  bg: "var(--c10-chip-blue-bg)",
  bd: "var(--c10-chip-blue-bd)",
  fg: "var(--c10-chip-blue-fg)"
};
const PURPLE = {
  bg: "var(--c10-chip-purple-bg)",
  bd: "var(--c10-chip-purple-bd)",
  fg: "var(--c10-chip-purple-fg)"
};
const RED = {
  bg: "var(--c10-chip-red-bg)",
  bd: "var(--c10-chip-red-bd)",
  fg: "var(--c10-chip-red-fg)"
};
const SLATE = {
  bg: "var(--c10-chip-slate-bg)",
  bd: "var(--c10-chip-slate-bd)",
  fg: "var(--c10-chip-slate-fg)"
};
const AMBER = {
  bg: "var(--c10-chip-amber-bg)",
  bd: "var(--c10-chip-amber-bd)",
  fg: "var(--c10-chip-amber-fg)"
};
const MAP = {
  corriendo: GREEN,
  realizado: GREEN,
  entregado: GREEN,
  devuelto: GREEN,
  entrada: GREEN,
  pausado: YELLOW,
  guardado: YELLOW,
  "en proceso": BLUE,
  programado: PURPLE,
  abierto: RED,
  pendiente: RED,
  salida: RED,
  eliminado: SLATE,
  cerrado: SLATE,
  parcial: AMBER
};
function EstatusBadge({
  estatus,
  solid = false,
  style
}) {
  const key = norm(estatus);
  let c = SLATE;
  if (key.includes("sin incidencias")) c = GREEN;else if (key.includes("incidencia")) c = RED;else c = MAP[key] || SLATE;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 10px",
      borderRadius: "var(--radius-full)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-xs)",
      fontWeight: "var(--font-weight-semibold)",
      whiteSpace: "nowrap",
      lineHeight: 1.5,
      background: solid ? c.fg : c.bg,
      color: solid ? "#fff" : c.fg,
      border: "1px solid " + (solid ? c.fg : c.bd),
      ...style
    }
  }, (estatus || "—").replace(/_/g, " "));
}
Object.assign(__ds_scope, { EstatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EstatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/Progress.jsx
try { (() => {
function Progress({
  value = 0,
  height = 16,
  tone = "brand",
  style
}) {
  const color = tone === "success" ? "var(--c10-success)" : tone === "warning" ? "var(--c10-warning)" : tone === "danger" ? "var(--c10-danger)" : "var(--c10-blue)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      width: "100%",
      overflow: "hidden",
      borderRadius: "var(--radius-full)",
      background: "var(--c10-surface-sunken)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: Math.max(0, Math.min(100, value)) + "%",
      background: color,
      transition: "var(--transition-normal)"
    }
  }));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Progress.jsx", error: String((e && e.message) || e) }); }

// components/core/Separator.jsx
try { (() => {
function Separator({
  orientation = "horizontal",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: orientation === "vertical" ? {
      width: 1,
      alignSelf: "stretch",
      background: "var(--c10-border)",
      ...style
    } : {
      height: 1,
      width: "100%",
      background: "var(--c10-border)",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Separator.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
const Sliders = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M10 5H3M20 5h-5M7 5v2.5M7 2.5V5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 12H3M21 12h-3M18 12v2.5M18 9.5V12"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 19H3M21 19h-8M12 19v2.5M12 16.5V19"
}));

/**
 * Tabla de registros: encabezado azul claro en mayúsculas, filas con hover slate
 * y la pestaña flotante de filtros anclada al costado izquierdo.
 */
function DataTable({
  columns = [],
  rows = [],
  dense = true,
  emptyLabel = "No se encontraron registros",
  onFilterToggle,
  filterOpen = false,
  filterCount = 0,
  style
}) {
  const [hover, setHover] = React.useState(-1);
  const [tabHover, setTabHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, onFilterToggle ? /*#__PURE__*/React.createElement("button", {
    onClick: onFilterToggle,
    "aria-label": "Filtros",
    "aria-expanded": filterOpen,
    onMouseEnter: () => setTabHover(true),
    onMouseLeave: () => setTabHover(false),
    style: {
      position: "absolute",
      left: "-10px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 20,
      width: "38px",
      height: "52px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      border: "none",
      cursor: "pointer",
      borderRadius: "0 var(--radius-full) var(--radius-full) 0",
      background: tabHover || filterOpen ? "var(--c10-blue-hover)" : "var(--c10-blue)",
      color: "#fff",
      boxShadow: "var(--shadow-md)",
      transition: "var(--transition-fast)"
    }
  }, /*#__PURE__*/React.createElement(Sliders, null), filterCount > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "-6px",
      right: "-6px",
      minWidth: "20px",
      height: "20px",
      padding: "0 5px",
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      background: "#fff",
      color: "var(--c10-blue)",
      fontSize: "var(--font-size-xs)",
      fontWeight: "var(--font-weight-bold)",
      lineHeight: 1,
      boxShadow: "var(--shadow-md)"
    }
  }, filterCount) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "var(--c10-surface)",
      boxShadow: "var(--shadow-sm)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: dense ? "var(--font-size-xs)" : "var(--font-size-sm)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "#DBEAFE",
      borderBottom: "1px solid #E2E8F0"
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      height: "40px",
      padding: "8px 12px",
      color: "#475569",
      fontWeight: "var(--font-weight-medium)",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
      width: c.width
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      height: "128px",
      textAlign: "center",
      color: "#CBD5E1",
      fontSize: "var(--font-size-xs)"
    }
  }, emptyLabel)) : rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    onMouseEnter: () => setHover(ri),
    onMouseLeave: () => setHover(-1),
    style: {
      background: hover === ri ? "#F1F5F9" : "transparent",
      borderBottom: "1px solid #F8FAFC",
      transition: "var(--transition-fast)"
    }
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      padding: "8px 12px",
      verticalAlign: "middle",
      color: "var(--c10-text-primary)",
      borderRight: ci === columns.length - 1 ? "none" : "1px solid #F1F5F9"
    }
  }, typeof c.cell === "function" ? c.cell(r) : r[c.key]))))))));
}
function UserCell({
  name,
  sub,
  src
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "var(--radius-full)",
      overflow: "hidden",
      background: "var(--c10-border)",
      flexShrink: 0,
      display: "inline-block"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--font-weight-semibold)",
      color: "var(--c10-text-primary)"
    }
  }, name), sub ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-xs)",
      color: "var(--c10-text-secondary)"
    }
  }, sub) : null));
}
Object.assign(__ds_scope, { DataTable, UserCell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiChip.jsx
try { (() => {
/**
 * KPI de sección: chip pequeño a la derecha del título principal.
 * Reemplaza cualquier tarjeta de KPI en pantallas de listado.
 */
function KpiChip({
  value,
  label = "registros",
  tone = "brand",
  style
}) {
  const TONES = {
    brand: {
      background: "var(--c10-blue)",
      color: "#fff"
    },
    neutral: {
      background: "var(--c10-surface-sunken)",
      color: "var(--c10-text-secondary)"
    },
    danger: {
      background: "var(--c10-danger)",
      color: "#fff"
    },
    success: {
      background: "#16A34A",
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      padding: "2px 8px",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-medium)",
      lineHeight: 1.45,
      whiteSpace: "nowrap",
      fontVariantNumeric: "tabular-nums",
      ...(TONES[tone] || TONES.brand),
      ...style
    }
  }, value, label ? " " + label : "");
}
Object.assign(__ds_scope, { KpiChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiChip.jsx", error: String((e && e.message) || e) }); }

// components/data/Pagination.jsx
try { (() => {
function Pagination({
  page = 1,
  totalPages = 1,
  recordsOnPage = 0,
  totalRecords = 0,
  limit = 25,
  onPageChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      width: "100%",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-md)",
      padding: "12px",
      marginTop: "8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)",
      boxSizing: "border-box",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px"
    }
  }, "Registros por p\xE1gina", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100px",
      height: "40px",
      padding: "0 12px",
      boxSizing: "border-box",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-md)",
      color: "var(--c10-text-primary)"
    }
  }, limit, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      opacity: .5
    }
  }, "\u25BC"))), /*#__PURE__*/React.createElement("span", null, "1 - ", recordsOnPage, " de ", totalRecords, " registros")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "20px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    disabled: page <= 1,
    onClick: () => onPageChange && onPageChange(page - 1)
  }, "Anterior"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--c10-text-primary)"
    }
  }, "P\xE1gina ", page, " de ", totalPages), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    disabled: page >= totalPages,
    onClick: () => onPageChange && onPageChange(page + 1)
  }, "Siguiente")));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data/PhotoCard.jsx
try { (() => {
/**
 * Modo "tarjetas": foto grande arriba con folio y estatus superpuestos,
 * cuerpo con nombre, empresa, chip de perfil, lista de metadatos y fila de acciones.
 */
function PhotoCard({
  image,
  title,
  subtitle,
  folio,
  estatus,
  perfil,
  details = [],
  actions,
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: "280px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      cursor: "pointer",
      background: "var(--c10-surface)",
      borderRadius: "var(--radius-lg)",
      border: "1px solid " + (selected ? "var(--c10-blue)" : "var(--c10-border)"),
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transition: "var(--transition-normal)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "340px",
      overflow: "hidden",
      background: "var(--c10-surface-sunken)"
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      color: "#94A3B8",
      fontStyle: "italic",
      fontSize: "var(--font-size-xs)"
    }
  }, "Sin imagen"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      right: 10,
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      alignItems: "flex-end"
    }
  }, folio ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "process",
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, folio) : null, estatus ? /*#__PURE__*/React.createElement(__ds_scope.EstatusBadge, {
    estatus: estatus
  }) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-bold)",
      color: "#0F172A",
      lineHeight: 1.35
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "2px",
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)"
    }
  }, subtitle) : null, perfil ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "12px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "purple",
    shape: "square"
  }, perfil)) : null, details.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "14px",
      paddingTop: "14px",
      borderTop: "1px solid var(--c10-border)",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, details.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "var(--font-size-sm)",
      color: d.tone === "danger" ? "var(--c10-danger)" : "var(--c10-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexShrink: 0,
      color: d.tone === "danger" ? "var(--c10-danger)" : "var(--c10-text-muted)"
    }
  }, d.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, d.label ? d.label + ": " : "", d.value)))) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "14px",
      paddingTop: "14px",
      borderTop: "1px solid var(--c10-border)",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, actions) : null));
}
Object.assign(__ds_scope, { PhotoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PhotoCard.jsx", error: String((e && e.message) || e) }); }

// components/data/RecordListItem.jsx
try { (() => {
/**
 * Modo "lista de tarjetas": tarjeta de ancho completo con la foto a la izquierda,
 * rejilla de campos etiquetados a la derecha y tira de miniaturas al pie de la foto.
 */
function RecordListItem({
  image,
  thumbnails = [],
  title,
  subtitle,
  folio,
  estatus,
  perfil,
  fields = [],
  actions,
  selectable = false,
  selected = false,
  onSelect,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      gap: "28px",
      padding: "20px",
      boxSizing: "border-box",
      width: "100%",
      background: "var(--c10-surface)",
      borderRadius: "var(--radius-lg)",
      cursor: "pointer",
      border: "1px solid " + (selected ? "var(--c10-blue)" : "var(--c10-border)"),
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      transition: "var(--transition-normal)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "300px",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "230px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "var(--c10-surface-muted)",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-md)"
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: thumbnails[active] || image,
    alt: title,
    style: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#94A3B8",
      fontStyle: "italic",
      fontSize: "var(--font-size-xs)"
    }
  }, "Sin imagen")), thumbnails.length > 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px"
    }
  }, thumbnails.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    onClick: e => {
      e.stopPropagation();
      setActive(i);
    },
    style: {
      width: "44px",
      height: "38px",
      overflow: "hidden",
      cursor: "pointer",
      flexShrink: 0,
      borderRadius: "var(--radius-sm)",
      background: "var(--c10-surface-sunken)",
      border: i === active ? "2px solid var(--c10-blue)" : "1px solid var(--c10-border)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: t,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })))) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--font-size-md)",
      fontWeight: "var(--font-weight-bold)",
      color: "#0F172A"
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "2px",
      fontSize: "var(--font-size-sm)",
      color: "#64748B"
    }
  }, subtitle) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      flexShrink: 0
    }
  }, estatus ? /*#__PURE__*/React.createElement(__ds_scope.EstatusBadge, {
    estatus: estatus,
    solid: true
  }) : null, perfil ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "purple"
  }, perfil) : null, folio ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "process",
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, folio) : null)), fields.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "18px",
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "20px 24px"
    }
  }, fields.map((f, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-xs)",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "#64748B"
    }
  }, f.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-primary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, f.value || "---")))) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "18px",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, actions) : null), selectable ? /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onSelect && onSelect(!selected);
    },
    style: {
      position: "absolute",
      top: "16px",
      right: "16px",
      width: 16,
      height: 16,
      borderRadius: "var(--radius-sm)",
      border: "1px solid " + (selected ? "var(--c10-blue)" : "var(--c10-border-strong)"),
      background: selected ? "var(--c10-blue)" : "var(--c10-surface)",
      color: "#fff",
      fontSize: "11px",
      lineHeight: "14px",
      textAlign: "center",
      cursor: "pointer"
    }
  }, selected ? "✓" : "") : null);
}
Object.assign(__ds_scope, { RecordListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RecordListItem.jsx", error: String((e && e.message) || e) }); }

// components/data/RowAction.jsx
try { (() => {
/**
 * Acción de fila: botón cuadrado de solo icono con fondo gris; al hover pasa al
 * azul claro del encabezado de la tabla con el icono en azul y muestra el tooltip.
 */
function RowAction({
  label,
  icon,
  shape = "square",
  tone = "default",
  disabled = false,
  onClick,
  size = 32,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const on = hover && !disabled;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    "aria-label": label,
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      border: shape === "circle" ? "1px solid " + (on ? "#BFDBFE" : "var(--c10-border)") : "none",
      borderRadius: shape === "square" ? "var(--radius-md)" : "var(--radius-full)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "var(--transition-fast)",
      opacity: disabled ? 0.35 : 1,
      background: shape === "plain" ? "transparent" : on ? "#DBEAFE" : shape === "circle" ? "var(--c10-surface)" : "var(--c10-surface-sunken)",
      color: tone === "accent" ? "#F97316" : on ? "var(--c10-blue)" : "var(--c10-text-secondary)",
      ...style
    }
  }, icon), on && label ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 30,
      padding: "6px 10px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      background: "var(--c10-surface)",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-xs)",
      color: "var(--c10-text-primary)"
    }
  }, label) : null);
}
function RowActions({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { RowAction, RowActions });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RowAction.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
/* Guard-console KPI tile: big numeral, icon, two-tone rule, label. */
function StatCard({
  label,
  value = 0,
  icon,
  selected = false,
  selectable = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: selectable ? onClick : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: "224px",
      padding: "16px",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      border: "1px solid " + (selected ? "var(--c10-blue-select)" : "var(--c10-border)"),
      background: selected ? "#DBEAFE" : hover && selectable ? "#F3F4F6" : "var(--c10-surface)",
      cursor: selectable ? "pointer" : "default",
      transition: "var(--transition-fast)",
      fontFamily: "var(--font-sans)",
      color: "var(--c10-text-primary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "24px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      color: selected ? "var(--c10-navy)" : "var(--c10-blue)"
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--font-weight-bold)",
      fontSize: "var(--font-size-2xl)",
      lineHeight: 1
    }
  }, value)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      marginTop: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 4,
      width: "50%",
      background: "#CFFAFE"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 4,
      width: "50%",
      background: "var(--c10-blue)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      fontSize: "var(--font-size-base)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/DetailPanel.jsx
try { (() => {
const Chevron = ({
  open
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: open ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"
}));

/** Bloque plegable del cuerpo del panel: tarjeta blanca con título y contador opcional. */
function DetailSection({
  title,
  meta,
  collapsible = false,
  defaultOpen = true,
  padding = "20px",
  children,
  style
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const header = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-md)",
      fontWeight: "var(--font-weight-semibold)",
      color: "var(--c10-text-primary)"
    }
  }, title), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)"
    }
  }, meta) : null), collapsible ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--c10-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Chevron, {
    open: open
  })) : null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--c10-surface)",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, collapsible ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      display: "block",
      width: "100%",
      boxSizing: "border-box",
      padding,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "var(--font-sans)"
    }
  }, header) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding,
      paddingBottom: children ? "12px" : padding
    }
  }, header), open && children ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 " + padding + " " + padding
    }
  }, children) : null);
}

/** Par etiqueta / valor del cuerpo del panel. */
function DetailField({
  label,
  value,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-xs)",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "var(--c10-text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-base)",
      fontWeight: "var(--font-weight-semibold)",
      color: "var(--c10-text-primary)"
    }
  }, value));
}

/**
 * Panel lateral de detalle de registro, estilo Notion: entra desde la derecha,
 * mantiene la tabla visible y se puede ensanchar arrastrando el borde izquierdo.
 * El ancho elegido se recuerda en localStorage.
 */
function DetailPanel({
  open = false,
  eyebrow,
  title,
  badge,
  actions,
  footerNote,
  footer,
  defaultWidth = 1040,
  minWidth = 480,
  maxWidth = 1440,
  storageKey,
  onClose,
  children,
  style
}) {
  const [width, setWidth] = React.useState(defaultWidth);
  const [dragging, setDragging] = React.useState(false);
  const [hint, setHint] = React.useState(false);
  React.useEffect(() => {
    if (!storageKey) return;
    try {
      const v = parseInt(window.localStorage.getItem(storageKey), 10);
      if (v) setWidth(v);
    } catch (e) {}
  }, [storageKey]);
  React.useEffect(() => {
    if (!dragging) return;
    const move = e => {
      const next = Math.min(maxWidth, Math.max(minWidth, window.innerWidth - e.clientX));
      setWidth(next);
    };
    const up = () => {
      setDragging(false);
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, String(width));
        } catch (e) {}
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [dragging, width, minWidth, maxWidth, storageKey]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("aside", {
    role: "dialog",
    "aria-label": title,
    style: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      width: width + "px",
      maxWidth: "100vw",
      zIndex: 70,
      display: "flex",
      background: "#F8FAFC",
      boxShadow: "-8px 0 24px rgba(15,23,42,.12)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    onMouseDown: () => setDragging(true),
    onMouseEnter: () => setHint(true),
    onMouseLeave: () => setHint(false),
    title: "Arrastra para ajustar el ancho",
    style: {
      position: "relative",
      width: "8px",
      flexShrink: 0,
      cursor: "col-resize",
      background: dragging || hint ? "var(--c10-blue)" : "transparent",
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      width: "4px",
      height: "36px",
      borderRadius: "var(--radius-full)",
      background: dragging || hint ? "#fff" : "var(--c10-border-strong)"
    }
  }), hint && !dragging ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      whiteSpace: "nowrap",
      padding: "6px 10px",
      borderRadius: "var(--radius-sm)",
      background: "#0F172A",
      color: "#fff",
      fontSize: "var(--font-size-xs)",
      pointerEvents: "none",
      zIndex: 2
    }
  }, "Arrastra para ajustar el ancho") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
      flexShrink: 0,
      padding: "20px 24px",
      background: "var(--c10-surface)",
      borderBottom: "1px solid var(--c10-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--font-size-xs)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--c10-text-muted)",
      marginBottom: "4px"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-xl)",
      fontWeight: "var(--font-weight-bold)",
      letterSpacing: "var(--tracking-tight)",
      fontVariantNumeric: "tabular-nums",
      color: "#0F172A"
    }
  }, title), badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexShrink: 0
    }
  }, actions, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      width: "36px",
      height: "36px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-md)",
      background: "var(--c10-surface)",
      cursor: "pointer",
      color: "var(--c10-text-secondary)",
      fontSize: "14px",
      lineHeight: 1
    }
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, children), footer || footerNote ? /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      flexShrink: 0,
      padding: "16px 24px",
      background: "var(--c10-surface)",
      borderTop: "1px solid var(--c10-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)"
    }
  }, footerNote), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "8px"
    }
  }, footer)) : null));
}
Object.assign(__ds_scope, { DetailSection, DetailField, DetailPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/DetailPanel.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function Modal({
  open = true,
  title,
  description,
  width = 512,
  onClose,
  footer,
  style,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,.8)",
      zIndex: 50,
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      maxWidth: width + "px",
      boxSizing: "border-box",
      background: "var(--c10-surface)",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      padding: "24px",
      display: "grid",
      gap: "16px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }
  }, title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: "var(--font-size-md)",
      fontWeight: "var(--font-weight-semibold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--c10-text-primary)"
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)"
    }
  }, description) : null), children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px"
    }
  }, footer) : null, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      position: "absolute",
      right: 16,
      top: 16,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--c10-text-secondary)",
      opacity: .7,
      fontSize: "14px",
      lineHeight: 1
    }
  }, "\u2715")));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
function Spinner({
  size = 96,
  thickness = 8,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "var(--radius-full)",
      border: thickness + "px solid #D1D5DB",
      borderTopColor: "var(--c10-blue)",
      animation: "c10-spin 1s linear infinite",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes c10-spin{to{transform:rotate(360deg)}}"));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  success: {
    color: "var(--c10-success)",
    glyph: "✓"
  },
  error: {
    color: "var(--c10-danger)",
    glyph: "!"
  },
  info: {
    color: "var(--c10-blue)",
    glyph: "i"
  }
};
function Toast({
  tone = "success",
  title,
  description,
  style
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      width: "356px",
      boxSizing: "border-box",
      padding: "16px",
      background: "var(--c10-surface)",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "var(--radius-full)",
      background: t.color,
      color: "#fff",
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      fontWeight: 700,
      marginTop: 1
    }
  }, t.glyph), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--c10-text-primary)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 2,
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-secondary)"
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  content,
  placement = "top",
  style,
  children
}) {
  const [open, setOpen] = React.useState(false);
  const pos = placement === "bottom" ? {
    top: "calc(100% + 8px)"
  } : {
    bottom: "calc(100% + 8px)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-block",
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false)
  }, children, open ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      ...pos,
      zIndex: 9999,
      minWidth: "160px",
      padding: "12px",
      background: "var(--c10-surface)",
      border: "1px solid var(--c10-border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-xs)",
      color: "var(--c10-text-primary)",
      pointerEvents: "none"
    }
  }, content) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked = false,
  label,
  disabled = false,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 16,
      height: 16,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      borderRadius: "var(--radius-sm)",
      transition: "var(--transition-fast)",
      border: "1px solid " + (checked ? "var(--c10-blue-select)" : "var(--c10-border-strong)"),
      background: checked ? "var(--c10-blue-select)" : "var(--c10-surface)",
      color: "#fff",
      fontSize: "11px",
      lineHeight: 1
    }
  }, checked ? "✓" : ""), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "20px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: "block",
      marginBottom: "6px",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--c10-text-secondary)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--c10-danger)"
    }
  }, " *") : null) : null, children, error ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "6px",
      fontSize: "var(--font-size-xs)",
      color: "var(--c10-danger)"
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "6px",
      fontSize: "var(--font-size-xs)",
      color: "var(--c10-text-muted)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterChip.jsx
try { (() => {
/**
 * Chip de filtro con contador. Seleccionado: azul de acción con el contador en
 * cápsula translúcida. En reposo: gris claro con contador en azul.
 */
function FilterChip({
  label,
  count,
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      height: "36px",
      padding: "0 14px",
      border: "none",
      borderRadius: "var(--radius-full)",
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "var(--transition-fast)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      fontWeight: selected ? "var(--font-weight-semibold)" : "var(--font-weight-normal)",
      background: selected ? "var(--c10-blue)" : hover ? "#E5E7EB" : "#F1F5F9",
      color: selected ? "#fff" : "var(--c10-text-primary)",
      ...style
    }
  }, label, count !== undefined ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "20px",
      height: "18px",
      padding: "0 5px",
      boxSizing: "border-box",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--font-size-xs)",
      fontWeight: "var(--font-weight-semibold)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1,
      background: selected ? "rgba(255,255,255,.25)" : "transparent",
      color: selected ? "#fff" : "var(--c10-text-muted)"
    }
  }, count) : null);
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterPanel.jsx
try { (() => {
const Chevron = ({
  open
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: open ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"
}));
function FilterSection({
  title,
  count,
  children,
  defaultOpen = true
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: 0,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "var(--font-size-base)",
      fontWeight: "var(--font-weight-bold)",
      color: "var(--c10-text-primary)"
    }
  }, title, count ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "20px",
      height: "20px",
      borderRadius: "var(--radius-full)",
      background: "var(--c10-blue)",
      color: "#fff",
      fontSize: "var(--font-size-xs)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: 1
    }
  }, count) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--c10-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Chevron, {
    open: open
  }))), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "14px"
    }
  }, children) : null);
}

/** Cajón de filtros que entra desde la izquierda y atenúa la tabla detrás. */
function FilterPanel({
  open = true,
  activeCount,
  width = 316,
  onClear,
  onClose,
  children,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 60,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(255,255,255,.72)"
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "relative",
      width: width + "px",
      boxSizing: "border-box",
      padding: "24px",
      overflowY: "auto",
      background: "var(--c10-surface)",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "var(--font-size-xl)",
      fontWeight: "var(--font-weight-bold)",
      color: "var(--c10-text-primary)"
    }
  }, "Filtros", activeCount ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "22px",
      height: "22px",
      borderRadius: "var(--radius-full)",
      background: "var(--c10-blue)",
      color: "#fff",
      fontSize: "var(--font-size-xs)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: 1
    }
  }, activeCount) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-blue)"
    }
  }, "Limpiar"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: 0,
      color: "var(--c10-text-secondary)",
      fontSize: "16px",
      lineHeight: 1
    }
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--c10-border)",
      marginBottom: "24px"
    }
  }), children));
}
Object.assign(__ds_scope, { FilterSection, FilterPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterPanel.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  value,
  defaultValue,
  placeholder,
  type = "text",
  disabled = false,
  invalid = false,
  iconLeft,
  size = "md",
  onChange,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "lg" ? "48px" : size === "sm" ? "36px" : "40px";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      color: "var(--c10-text-muted)"
    }
  }, iconLeft) : null, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      height: h,
      boxSizing: "border-box",
      padding: iconLeft ? "0 8px 0 32px" : "0 8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "#475569",
      background: "var(--c10-surface)",
      borderRadius: "var(--radius-md)",
      outline: "none",
      border: "1px solid " + (invalid ? "var(--c10-danger)" : focus ? "var(--c10-blue)" : "var(--c10-border)"),
      boxShadow: focus ? "var(--ring-focus)" : "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "text",
      transition: "var(--transition-fast)",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  checked = false,
  label,
  disabled = false,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(true),
    style: {
      width: 16,
      height: 16,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      borderRadius: "var(--radius-full)",
      border: "1px solid " + (checked ? "var(--c10-blue)" : "var(--c10-border-strong)"),
      background: "var(--c10-surface)",
      transition: "var(--transition-fast)"
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "var(--radius-full)",
      background: "var(--c10-blue)"
    }
  }) : null), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  value,
  defaultValue,
  options = [],
  placeholder = "Seleccionar",
  disabled = false,
  onChange,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      height: "40px",
      boxSizing: "border-box",
      padding: "0 32px 0 8px",
      appearance: "none",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "#475569",
      background: "var(--c10-surface)",
      borderRadius: "var(--radius-md)",
      outline: "none",
      border: "1px solid " + (focus ? "var(--c10-blue)" : "var(--c10-border)"),
      boxShadow: focus ? "var(--ring-focus)" : "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "var(--transition-fast)",
      ...style
    }
  }, placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--c10-text-muted)",
      fontSize: "10px"
    }
  }, "\u25BC"));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked = false,
  label,
  disabled = false,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "var(--c10-text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 44,
      height: 24,
      borderRadius: "var(--radius-full)",
      padding: 2,
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
      transition: "var(--transition-fast)",
      background: checked ? "var(--c10-blue)" : "var(--c10-border-strong)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-full)",
      background: "#fff",
      boxShadow: "var(--shadow-md)",
      transform: checked ? "translateX(20px)" : "translateX(0)",
      transition: "transform var(--duration-fast) var(--ease-standard)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function Textarea({
  value,
  defaultValue,
  placeholder,
  rows = 4,
  disabled = false,
  onChange,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", {
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      boxSizing: "border-box",
      minHeight: "80px",
      padding: "10px 8px",
      resize: "vertical",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      lineHeight: "var(--line-height-normal)",
      color: "var(--c10-text-primary)",
      background: "var(--c10-surface)",
      borderRadius: "var(--radius-md)",
      outline: "none",
      border: "1px solid " + (focus ? "var(--c10-blue)" : "var(--c10-border)"),
      boxShadow: focus ? "var(--ring-focus)" : "none",
      opacity: disabled ? 0.5 : 1,
      transition: "var(--transition-fast)",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lucide path data — lucide-react is the product's icon set. */
const Svg = ({
  children,
  size = 18,
  strokeWidth = 2,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    flexShrink: 0,
    ...style
  }
}, children);
const Building = p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("rect", {
  width: "16",
  height: "20",
  x: "4",
  y: "2",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"
}));
const Chevron = ({
  open,
  ...p
}) => /*#__PURE__*/React.createElement(Svg, _extends({}, p, {
  size: 16
}), /*#__PURE__*/React.createElement("path", {
  d: open ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"
}));
const Bell = p => /*#__PURE__*/React.createElement(Svg, _extends({}, p, {
  size: 20
}), /*#__PURE__*/React.createElement("path", {
  d: "M10.268 21a2 2 0 0 0 3.464 0M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
}));

/**
 * Barra principal de todas las pantallas autenticadas.
 * Izquierda: logo + selector de ubicación. Derecha: mega menú, notificaciones y avatar.
 */
function AppHeader({
  logoSrc,
  logoAlt = "Clave 10",
  location = "Seleccionar ubicación",
  items = [],
  activeItem,
  notificationCount = 0,
  user,
  onSelect,
  onLocationClick,
  onNotificationsClick,
  style
}) {
  const [open, setOpen] = React.useState(null);
  const norm = items.map(it => typeof it === "string" ? {
    label: it
  } : it);
  const current = norm.find(it => it.label === open);
  return /*#__PURE__*/React.createElement("header", {
    onMouseLeave: () => setOpen(null),
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%",
      boxSizing: "border-box",
      background: "var(--c10-surface)",
      borderBottom: "1px solid var(--c10-border)",
      boxShadow: "var(--shadow-sm)",
      padding: "10px 24px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "24px"
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: logoAlt,
    style: {
      height: "30px",
      width: "auto",
      objectFit: "contain",
      flexShrink: 0
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-lg)",
      fontWeight: "var(--font-weight-bold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--c10-navy)",
      flexShrink: 0
    }
  }, "CLAVE 10"), /*#__PURE__*/React.createElement("button", {
    onClick: onLocationClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      height: "36px",
      padding: "0 12px",
      border: "none",
      background: "transparent",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      flexShrink: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-normal)",
      color: "#171717"
    }
  }, /*#__PURE__*/React.createElement(Building, {
    size: 18,
    style: {
      color: "var(--c10-text-secondary)"
    }
  }), location, /*#__PURE__*/React.createElement(Chevron, {
    style: {
      color: "var(--c10-text-secondary)"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "2px",
      marginLeft: "auto"
    }
  }, norm.map(it => {
    const isOpen = open === it.label;
    const active = it.label === activeItem;
    return /*#__PURE__*/React.createElement("button", {
      key: it.label,
      onMouseEnter: () => setOpen(it.sections ? it.label : null),
      onClick: () => {
        onSelect && onSelect(it.label);
        setOpen(it.sections && !isOpen ? it.label : null);
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        height: "36px",
        padding: "0 12px",
        border: "none",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "var(--transition-fast)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--font-size-sm)",
        fontWeight: active || isOpen ? "var(--font-weight-medium)" : "var(--font-weight-normal)",
        background: isOpen ? "var(--c10-surface-sunken)" : "transparent",
        color: active ? "var(--c10-blue)" : "#171717"
      }
    }, it.label, it.sections ? /*#__PURE__*/React.createElement(Chevron, {
      open: isOpen,
      style: {
        color: "var(--c10-text-secondary)"
      }
    }) : null);
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onNotificationsClick,
    "aria-label": "Notificaciones",
    style: {
      position: "relative",
      width: 36,
      height: 36,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      background: "transparent",
      borderRadius: "var(--radius-full)",
      cursor: "pointer",
      flexShrink: 0,
      color: "var(--c10-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Bell, null), notificationCount > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      right: 4,
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      background: "var(--c10-danger)",
      color: "#fff",
      fontSize: "10px",
      fontWeight: "var(--font-weight-bold)",
      lineHeight: 1,
      border: "2px solid var(--c10-surface)"
    }
  }, notificationCount > 9 ? "9+" : notificationCount) : null), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: user && user.avatar,
    name: user && user.name,
    size: 40,
    style: {
      flexShrink: 0,
      boxShadow: "0 0 0 2px var(--c10-border)",
      background: "#CFE2FF"
    }
  })), current && current.sections ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "100%",
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: "auto",
      display: "flex",
      gap: "48px",
      padding: "24px 32px",
      background: "var(--c10-surface)",
      border: "1px solid var(--c10-border)",
      borderTop: "none",
      borderRadius: "0 0 var(--radius-md) var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      minWidth: "440px"
    }
  }, current.sections.map(sec => /*#__PURE__*/React.createElement("div", {
    key: sec.title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      minWidth: "180px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-base)",
      fontWeight: "var(--font-weight-bold)",
      color: "var(--c10-text-primary)"
    }
  }, sec.title), sec.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect(l);
      setOpen(null);
    },
    style: {
      fontSize: "var(--font-size-base)",
      color: "var(--c10-text-primary)",
      textDecoration: "none"
    }
  }, l)))))) : null);
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedControl.jsx
try { (() => {
/* Grupo de celdas unidas con borde compartido; la activa se pinta en azul de acción. */
function SegmentedControl({
  value,
  options = [],
  onChange,
  iconOnly = false,
  height = 40,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "stretch",
      height,
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      border: "1px solid #E2E8F0",
      background: "var(--c10-surface)",
      ...style
    }
  }, options.map((o, i) => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => onChange && onChange(o.value),
      title: o.label,
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        width: iconOnly ? height : "auto",
        padding: iconOnly ? 0 : "0 24px",
        border: "none",
        borderLeft: i === 0 ? "none" : "1px solid #E2E8F0",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "var(--transition-fast)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--font-size-sm)",
        fontWeight: active ? "var(--font-weight-medium)" : "var(--font-weight-normal)",
        background: active ? "var(--c10-blue)" : "transparent",
        color: active ? "#fff" : "#475569"
      }
    }, o.icon, iconOnly ? null : o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
const Search = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21 21-4.3-4.3"
}));

/**
 * Header secundario de sección: título + KPI de registros a la izquierda;
 * buscador, acción verde, subnavegación y modo de visualización a la derecha.
 */
function SectionHeader({
  title,
  totalRecords,
  recordsLabel = "registros",
  searchPlaceholder = "Buscar...",
  onSearch,
  actionLabel,
  onAction,
  subTabs,
  subTab,
  onSubTabChange,
  viewModes,
  viewMode,
  onViewModeChange,
  children,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
      boxSizing: "border-box",
      padding: "20px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "10px",
      minWidth: "fit-content"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "var(--font-size-lg)",
      fontWeight: "var(--font-weight-semibold)",
      letterSpacing: "var(--tracking-tight)",
      color: "#0F172A",
      whiteSpace: "nowrap"
    }
  }, title), totalRecords !== undefined ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      padding: "2px 8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-medium)",
      lineHeight: 1.45,
      whiteSpace: "nowrap",
      fontVariantNumeric: "tabular-nums",
      color: "#64748B"
    }
  }, totalRecords, " ", recordsLabel) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "236px",
      height: "40px",
      boxSizing: "border-box",
      padding: "0 8px",
      borderRadius: "var(--radius-md)",
      background: "var(--c10-surface)",
      transition: "var(--transition-fast)",
      border: "1px solid " + (focus ? "var(--c10-blue)" : "#E2E8F0"),
      boxShadow: focus ? "var(--ring-focus)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "#94A3B8"
    }
  }, /*#__PURE__*/React.createElement(Search, null)), /*#__PURE__*/React.createElement("input", {
    placeholder: searchPlaceholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onChange: e => onSearch && onSearch(e.target.value),
    style: {
      width: "100%",
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      color: "#475569"
    }
  })), actionLabel ? /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      height: "40px",
      padding: "0 16px",
      border: "none",
      borderRadius: "var(--radius-md)",
      background: "#16A34A",
      color: "#fff",
      cursor: "pointer",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--font-size-sm)",
      fontWeight: "var(--font-weight-medium)",
      transition: "var(--transition-fast)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-lg)",
      fontWeight: "var(--font-weight-medium)",
      lineHeight: 1,
      marginTop: "-1px"
    }
  }, "+"), actionLabel) : null, subTabs && subTabs.length ? /*#__PURE__*/React.createElement(__ds_scope.SegmentedControl, {
    value: subTab,
    options: subTabs,
    onChange: onSubTabChange
  }) : null, viewModes && viewModes.length ? /*#__PURE__*/React.createElement(__ds_scope.SegmentedControl, {
    value: viewMode,
    options: viewModes,
    onChange: onViewModeChange,
    iconOnly: true
  }) : null, children));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  value,
  items = [],
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: "40px",
      padding: "4px",
      boxSizing: "border-box",
      background: "var(--c10-surface-sunken)",
      borderRadius: "var(--radius-md)",
      gap: "4px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, items.map(it => {
    const v = typeof it === "string" ? it : it.value;
    const l = typeof it === "string" ? it : it.label;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => onChange && onChange(v),
      style: {
        height: "100%",
        padding: "0 12px",
        border: "none",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--font-size-sm)",
        fontWeight: "var(--font-weight-normal)",
        transition: "var(--transition-fast)",
        background: active ? "var(--c10-surface)" : "transparent",
        color: active ? "var(--c10-text-primary)" : "var(--c10-text-secondary)",
        boxShadow: active ? "var(--shadow-sm)" : "none"
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ViewModeIcons.jsx
try { (() => {
const Icon = ({
  children
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, children);

/** Los tres modos de visualización estándar de una sección, en orden. */
function ViewModeIcons() {
  return null;
}
const VIEW_MODES = [{
  value: "cards",
  label: "Tarjetas",
  icon: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "3",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "14",
    y: "3",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "14",
    y: "14",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "14",
    rx: "1"
  }))
}, {
  value: "list",
  label: "Tarjetas en lista",
  icon: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "3",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "14",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 4h7M14 9h7M14 15h7M14 20h7"
  }))
}, {
  value: "table",
  label: "Tabla",
  icon: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 9h18M3 15h18M9 3v18M15 3v18"
  }))
}];
Object.assign(__ds_scope, { ViewModeIcons, VIEW_MODES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ViewModeIcons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plataforma/App.jsx
try { (() => {
const {
  AppHeader
} = window.Clave10DesignSystem_b774bd;
const {
  LoginScreen,
  InicioScreen,
  PasesScreen,
  TurnosScreen,
  BitacorasScreen
} = window;
const NAV = [{
  label: "Accesos",
  sections: [{
    title: "Accesos",
    links: ["Bitácora de entradas y salidas", "Personal", "Vehículos"]
  }]
}, {
  label: "Pases de entrada",
  sections: [{
    title: "Pases de entrada",
    links: ["Nuevo pase", "Activos", "Por autorizar", "En proceso", "Todos"]
  }, {
    title: "Transportistas",
    links: ["Nuevo pase transportista"]
  }]
}, {
  label: "Caseta",
  sections: [{
    title: "Caseta",
    links: ["Turnos", "Rondines", "Inspecciones"]
  }]
}, {
  label: "Seguridad",
  sections: [{
    title: "Seguridad",
    links: ["Bitácoras", "Incidencias", "Fallas"]
  }]
}, {
  label: "Activos",
  sections: [{
    title: "Activos",
    links: ["Artículos perdidos", "Paquetería", "Concesionados"]
  }]
}, {
  label: "Ubicaciones"
}];
const ROUTES = {
  "Bitácora de entradas y salidas": "Pases",
  "Pases de entrada": "Pases",
  "Todos": "Pases",
  "Activos": "Pases",
  "Por autorizar": "Pases",
  "En proceso": "Pases",
  "Nuevo pase": "Pases",
  "Personal": "Pases",
  "Vehículos": "Pases",
  "Caseta": "Turnos",
  "Turnos": "Turnos",
  "Seguridad": "Bitácoras",
  "Bitácoras": "Bitácoras",
  "Incidencias": "Bitácoras",
  "Fallas": "Bitácoras",
  "Accesos": "Pases"
};
function App() {
  const [auth, setAuth] = React.useState(false);
  const [screen, setScreen] = React.useState("Inicio");
  const [active, setActive] = React.useState("Accesos");
  if (!auth) return /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: () => setAuth(true)
  });
  const go = label => {
    const next = ROUTES[label];
    if (next) {
      setScreen(next);
      setActive(label === "Ubicaciones" ? active : NAV.find(n => n.label === label) ? label : active);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: "var(--surface-app)"
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    logoSrc: "../../assets/logo.png",
    location: "Planta Monterrey",
    items: NAV,
    activeItem: active,
    notificationCount: 3,
    onSelect: go,
    user: {
      name: "Emiliano Zapata",
      avatar: "../../assets/imagery/profile.png"
    }
  }), screen === "Inicio" ? /*#__PURE__*/React.createElement(InicioScreen, {
    onOpen: id => {
      const map = {
        pases: "Pases",
        turnos: "Turnos",
        bitacoras: "Bitácoras"
      };
      if (map[id]) {
        setScreen(map[id]);
        setActive(id === "pases" ? "Pases de entrada" : id === "turnos" ? "Caseta" : "Seguridad");
      }
    }
  }) : screen === "Pases" ? /*#__PURE__*/React.createElement(PasesScreen, null) : screen === "Turnos" ? /*#__PURE__*/React.createElement(TurnosScreen, null) : /*#__PURE__*/React.createElement(BitacorasScreen, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plataforma/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plataforma/BitacorasScreen.jsx
try { (() => {
const {
  SectionHeader,
  VIEW_MODES,
  PhotoCard,
  EstatusBadge,
  EmptyState,
  DataTable,
  RowAction,
  RowActions,
  RecordListItem,
  FilterPanel,
  FilterSection,
  FilterChip,
  Select,
  DetailPanel,
  DetailSection,
  DetailField,
  Button,
  KpiChip
} = window.Clave10DesignSystem_b774bd;
const {
  IconEye,
  IconPencil,
  IconDownload,
  IconPrint
} = window;
const BITACORAS_ROWS = [{
  folio: "R-2291",
  title: "Rondín nocturno — área 4",
  desc: "Recorrido completo sin novedades.",
  estatus: "Sin incidencias",
  tag: "Rondín",
  img: "../../assets/imagery/incidencia2.png",
  meta: ["Caseta Norte · 02:14", "Ana Ruiz"]
}, {
  folio: "I-0871",
  title: "Puerta de andén forzada",
  desc: "Se detectó cerradura dañada en el andén 3.",
  estatus: "Abierto",
  tag: "Incidencia",
  img: "../../assets/imagery/incidencia1.png",
  meta: ["Andén 3 · 03:40", "Luis Márquez"]
}, {
  folio: "F-0442",
  title: "Luminaria fuera de servicio",
  desc: "Falla reportada a mantenimiento.",
  estatus: "En proceso",
  tag: "Falla",
  img: "../../assets/imagery/falla1.png",
  meta: ["Patio B · 04:05", "Iván Robles"]
}];
const BITACORAS_SUB_TABS = [{
  value: "todos",
  label: "Todos"
}, {
  value: "Incidencia",
  label: "Incidencias"
}, {
  value: "Falla",
  label: "Fallas"
}];
function BitacorasScreen() {
  const [view, setView] = React.useState("cards");
  const [tab, setTab] = React.useState("todos");
  const [sel, setSel] = React.useState(null);
  const [filtros, setFiltros] = React.useState(false);
  const [estatus, setEstatus] = React.useState(null);
  const [detalle, setDetalle] = React.useState(null);
  const shown = tab === "todos" ? BITACORAS_ROWS : BITACORAS_ROWS.filter(r => r.tag === tab);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 24px",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Bit\xE1coras",
    totalRecords: shown.length,
    actionLabel: "Nueva Nota",
    onAction: () => {},
    subTabs: BITACORAS_SUB_TABS,
    subTab: tab,
    onSubTabChange: setTab,
    viewModes: VIEW_MODES,
    viewMode: view,
    onViewModeChange: setView
  }), /*#__PURE__*/React.createElement("div", null, shown.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    title: "No se encontraron registros",
    description: "Ajusta los filtros o el rango de fechas."
  }) : view === "table" ? /*#__PURE__*/React.createElement(DataTable, {
    onFilterToggle: () => setFiltros(true),
    filterCount: estatus ? 1 : 0,
    rows: shown,
    columns: [{
      header: "Opciones",
      width: "120px",
      cell: r => /*#__PURE__*/React.createElement(RowActions, null, /*#__PURE__*/React.createElement(RowAction, {
        label: "Ver detalle",
        icon: /*#__PURE__*/React.createElement(IconEye, null),
        shape: "plain",
        onClick: () => setDetalle(r)
      }), /*#__PURE__*/React.createElement(RowAction, {
        label: "Editar",
        icon: /*#__PURE__*/React.createElement(IconPencil, null),
        shape: "plain"
      }), /*#__PURE__*/React.createElement(RowAction, {
        label: "Descargar",
        icon: /*#__PURE__*/React.createElement(IconDownload, null),
        shape: "plain"
      }))
    }, {
      header: "Folio",
      key: "folio"
    }, {
      header: "Registro",
      key: "title"
    }, {
      header: "Tipo",
      key: "tag"
    }, {
      header: "Estatus",
      cell: r => /*#__PURE__*/React.createElement(EstatusBadge, {
        estatus: r.estatus,
        solid: true
      })
    }]
  }) : view === "cards" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16
    }
  }, shown.map(r => /*#__PURE__*/React.createElement(PhotoCard, {
    key: r.folio,
    image: r.img,
    title: r.title,
    subtitle: r.desc,
    folio: r.folio,
    estatus: r.estatus,
    perfil: r.tag,
    selected: sel === r.folio,
    onClick: () => {
      setSel(r.folio);
      setDetalle(r);
    },
    details: r.meta.map(v => ({
      value: v
    })),
    style: {
      width: "auto"
    }
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, shown.map(r => /*#__PURE__*/React.createElement(RecordListItem, {
    key: r.folio,
    image: r.img,
    thumbnails: [r.img],
    title: r.title,
    subtitle: r.desc,
    estatus: r.estatus,
    perfil: r.tag,
    folio: r.folio,
    selected: sel === r.folio,
    onClick: () => {
      setSel(r.folio);
      setDetalle(r);
    },
    fields: [{
      label: "Caseta",
      value: r.meta[0].split(" · ")[0]
    }, {
      label: "Hora",
      value: r.meta[0].split(" · ")[1]
    }, {
      label: "Reportado por",
      value: r.meta[1]
    }],
    actions: /*#__PURE__*/React.createElement(RowActions, null, /*#__PURE__*/React.createElement(RowAction, {
      label: "Ver detalle",
      icon: /*#__PURE__*/React.createElement(IconEye, null),
      shape: "circle",
      onClick: () => setDetalle(r)
    }), /*#__PURE__*/React.createElement(RowAction, {
      label: "Editar",
      icon: /*#__PURE__*/React.createElement(IconPencil, null),
      shape: "circle"
    }), /*#__PURE__*/React.createElement(RowAction, {
      label: "Descargar",
      icon: /*#__PURE__*/React.createElement(IconDownload, null),
      shape: "circle"
    }))
  })))), /*#__PURE__*/React.createElement(DetailPanel, {
    open: !!detalle,
    eyebrow: "Detalle del registro",
    title: detalle ? "#" + detalle.folio : "",
    badge: detalle ? /*#__PURE__*/React.createElement(EstatusBadge, {
      estatus: detalle.estatus
    }) : null,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RowAction, {
      label: "Imprimir",
      icon: /*#__PURE__*/React.createElement(IconPrint, null),
      size: 36
    }), /*#__PURE__*/React.createElement(RowAction, {
      label: "Descargar",
      icon: /*#__PURE__*/React.createElement(IconDownload, null),
      size: 36
    })),
    storageKey: "c10.bitacoras.detalle.ancho",
    footerNote: "Bit\xE1cora completa disponible en el expediente del folio",
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setDetalle(null)
    }, "Cerrar"),
    onClose: () => setDetalle(null)
  }, detalle ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DetailSection, {
    title: "Seguimiento",
    meta: "Etapa 2 de 4 \xB7 En revisi\xF3n de supervisi\xF3n",
    collapsible: true,
    defaultOpen: false
  }), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Ubicaci\xF3n del registro"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 64,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "Caseta",
    value: detalle.meta[0].split(" · ")[0]
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Hora",
    value: detalle.meta[0].split(" · ")[1]
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Reportado por",
    value: detalle.meta[1]
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Tipo",
    value: detalle.tag
  }))), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Descripci\xF3n"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--font-size-base)",
      lineHeight: "var(--line-height-relaxed)",
      color: "var(--text-body)",
      textWrap: "pretty"
    }
  }, detalle.desc)), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Evidencia fotogr\xE1fica",
    meta: "1 archivo"
  }, /*#__PURE__*/React.createElement("img", {
    src: detalle.img,
    alt: "",
    style: {
      width: 280,
      height: 200,
      objectFit: "cover",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-sunken)"
    }
  })), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Seguimientos",
    meta: "2 comentarios",
    collapsible: true,
    defaultOpen: false
  }), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Responsables",
    meta: "4 involucrados",
    collapsible: true,
    defaultOpen: false
  })) : null), /*#__PURE__*/React.createElement(FilterPanel, {
    open: filtros,
    activeCount: estatus ? 1 : 0,
    onClose: () => setFiltros(false),
    onClear: () => setEstatus(null)
  }, /*#__PURE__*/React.createElement(FilterSection, {
    title: "Fecha"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["Todos", "Hoy", "Esta semana", "Este mes"],
    placeholder: "Todos"
  })), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Estatus",
    count: estatus ? 1 : 0
  }, /*#__PURE__*/React.createElement(FilterChip, {
    label: "Sin incidencias",
    count: 1,
    selected: estatus === "ok",
    onClick: () => setEstatus("ok")
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "Abierto",
    count: 1,
    selected: estatus === "abierto",
    onClick: () => setEstatus("abierto")
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "En proceso",
    count: 1,
    selected: estatus === "proceso",
    onClick: () => setEstatus("proceso")
  })), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Reportado por",
    defaultOpen: false
  })));
}
Object.assign(window, {
  BitacorasScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plataforma/BitacorasScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plataforma/InicioScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MODULES = [{
  id: "pases",
  label: "Pases de entrada"
}, {
  id: "turnos",
  label: "Turnos"
}, {
  id: "accesos",
  label: "Accesos"
}, {
  id: "bitacoras",
  label: "Bitácoras"
}, {
  id: "incidencias",
  label: "Incidencias"
}, {
  id: "rondines",
  label: "Rondines"
}, {
  id: "articulos",
  label: "Artículos"
}, {
  id: "reportes",
  label: "Reportes"
}, {
  id: "inspecciones",
  label: "Inspecciones"
}];
function ModuleTile({
  id,
  label,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 256,
      height: 160,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: 16,
      boxSizing: "border-box",
      borderRadius: "var(--radius-lg)",
      cursor: "pointer",
      background: h ? "#E5E7EB" : "#F3F4F6",
      boxShadow: h ? "0 4px 4px rgba(0,0,0,.2)" : "var(--shadow-md)",
      transform: h ? "scale(1.05)" : "scale(1)",
      transition: "var(--transition-normal)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/" + id + ".svg",
    alt: label,
    style: {
      height: 48,
      opacity: h ? .75 : 1
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: "var(--font-size-md)"
    }
  }, label));
}
function InicioScreen({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "32px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
      justifyContent: "center",
      maxWidth: 860
    }
  }, MODULES.map(m => /*#__PURE__*/React.createElement(ModuleTile, _extends({
    key: m.id
  }, m, {
    onClick: () => onOpen && onOpen(m.id)
  })))));
}
Object.assign(window, {
  InicioScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plataforma/InicioScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plataforma/LoginScreen.jsx
try { (() => {
const {
  Button,
  Input,
  Card
} = window.Clave10DesignSystem_b774bd;
function LoginScreen({
  onLogin
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      background: "#F3F4F6"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    elevation: "md",
    padding: "48px 40px",
    style: {
      width: 440,
      boxSizing: "border-box",
      borderRadius: "var(--radius-xl)",
      border: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "Clave 10",
    style: {
      width: 174,
      marginBottom: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "lg",
    placeholder: "Usuario",
    defaultValue: "ana.ruiz"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "lg",
    placeholder: "Password",
    type: show ? "text" : "password",
    defaultValue: "clave10"
  }), /*#__PURE__*/React.createElement("span", {
    onClick: () => setShow(!show),
    style: {
      position: "absolute",
      right: 14,
      top: 14,
      cursor: "pointer",
      color: "var(--text-placeholder)",
      fontSize: 14
    }
  }, show ? "◎" : "◉"))), /*#__PURE__*/React.createElement(Button, {
    size: "xl",
    fullWidth: true,
    onClick: onLogin,
    style: {
      marginTop: 24,
      background: "var(--c10-blue-login)",
      fontWeight: 700
    }
  }, "Iniciar Sesi\xF3n"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm",
    style: {
      marginTop: 16,
      fontWeight: 600
    }
  }, "\xBFOlvidaste tu contrase\xF1a?")));
}
Object.assign(window, {
  LoginScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plataforma/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plataforma/PasesScreen.jsx
try { (() => {
const {
  SectionHeader,
  VIEW_MODES,
  DataTable,
  EstatusBadge,
  RowAction,
  RowActions,
  FilterPanel,
  FilterSection,
  FilterChip,
  Select,
  Pagination,
  PhotoCard,
  RecordListItem,
  Modal,
  Button,
  Field,
  Input,
  Textarea,
  DetailPanel,
  DetailSection,
  DetailField
} = window.Clave10DesignSystem_b774bd;
const {
  IconEye,
  IconPencil,
  IconPrint,
  IconBadgeId,
  IconCar,
  IconTool,
  IconArrowOut,
  IconPin,
  IconUser,
  IconCalendar
} = window;
const PASES_IMG = n => "../../assets/imagery/" + n;
const PASES_ROWS = [{
  folio: "8612-10",
  nombre: "Margarita Gomez Velazquez",
  empresa: "Linkaform",
  perfil: "Auditor de Gobierno",
  caseta: "Caseta Principal",
  visita: "Juan Escutia",
  entrada: "2026-07-31 12:14:56",
  salida: "",
  status: "Entrada",
  img: PASES_IMG("guardia1.png"),
  thumbs: [PASES_IMG("guardia1.png"), PASES_IMG("incidencia2.png")]
}, {
  folio: "8540-10",
  nombre: "Leyva Mabel Ivonne Castañares",
  empresa: "Linkaform",
  perfil: "Visita General",
  caseta: "Caseta Principal",
  visita: "Juan Escutia",
  entrada: "2026-07-28 12:24:12",
  salida: "",
  status: "Entrada",
  img: PASES_IMG("incidencia2.png"),
  thumbs: [PASES_IMG("incidencia2.png"), PASES_IMG("nota1.png")]
}, {
  folio: "8539-10",
  nombre: "José Velázquez Apolinar",
  empresa: "Reprsetaciones de audio",
  perfil: "Visita General",
  caseta: "Caseta Principal",
  visita: "Emiliano Zapata",
  entrada: "2026-07-28 12:21:13",
  salida: "",
  status: "Entrada",
  img: PASES_IMG("nota1.png"),
  thumbs: [PASES_IMG("nota1.png")]
}, {
  folio: "8538-10",
  nombre: "Miguel",
  empresa: "Lkf",
  perfil: "Visita General",
  caseta: "Caseta Principal",
  visita: "Emiliano Zapata",
  entrada: "2026-07-27 20:16:57",
  salida: "2026-07-28 18:51:01",
  status: "Salida",
  img: PASES_IMG("empleado1.png"),
  thumbs: [PASES_IMG("empleado1.png")]
}, {
  folio: "8537-10",
  nombre: "Karla Godoy Recendiz",
  empresa: "Lkf",
  perfil: "Visita General",
  caseta: "Caseta Principal",
  visita: "Emiliano Zapata",
  entrada: "2026-07-27 18:32:05",
  salida: "",
  status: "Entrada",
  img: PASES_IMG("empleado2.png"),
  thumbs: [PASES_IMG("empleado2.png")]
}, {
  folio: "8536-10",
  nombre: "Christopher Yosiel Ramirez Canales",
  empresa: "Lkf",
  perfil: "Visita General",
  caseta: "Caseta Principal",
  visita: "Emiliano Zapata",
  entrada: "2026-07-27 18:32:05",
  salida: "",
  status: "Entrada",
  img: PASES_IMG("empleado3.png"),
  thumbs: [PASES_IMG("empleado3.png")]
}];
const PASES_SUB_TABS = [{
  value: "personal",
  label: "Personal"
}, {
  value: "vehiculos",
  label: "Vehículos"
}, {
  value: "equipos",
  label: "Equipos"
}];

/* La misma fila de acciones en los tres modos; en tabla va "plain", en tarjetas "circle". */
function PasesRowActions({
  pase,
  shape,
  onVer
}) {
  const cerrado = pase.status === "Salida";
  return /*#__PURE__*/React.createElement(RowActions, null, /*#__PURE__*/React.createElement(RowAction, {
    label: "Ver detalle",
    icon: /*#__PURE__*/React.createElement(IconEye, null),
    shape: shape,
    onClick: onVer
  }), /*#__PURE__*/React.createElement(RowAction, {
    label: "Veh\xEDculo",
    icon: /*#__PURE__*/React.createElement(IconCar, null),
    shape: shape,
    disabled: cerrado
  }), /*#__PURE__*/React.createElement(RowAction, {
    label: "Equipo",
    icon: /*#__PURE__*/React.createElement(IconTool, null),
    shape: shape,
    disabled: cerrado
  }), /*#__PURE__*/React.createElement(RowAction, {
    label: "Identificaci\xF3n",
    icon: /*#__PURE__*/React.createElement(IconBadgeId, null),
    shape: shape,
    disabled: cerrado
  }), /*#__PURE__*/React.createElement(RowAction, {
    label: "Imprimir",
    icon: /*#__PURE__*/React.createElement(IconPrint, null),
    shape: shape
  }), /*#__PURE__*/React.createElement(RowAction, {
    label: "Registrar salida",
    icon: /*#__PURE__*/React.createElement(IconArrowOut, null),
    shape: shape,
    tone: "accent",
    disabled: cerrado
  }));
}
function PasesScreen() {
  const [view, setView] = React.useState("cards");
  const [tab, setTab] = React.useState("personal");
  const [page, setPage] = React.useState(1);
  const [modal, setModal] = React.useState(false);
  const [filtros, setFiltros] = React.useState(false);
  const [detalle, setDetalle] = React.useState(null);
  const [estatus, setEstatus] = React.useState(null);
  const [perfil, setPerfil] = React.useState(null);
  const [sel, setSel] = React.useState([]);
  const activos = (estatus ? 1 : 0) + (perfil ? 1 : 0);
  const toggleSel = folio => setSel(s => s.includes(folio) ? s.filter(f => f !== folio) : s.concat(folio));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 24px",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Bit\xE1cora de Entradas & Salidas",
    totalRecords: 715,
    subTabs: PASES_SUB_TABS,
    subTab: tab,
    onSubTabChange: setTab,
    viewModes: VIEW_MODES,
    viewMode: view,
    onViewModeChange: setView
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-start"
    }
  }, view === "cards" ? /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 320,
      flexShrink: 0,
      padding: 20,
      boxSizing: "border-box",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 12px",
      fontSize: "var(--font-size-md)",
      fontWeight: "var(--font-weight-bold)"
    }
  }, "Filtros"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)",
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Fecha"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["Todos", "Hoy", "Esta semana", "Este mes"],
    placeholder: "Todos"
  })), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Estatus"
  }, /*#__PURE__*/React.createElement(FilterChip, {
    label: "Entrada",
    count: 58,
    selected: estatus === "Entrada",
    onClick: () => setEstatus(estatus === "Entrada" ? null : "Entrada")
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "Salida",
    count: 0,
    selected: estatus === "Salida",
    onClick: () => setEstatus(estatus === "Salida" ? null : "Salida")
  })), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Perfil",
    defaultOpen: false
  }), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Visita a",
    defaultOpen: false
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, view === "cards" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
      gap: 16
    }
  }, PASES_ROWS.map(p => /*#__PURE__*/React.createElement(PhotoCard, {
    key: p.folio,
    image: p.img,
    title: p.nombre,
    subtitle: p.empresa,
    folio: p.folio,
    estatus: p.status,
    perfil: p.perfil,
    style: {
      width: "auto"
    },
    details: [{
      icon: /*#__PURE__*/React.createElement(IconPin, null),
      label: "Ubicación",
      value: p.caseta
    }, {
      icon: /*#__PURE__*/React.createElement(IconUser, null),
      label: "Visita a",
      value: p.visita
    }, {
      icon: /*#__PURE__*/React.createElement(IconCalendar, null),
      label: "Entrada",
      value: p.entrada.slice(0, 16)
    }].concat(p.salida ? [{
      icon: /*#__PURE__*/React.createElement(IconCalendar, null),
      label: "Salida",
      value: p.salida.slice(0, 16),
      tone: "danger"
    }] : []),
    actions: /*#__PURE__*/React.createElement(PasesRowActions, {
      pase: p,
      shape: "circle",
      onVer: () => setDetalle(p)
    })
  }))) : view === "list" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: -4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setFiltros(true)
  }, "Filtros", activos ? " (" + activos + ")" : "")), PASES_ROWS.map(p => /*#__PURE__*/React.createElement(RecordListItem, {
    key: p.folio,
    image: p.img,
    thumbnails: p.thumbs,
    title: p.nombre,
    subtitle: p.empresa,
    estatus: p.status,
    perfil: p.perfil,
    folio: p.folio,
    selectable: true,
    selected: sel.includes(p.folio),
    onSelect: () => toggleSel(p.folio),
    fields: [{
      label: "Caseta",
      value: p.caseta
    }, {
      label: "Visita a",
      value: p.visita
    }, {
      label: "Fecha de entrada",
      value: p.entrada
    }, {
      label: "Fecha de salida",
      value: p.salida
    }, {
      label: "Gafete",
      value: "No asignado"
    }],
    actions: /*#__PURE__*/React.createElement(PasesRowActions, {
      pase: p,
      shape: "circle",
      onVer: () => setDetalle(p)
    })
  }))) : /*#__PURE__*/React.createElement(DataTable, {
    onFilterToggle: () => setFiltros(true),
    filterOpen: filtros,
    filterCount: activos,
    rows: PASES_ROWS,
    columns: [{
      header: "Opciones",
      width: "190px",
      cell: r => /*#__PURE__*/React.createElement(PasesRowActions, {
        pase: r,
        shape: "plain",
        onVer: () => setDetalle(r)
      })
    }, {
      header: "Folio",
      key: "folio",
      width: "80px"
    }, {
      header: "Visitante",
      key: "nombre"
    }, {
      header: "Estatus",
      cell: r => /*#__PURE__*/React.createElement(EstatusBadge, {
        estatus: r.status,
        solid: true
      })
    }, {
      header: "Entrada",
      key: "entrada"
    }, {
      header: "Salida",
      cell: r => r.salida || ""
    }, {
      header: "Tipo",
      key: "perfil"
    }, {
      header: "Empresa",
      key: "empresa"
    }, {
      header: "Visita a",
      key: "visita"
    }, {
      header: "Caseta entrada",
      key: "caseta"
    }, {
      header: "Caseta salida",
      cell: r => r.salida ? r.caseta : ""
    }, {
      header: "Gafete",
      cell: () => "---"
    }, {
      header: "Locker",
      cell: () => "---"
    }, {
      header: "Comentarios",
      cell: () => "---"
    }]
  }), /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    totalPages: 29,
    recordsOnPage: 25,
    totalRecords: 715,
    limit: 25,
    onPageChange: setPage
  }))), /*#__PURE__*/React.createElement(DetailPanel, {
    open: !!detalle,
    eyebrow: "Detalle del pase",
    title: detalle ? "#" + detalle.folio : "",
    badge: detalle ? /*#__PURE__*/React.createElement(EstatusBadge, {
      estatus: detalle.status,
      solid: true
    }) : null,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RowAction, {
      label: "Imprimir",
      icon: /*#__PURE__*/React.createElement(IconPrint, null),
      size: 36
    }), /*#__PURE__*/React.createElement(RowAction, {
      label: "Identificaci\xF3n",
      icon: /*#__PURE__*/React.createElement(IconBadgeId, null),
      size: 36
    })),
    storageKey: "c10.pases.detalle.ancho",
    footerNote: "Historial completo disponible en el expediente del visitante",
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setDetalle(null)
    }, "Cerrar"),
    onClose: () => setDetalle(null)
  }, detalle ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DetailSection, {
    title: "Visitante"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: detalle.img,
    alt: "",
    style: {
      width: 88,
      height: 88,
      objectFit: "cover",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-sunken)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 56,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "Nombre",
    value: detalle.nombre
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Empresa",
    value: detalle.empresa
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Perfil",
    value: detalle.perfil
  })))), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Acceso"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 56,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "Caseta entrada",
    value: detalle.caseta
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Fecha de entrada",
    value: detalle.entrada
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Fecha de salida",
    value: detalle.salida || "---"
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Visita a",
    value: detalle.visita
  }))), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Art\xEDculos declarados",
    meta: "0 l\xEDnea(s)"
  }), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Veh\xEDculo",
    collapsible: true,
    defaultOpen: false
  }), /*#__PURE__*/React.createElement(DetailSection, {
    title: "Seguimiento",
    meta: "Etapa 1 de 2 \xB7 Dentro de la planta",
    collapsible: true,
    defaultOpen: false
  })) : null), /*#__PURE__*/React.createElement(FilterPanel, {
    open: filtros,
    activeCount: activos,
    onClose: () => setFiltros(false),
    onClear: () => {
      setEstatus(null);
      setPerfil(null);
    }
  }, /*#__PURE__*/React.createElement(FilterSection, {
    title: "Fecha"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["Todos", "Hoy", "Esta semana", "Este mes"],
    placeholder: "Todos"
  })), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Estatus",
    count: estatus ? 1 : 0
  }, /*#__PURE__*/React.createElement(FilterChip, {
    label: "Entrada",
    count: 58,
    selected: estatus === "Entrada",
    onClick: () => setEstatus("Entrada")
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "Salida",
    count: 0,
    selected: estatus === "Salida",
    onClick: () => setEstatus("Salida")
  })), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Perfil",
    count: perfil ? 1 : 0
  }, /*#__PURE__*/React.createElement(FilterChip, {
    label: "Visita General",
    count: 42,
    selected: perfil === "Visita General",
    onClick: () => setPerfil("Visita General")
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "Auditor de Gobierno",
    count: 4,
    selected: perfil === "Auditor de Gobierno",
    onClick: () => setPerfil("Auditor de Gobierno")
  })), /*#__PURE__*/React.createElement(FilterSection, {
    title: "Visita a",
    defaultOpen: false
  })), /*#__PURE__*/React.createElement(Modal, {
    open: modal,
    title: "Nuevo pase de entrada",
    description: "Registra al visitante y la ubicaci\xF3n autorizada.",
    onClose: () => setModal(false),
    width: 520,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setModal(false)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => setModal(false)
    }, "Generar Pase"))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Field, {
    label: "Nombre del visitante",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Nombre completo"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Motivo de la visita"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 2,
    placeholder: "Descripci\xF3n breve"
  })))));
}
Object.assign(window, {
  PasesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plataforma/PasesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plataforma/TurnosScreen.jsx
try { (() => {
const {
  Avatar,
  Button,
  Badge,
  Card,
  DataTable,
  KpiChip,
  Modal,
  Toast
} = window.Clave10DesignSystem_b774bd;
function Info({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--font-size-sm)",
      color: "var(--text-subtle)"
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontWeight: 700
    }
  }, value));
}
function TurnosScreen() {
  const [open, setOpen] = React.useState(true);
  const [confirm, setConfirm] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      position: "relative",
      minHeight: 640
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "25%",
      minWidth: 300,
      padding: "24px",
      borderRight: "1px solid #F0F2F5",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: "../../assets/imagery/profile.png",
    name: "Ana Ruiz",
    size: 128,
    style: {
      margin: "0 auto",
      boxShadow: "var(--shadow-portrait)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: "var(--font-size-xl)"
    }
  }, "Ana Ruiz Delgado"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontWeight: 700
    }
  }, "Guardia de acceso"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      color: "var(--text-subtle)"
    }
  }, "ana.ruiz@clave10.com"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "process"
  }, "Supervisor"), /*#__PURE__*/React.createElement(Badge, {
    tone: "process"
  }, "Primeros auxilios"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "+2"))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    style: {
      background: "#F3F4F6",
      border: "none",
      color: "#374151"
    }
  }, "Cambiar Imagen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Info, {
    label: "Ubicaci\xF3n:",
    value: "Planta Monterrey"
  }), /*#__PURE__*/React.createElement(Info, {
    label: "Ciudad:",
    value: "Apodaca"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Info, {
    label: "Estado:",
    value: "Nuevo Le\xF3n"
  }), /*#__PURE__*/React.createElement(Info, {
    label: "Direcci\xF3n:",
    value: "Av. Industrial 1200"
  })), /*#__PURE__*/React.createElement(Info, {
    label: "Caseta:",
    value: "Caseta Norte"
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true
  }, "Cambiar Caseta"), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    style: {
      background: "#7C3AED"
    }
  }, "Ingresar Como Suplente")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      color: "var(--text-subtle)"
    }
  }, "Estatus de la caseta:"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    shape: "square",
    style: {
      background: open ? "#16A34A" : "#DC2626",
      fontSize: "var(--font-size-base)",
      padding: "4px 12px"
    }
  }, open ? "Abierta" : "Cerrada"))), /*#__PURE__*/React.createElement("section", {
    style: {
      flex: 1,
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: "var(--font-size-xl)"
    }
  }, "Detalles del turno"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 40,
      marginTop: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      height: 128,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "2px dashed #9CA3AF",
      boxShadow: "var(--shadow-portrait)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/guardia1.png",
    alt: "Inicio de turno",
    style: {
      width: 112,
      height: 96,
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--font-size-xs)",
      color: "var(--text-subtle)"
    }
  }, "Inicio de turno")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Fecha:"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0"
    }
  }, "31/07/2026")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Hora:"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0"
    }
  }, "07:02 AM")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Estatus del Turno:"), /*#__PURE__*/React.createElement(Badge, {
    shape: "square",
    style: {
      background: open ? "#16A34A" : "#DC2626",
      color: "#fff",
      fontSize: "var(--font-size-base)",
      padding: "4px 12px",
      marginTop: 4
    }
  }, open ? "Turno abierto" : "Turno cerrado")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, open ? /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    style: {
      width: 300
    },
    onClick: () => setConfirm(true)
  }, "Cerrar Turno") : /*#__PURE__*/React.createElement(Button, {
    style: {
      width: 300,
      background: "var(--c10-blue)"
    },
    onClick: () => {
      setOpen(true);
      setToast(true);
    }
  }, "Iniciar Turno"))), /*#__PURE__*/React.createElement(Card, {
    elevation: "none",
    padding: "0",
    style: {
      border: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 700
    }
  }, "Guardias de apoyo"), /*#__PURE__*/React.createElement(KpiChip, {
    value: 2
  }), /*#__PURE__*/React.createElement(KpiChip, {
    value: 42,
    label: "accesos",
    tone: "neutral"
  }), /*#__PURE__*/React.createElement(KpiChip, {
    value: 2,
    label: "incidencias",
    tone: "danger"
  })), /*#__PURE__*/React.createElement(DataTable, {
    onFilterToggle: () => {},
    columns: [{
      header: "Guardia",
      key: "nombre"
    }, {
      header: "Rol",
      key: "rol"
    }, {
      header: "Entrada",
      key: "entrada"
    }, {
      header: "Salida",
      key: "salida"
    }],
    rows: [{
      nombre: "Luis Márquez",
      rol: "Apoyo",
      entrada: "07:10",
      salida: "—"
    }, {
      nombre: "Iván Robles",
      rol: "Rondín",
      entrada: "07:15",
      salida: "11:00"
    }]
  })), /*#__PURE__*/React.createElement(Modal, {
    open: confirm,
    title: "Confirmaci\xF3n",
    description: "\xBFDeseas cerrar el turno actual? Se registrar\xE1 la hora de salida.",
    width: 420,
    onClose: () => setConfirm(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setConfirm(false)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      variant: "destructive",
      onClick: () => {
        setOpen(false);
        setConfirm(false);
        setToast(true);
      }
    }, "Cerrar Turno"))
  }), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 24,
      bottom: 24
    },
    onClick: () => setToast(false)
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: open ? "Se inició tu turno" : "Se cerró tu turno",
    description: "Qued\xF3 registrada la evidencia fotogr\xE1fica."
  })) : null));
}
Object.assign(window, {
  TurnosScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plataforma/TurnosScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plataforma/icons.jsx
try { (() => {
const Ico = ({
  d,
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, d);
const IconEye = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }))
});
const IconPencil = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15 5 4 4"
  }))
});
const IconDownload = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 15V3M6 11l6 6 6-6M19 21H5"
  }))
});
const IconPrint = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 9V3h12v6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "14",
    width: "12",
    height: "8",
    rx: "1"
  }))
});
const IconBadgeId = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    width: "18",
    height: "14",
    x: "3",
    y: "5",
    rx: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "12",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 10h4M14 14h4"
  }))
});
const IconCar = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 7.6A2 2 0 0 0 16.5 6h-9a2 2 0 0 0-1.9 1.6L4.5 11.1C3.7 11.3 3 12.1 3 13v3c0 .6.4 1 1 1h2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "17",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 17h6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "17",
    r: "2"
  }))
});
const IconTool = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
  }))
});
const IconArrowOut = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))
});
const IconPin = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  }))
});
const IconUser = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }))
});
const IconCalendar = () => /*#__PURE__*/React.createElement(Ico, {
  d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M8 2v4M16 2v4"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 10h18"
  }))
});
Object.assign(window, {
  IconEye,
  IconPencil,
  IconDownload,
  IconPrint,
  IconBadgeId,
  IconCar,
  IconTool,
  IconArrowOut,
  IconPin,
  IconUser,
  IconCalendar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plataforma/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.EstatusBadge = __ds_scope.EstatusBadge;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.UserCell = __ds_scope.UserCell;

__ds_ns.KpiChip = __ds_scope.KpiChip;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.PhotoCard = __ds_scope.PhotoCard;

__ds_ns.RecordListItem = __ds_scope.RecordListItem;

__ds_ns.RowAction = __ds_scope.RowAction;

__ds_ns.RowActions = __ds_scope.RowActions;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.DetailSection = __ds_scope.DetailSection;

__ds_ns.DetailField = __ds_scope.DetailField;

__ds_ns.DetailPanel = __ds_scope.DetailPanel;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.FilterSection = __ds_scope.FilterSection;

__ds_ns.FilterPanel = __ds_scope.FilterPanel;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ViewModeIcons = __ds_scope.ViewModeIcons;

__ds_ns.VIEW_MODES = __ds_scope.VIEW_MODES;

})();
