import { ComponentPropsWithoutRef } from 'react';
import { StyledIconButton } from './IconButton.styles';

export type IconButtonProps = ComponentPropsWithoutRef<'button'>;

export function IconButton(props: IconButtonProps) {
  return <StyledIconButton type="button" {...props} />;
}

export default IconButton;
