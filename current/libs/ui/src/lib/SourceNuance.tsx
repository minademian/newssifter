export interface SourceNuanceProps {
  title?: string;
  children?: React.ReactNode;
}

const PLACEHOLDER_TEXT =
  'Placeholder: additional context about this source will appear here.';

export function SourceNuance({
  title = 'Add some nuance',
  children = PLACEHOLDER_TEXT,
}: SourceNuanceProps) {
  return (
    <aside className="source-nuance" aria-label={title}>
      <strong className="source-nuance-title">{title}</strong>
      <p className="source-nuance-body">{children}</p>
    </aside>
  );
}

export default SourceNuance;
