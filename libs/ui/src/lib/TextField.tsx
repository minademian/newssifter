import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export interface TextFieldProps {
  label: string;
}

const StyledTextField = styled.div``;

export function TextField(props: TextFieldProps) {
  const { label } = props;
  const { t } = useTranslation();

  return (
    <StyledTextField>
      <label className="flex tracking-tight text-black text-xl">
        {label}
        <input type="text" name="article" id="article" />
      </label>
    </StyledTextField>
  );
}

export default TextField;
