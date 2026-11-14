import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface ChatBotProps {}

type ChatMessage = {
  sender: 'user' | 'assistant';
  text: string;
  isError?: boolean;
  type1?: string;
};

export function ChatBot(props: ChatBotProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) {
      conversation.scrollTo({
        top: conversation.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const sendLookup = async () => {
    const submittedUrl = url.trim();
    if (!submittedUrl || isTyping) {
      return;
    }

    setMessages((current) => [
      ...current,
      { sender: 'user', text: submittedUrl },
    ]);
    setUrl('');
    setIsTyping(true);

    const controller = new AbortController();
    const requestTimeout = window.setTimeout(() => controller.abort(), 10000);
    const lookupRequest = fetch(
      `/api/lookup?url=${encodeURIComponent(submittedUrl)}`,
      { signal: controller.signal }
    ).then(
      (response) => ({ response }),
      (error: unknown) => ({ error })
    );

    const addAssistantMessage = (
      text: string,
      isError = false,
      type1?: string
    ) => {
      setMessages((current) => [
        ...current,
        { sender: 'assistant', text, isError, type1 },
      ]);
    };

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 1200));
      const result = await lookupRequest;
      if ('error' in result) {
        throw result.error;
      }

      if (result.response.status === 200) {
        const body: { type1?: string } | null = await result.response
          .json()
          .catch(() => null);
        addAssistantMessage(
          'Yes, this source is in the database.',
          false,
          body?.type1
        );
      } else if (result.response.status === 404) {
        addAssistantMessage(
          "Sorry, I couldn't find this source in our database."
        );
      } else if (result.response.status === 500) {
        addAssistantMessage(
          'Error: The server encountered an error. Please try again.',
          true
        );
      } else {
        addAssistantMessage(
          `Error: The lookup failed with status ${result.response.status}.`,
          true
        );
      }
    } catch (error) {
      const message =
        error instanceof Error && error.name === 'AbortError'
          ? 'Error: The lookup timed out. Please try again.'
          : 'Error: Could not reach the lookup service. Please try again.';
      addAssistantMessage(message, true);
    } finally {
      window.clearTimeout(requestTimeout);
      setIsTyping(false);
    }
  };

  return (
    <section className="chat-card" aria-label="News Sifter source lookup">
      <header className="chat-header">
        <div className="chat-header-identity">
          <span className="chat-header-avatar" aria-hidden="true">
            <img src="/logo.jpeg" alt="" />
          </span>
          <span>
            <span className="chat-title">{t('chatbot.app-title')}</span>
          </span>
        </div>
        <span className="chat-ready">
          <span className="status-dot" />
          READY
        </span>
      </header>

      <div
        ref={conversationRef}
        className="chat-conversation"
        aria-live="polite"
      >
        <div className="chat-entry chat-entry--assistant">
          <span className="chat-bot-avatar" aria-hidden="true">
            <img src="/logo.jpeg" alt="" />
          </span>
          <div className="chat-entry-content">
            <span className="chat-speaker">NEWS SIFTER · NOW</span>
            <div className="chat-bubble chat-bubble--assistant">
              <p>{t('chatbot.cta-label')}</p>
              <p className="chat-bubble-hint">
                I’ll check whether the source is listed in our database.
              </p>
            </div>
          </div>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-entry chat-entry--${message.sender} ${
              message.isError ? 'chat-entry--error' : ''
            }`}
          >
            {message.sender === 'assistant' && (
              <span className="chat-bot-avatar" aria-hidden="true">
                <img src="/logo.jpeg" alt="" />
              </span>
            )}
            <div className="chat-entry-content">
              <span className="chat-speaker">
                {message.sender === 'user' ? 'YOU' : 'NEWS SIFTER'}
              </span>
              <div
                className={`chat-bubble ${
                  message.sender === 'user'
                    ? 'chat-bubble--user'
                    : 'chat-bubble--assistant'
                } ${message.isError ? 'chat-bubble--error' : ''}`}
              >
                {message.text}
                {message.type1 && (
                  <span className="type-pill">{message.type1}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-entry chat-entry--assistant">
            <span className="chat-bot-avatar" aria-hidden="true">
              <img src="/logo.jpeg" alt="" />
            </span>
            <div className="chat-entry-content">
              <span className="chat-speaker">NEWS SIFTER</span>
              <div className="chat-bubble chat-bubble--assistant typing-bubble">
                <span className="sr-only" role="status">
                  News Sifter is checking the source
                </span>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        className="chat-composer"
        onSubmit={(event) => {
          event.preventDefault();
          void sendLookup();
        }}
      >
        <label className="sr-only" htmlFor="source-url">
          {t('chatbot.cta-placeholder')}
        </label>
        <div className="chat-input-row">
          <input
            type="text"
            placeholder={t('chatbot.cta-placeholder')}
            name="article"
            id="source-url"
            value={url}
            onChange={(event) => setUrl(event.currentTarget.value)}
          />
          <button
            type="submit"
            className="chat-submit"
            disabled={isTyping || !url.trim()}
          >
            <span>{t('chatbot.cta-btn')}</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10h11m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="composer-note">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
          We only check the source URL against our database.
        </p>
      </form>
    </section>
  );
}
