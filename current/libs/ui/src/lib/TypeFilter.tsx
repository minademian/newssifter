import { ALL_TYPES, NO_TYPE } from '@newssifter/specifications';

export interface TypeFilterProps {
  label: string;
  types: string[];
  value: string;
  onChange: (type: string) => void;
}

export function TypeFilter({ label, types, value, onChange }: TypeFilterProps) {
  const options = [
    { value: ALL_TYPES, text: 'all' },
    { value: NO_TYPE, text: 'none' },
    ...types.map((type) => ({ value: type, text: type })),
  ];

  return (
    <div className="admin-filter-row">
      <span className="admin-filter-label">{label}</span>
      <div className="admin-filters" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value || 'all'}
            type="button"
            className="admin-filter"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TypeFilter;
