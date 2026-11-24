// Single source of truth for how a task status is labeled and colored.
// Every place that shows a task status (cards, tables, filters, charts)
// pulls from here so the color for "failed" or "completed" never drifts.
export const STATUS_META = {
  new:       { label: 'New',         dot: 'bg-warning',  text: 'text-warning',  ring: 'ring-warning/30',  bg: 'bg-warning/10',  border: 'border-warning/25' },
  active:    { label: 'In progress', dot: 'bg-accent',   text: 'text-accent',   ring: 'ring-accent/30',   bg: 'bg-accent/10',   border: 'border-accent/25' },
  completed: { label: 'Completed',   dot: 'bg-positive',  text: 'text-positive', ring: 'ring-positive/30', bg: 'bg-positive/10', border: 'border-positive/25' },
  failed:    { label: 'Failed',      dot: 'bg-negative',  text: 'text-negative', ring: 'ring-negative/30', bg: 'bg-negative/10', border: 'border-negative/25' },
};

export const statusMeta = (status) => STATUS_META[status] || STATUS_META.new;

// Hex values for places that need an inline color (inline SVG/canvas-like bars)
export const STATUS_HEX = {
  new: '#e8a33d',
  active: '#4C6EF5',
  completed: '#4cc38a',
  failed: '#e5484d',
};
