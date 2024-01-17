import styled from 'styled-components';

export interface HeadingProps {
  label: string;
}

const StyledHeading = styled.div`
  color: blue;
`;

export function Heading(props: HeadingProps) {
  const { label } = props;

  return (
    <StyledHeading>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {label}
      </h1>
    </StyledHeading>
  );
}

export default Heading;
