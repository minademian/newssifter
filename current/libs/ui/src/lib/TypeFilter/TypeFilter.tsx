import { ALL_TYPES, NO_TYPE } from '@newssifter/specifications';
import { Label, Option, Options, Row } from './TypeFilter.styles';

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
    <Row>
      <Label>{label}</Label>
      <Options role="group" aria-label={label}>
        {options.map((option) => (
          <Option
            key={option.value || 'all'}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.text}
          </Option>
        ))}
      </Options>
    </Row>
  );
}

export default TypeFilter;
