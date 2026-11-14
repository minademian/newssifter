import { SVGProps } from 'react';

export type ShieldCheckIconProps = SVGProps<SVGSVGElement>;

export function ShieldCheckIcon(props: ShieldCheckIconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 1.8 13 4v3.4c0 3.2-2.1 5.5-5 6.8-2.9-1.3-5-3.6-5-6.8V4l5-2.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="m5.8 7.8 1.5 1.5 3-3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ShieldCheckIcon;
