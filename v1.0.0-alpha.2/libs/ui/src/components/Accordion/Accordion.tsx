import { ReactNode, useId, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Heading,
  Panel,
  PanelClip,
  PanelContent,
  Root,
  Trigger,
} from './Accordion.styles';

export interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  const Chevron = isOpen ? ChevronUp : ChevronDown;

  return (
    <Root>
      <Heading>
        <Trigger
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{title}</span>
          <Chevron size={20} aria-hidden="true" />
        </Trigger>
      </Heading>
      <Panel
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        isOpen={isOpen}
      >
        <PanelClip>
          <PanelContent>{children}</PanelContent>
        </PanelClip>
      </Panel>
    </Root>
  );
}

export default Accordion;
