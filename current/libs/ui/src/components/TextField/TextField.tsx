import { useTranslation } from 'react-i18next';
import { StyledInput, StyledTextField } from './TextField.styles';

export interface TextFieldProps {
  label: string;
}

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
