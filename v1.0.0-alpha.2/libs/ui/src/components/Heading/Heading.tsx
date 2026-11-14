import { StyledHeading } from './Heading.styles';

export interface HeadingProps {
  label: string;
}

export function Heading(props: HeadingProps) {
  const { label } = props;

  return (
    <StyledHeading>
      <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
        {label}
      </h1>
    </StyledHeading>
  );
}

export function SubHeading(props: HeadingProps) {
  const { label } = props;

  return (
    <StyledHeading>
      <h4 className="text-base font-bold tracking-tight text-black">{label}</h4>
    </StyledHeading>
  );
}
