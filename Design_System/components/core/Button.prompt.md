Primary action control — use for every clickable command in the console; `primary` blue for the main action, `secondary` for cancel/alternatives.

```jsx
<Button variant="primary" iconLeft={<Plus size={16}/>}>Nuevo Pase</Button>
```

Variants: primary (azul de acción #2F80ED), secondary (white + border), ghost (nav items — hovers to solid blue), destructive (cerrar turno), success (green — "Nueva Nota"), link. Sizes sm/md/lg/xl/icon; `xl` (48px) is the login CTA height. Full-width with `fullWidth`.