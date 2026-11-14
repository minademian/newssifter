import { useTranslation } from 'react-i18next';
import {
  isErrorMessage,
  useLookup,
  useScrollToBottom,
} from '@newssifter/hooks';
import {
  IsBiasSpecification,
  IsFakeSpecification,
} from '@newssifter/specifications';
import { ArrowRightIcon } from '../ArrowRightIcon';
import { Avatar } from '../Avatar';
import { ComposerNote } from '../ComposerNote';
import { SourceNotice } from '../SourceNotice';
import { SourceNuance } from '../SourceNuance';
import { VisuallyHidden, VisuallyHiddenLabel } from '../VisuallyHidden';
import { getMessageText } from './getMessageText';
import {
  Bubble,
  Card,
  Composer,
  Conversation,
  Dot,
  Entry,
  EntryContent,
  Header,
  Hint,
  Identity,
  InputRow,
  Ready,
  Speaker,
  StatusDot,
  Submit,
  Title,
  TypeLabel,
  TypePill,
  TypeRow,
  TypingBubble,
} from './ChatBot.styles';

const isBias = new IsBiasSpecification();
const isFake = new IsFakeSpecification();

export function ChatBot() {
  const { t } = useTranslation();
  const { url, setUrl, messages, isTyping, sendLookup } = useLookup();
  const conversationRef = useScrollToBottom<HTMLDivElement>([
    messages,
    isTyping,
  ]);

  return (
    <Card aria-label={t('chatbot.aria-label')}>
      <Header>
        <Identity>
          <Avatar variant="header" />
          <span>
            <Title>{t('chatbot.app-title')}</Title>
          </span>
        </Identity>
        <Ready>
          <StatusDot />
          {t('chatbot.ready')}
        </Ready>
      </Header>

      <Conversation ref={conversationRef} aria-live="polite">
        <Entry>
          <Avatar variant="bot" />
          <EntryContent>
            <Speaker>{t('chatbot.speaker-bot-now')}</Speaker>
            <Bubble sender="assistant">
              <p>{t('chatbot.cta-label')}</p>
              <Hint>{t('chatbot.cta-hint')}</Hint>
            </Bubble>
          </EntryContent>
        </Entry>

        {messages.map((message, index) => (
          <Entry key={index} sender={message.sender}>
            {message.sender === 'assistant' && <Avatar variant="bot" />}
            <EntryContent sender={message.sender}>
              <Speaker>
                {message.sender === 'user'
                  ? t('chatbot.speaker-user')
                  : t('chatbot.speaker-bot')}
              </Speaker>
              <Bubble sender={message.sender} isError={isErrorMessage(message)}>
                {getMessageText(message, t)}
                {message.type1 && (
                  <TypeRow>
                    <TypeLabel>{t('chatbot.type-label')}</TypeLabel>
                    <TypePill>{message.type1}</TypePill>
                  </TypeRow>
                )}
                {isFake.isSatisfiedBy(message) && <SourceNotice type="fake" />}
                {isBias.isSatisfiedBy(message) && <SourceNuance />}
              </Bubble>
            </EntryContent>
          </Entry>
        ))}

        {isTyping && (
          <Entry>
            <Avatar variant="bot" />
            <EntryContent>
              <Speaker>{t('chatbot.speaker-bot')}</Speaker>
              <TypingBubble sender="assistant">
                <VisuallyHidden role="status">
                  {t('chatbot.typing')}
                </VisuallyHidden>
                <Dot />
                <Dot />
                <Dot />
              </TypingBubble>
            </EntryContent>
          </Entry>
        )}
      </Conversation>

      <Composer
        onSubmit={(event) => {
          event.preventDefault();
          void sendLookup();
        }}
      >
        <VisuallyHiddenLabel htmlFor="source-url">
          {t('chatbot.cta-placeholder')}
        </VisuallyHiddenLabel>
        <InputRow>
          <input
            type="text"
            placeholder={t('chatbot.cta-placeholder')}
            name="article"
            id="source-url"
            value={url}
            onChange={(event) => setUrl(event.currentTarget.value)}
          />
          <Submit type="submit" disabled={isTyping || !url.trim()}>
            <span>{t('chatbot.cta-btn')}</span>
            <ArrowRightIcon />
          </Submit>
        </InputRow>
        <ComposerNote />
      </Composer>
    </Card>
  );
}
