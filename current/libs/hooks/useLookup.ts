import { useState } from 'react';

export type AssistantMessageKind =
  | 'found'
  | 'not-found'
  | 'server-error'
  | 'status-error'
  | 'timeout'
  | 'network-error';

/**
 * A chat message without any display text: the user's message carries the typed
 * `text`; the assistant's carries a `kind` (and `status` or `type1` where they
 * apply). The UI decides how to word each kind, so messages follow the language.
 */
export type ChatMessage = {
  sender: 'user' | 'assistant';
  text?: string;
  kind?: AssistantMessageKind;
  status?: number;
  type1?: string;
};

const ERROR_KINDS: AssistantMessageKind[] = [
  'server-error',
  'status-error',
  'timeout',
  'network-error',
];

export const isErrorMessage = (message: ChatMessage): boolean =>
  message.kind !== undefined && ERROR_KINDS.includes(message.kind);

const REQUEST_TIMEOUT_MS = 10000;
const THINKING_DELAY_MS = 1200;

/**
 * State and behaviour of the source lookup chat: the input text, the list of
 * messages, and `sendLookup`, which asks the API about the typed source and adds
 * the user's message and the reply.
 */
export function useLookup() {
  const [url, setUrl] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

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
    const requestTimeout = window.setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS
    );
    const lookupRequest = fetch(
      `/api/lookup?url=${encodeURIComponent(submittedUrl)}`,
      { signal: controller.signal }
    ).then(
      (response) => ({ response }),
      (error: unknown) => ({ error })
    );

    const addAssistantMessage = (
      kind: AssistantMessageKind,
      extra: { status?: number; type1?: string } = {}
    ) => {
      setMessages((current) => [
        ...current,
        { sender: 'assistant', kind, ...extra },
      ]);
    };

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, THINKING_DELAY_MS)
      );
      const result = await lookupRequest;
      if ('error' in result) {
        throw result.error;
      }

      if (result.response.status === 200) {
        const body: { type1?: string } | null = await result.response
          .json()
          .catch(() => null);
        addAssistantMessage('found', { type1: body?.type1 });
      } else if (result.response.status === 404) {
        addAssistantMessage('not-found');
      } else if (result.response.status === 500) {
        addAssistantMessage('server-error');
      } else {
        addAssistantMessage('status-error', { status: result.response.status });
      }
    } catch (error) {
      addAssistantMessage(
        error instanceof Error && error.name === 'AbortError'
          ? 'timeout'
          : 'network-error'
      );
    } finally {
      window.clearTimeout(requestTimeout);
      setIsTyping(false);
    }
  };

  return { url, setUrl, messages, isTyping, sendLookup };
}
