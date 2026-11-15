import { ComponentPropsWithoutRef } from 'react';
import { HiddenLabel, HiddenText } from './VisuallyHidden.styles';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<'span'>;
export type VisuallyHiddenLabelProps = ComponentPropsWithoutRef<'label'>;

/** Text that only screen readers see, such as a status message. */
export function VisuallyHidden(props: VisuallyHiddenProps) {
  return <HiddenText {...props} />;
}

/** A form label that only screen readers see. */
export function VisuallyHiddenLabel(props: VisuallyHiddenLabelProps) {
  return <HiddenLabel {...props} />;
}
