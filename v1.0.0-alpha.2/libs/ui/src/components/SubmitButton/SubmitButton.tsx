import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { StyledFormField } from './SubmitButton.styles';

export type SubmitButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & { label: string };

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const className = props.className || '';
  const label = props.label || '';

  return (
    <StyledFormField>
      <button
        {...props}
        type={'button'}
        className={'border text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline'.concat(
          className
        )}
        name="start"
        id="start"
      >
        {label}
      </button>
    </StyledFormField>
  );
}
