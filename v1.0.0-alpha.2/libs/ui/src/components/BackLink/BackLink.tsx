import { ComponentPropsWithoutRef } from 'react';
import { StyledBackLink } from './BackLink.styles';

export type BackLinkProps = ComponentPropsWithoutRef<'a'>;

export function BackLink(props: BackLinkProps) {
  return <StyledBackLink {...props} />;
}

export default BackLink;
