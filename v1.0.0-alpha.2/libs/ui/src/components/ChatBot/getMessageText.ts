import type { TFunction } from 'i18next';
import type { AssistantMessageKind, ChatMessage } from '@newssifter/hooks';

const KEYS: Record<AssistantMessageKind, string> = {
  found: 'chatbot.found',
  'not-found': 'chatbot.not-found',
  'server-error': 'chatbot.errors.server',
  'status-error': 'chatbot.errors.status',
  timeout: 'chatbot.errors.timeout',
  'network-error': 'chatbot.errors.network',
};

/** The wording of a chat message in the current language. */
export function getMessageText(message: ChatMessage, t: TFunction): string {
  if (message.sender === 'user' || !message.kind) {
    return message.text ?? '';
  }

  return t(KEYS[message.kind], { status: message.status });
}
