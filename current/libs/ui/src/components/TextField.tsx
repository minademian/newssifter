import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export interface TextFieldProps {
  label: string;
}

const StyledTextField = styled.div``;

const StyledInput = styled.input`
  background-color: white;
  border: 1px solid #ccc;
`;

export function TextField(props: TextFieldProps) {
  const { label } = props;
  const { t } = useTranslation();

  return (
    <StyledTextField className="flex flex-col align-middle">
      <label className="flex tracking-tight text-black text-xl">
        {label}
        <StyledInput
          type="text"
          placeholder={t('chatbot.cta-placeholder')}
          name="article"
          id="article"
          className="text-black"
        />
      </label>
    </StyledTextField>
  );
}

export default TextField;
