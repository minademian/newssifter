import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  useInert,
  useOncePerLoad,
  usePrefersReducedMotion,
} from '@newssifter/hooks';
import { AppBareShell, ChatBot } from '@newssifter/ui';
import { Welcome, WelcomeHeading, Rise, Dock } from './Chat.styles';

const INTRO_MS = 5000;
const RISE_S = 0.9;

export function ChatPage() {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const { opened, ready, settle } = useOncePerLoad('chat', INTRO_MS);
  const dockRef = useInert<HTMLDivElement>(!ready);

  return (
    <AppBareShell>
      <AnimatePresence>
        {!opened && (
          <Welcome
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
          >
            <WelcomeHeading>{t('chatbot.welcome')}</WelcomeHeading>
          </Welcome>
        )}
      </AnimatePresence>
      <Dock ref={dockRef} aria-hidden={ready ? undefined : true}>
        <Rise
          initial={opened ? false : { y: '100%' }}
          animate={{ y: opened ? '0%' : '100%' }}
          transition={{
            duration: reduceMotion ? 0 : RISE_S,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={settle}
        >
          <ChatBot />
        </Rise>
      </Dock>
    </AppBareShell>
  );
}

export default ChatPage;
