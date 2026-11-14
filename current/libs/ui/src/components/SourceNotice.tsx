export type SourceNoticeType = 'fake';

export interface SourceNoticeProps {
  type: SourceNoticeType;
}

const NOTICES: Record<SourceNoticeType, { title: string; body: string }> = {
  fake: {
    title: 'This is fake news',
    body: 'This source is known to publish fake news and disinformation. Do not rely on it, and do not share its content as fact.',
  },
};

export function SourceNotice({ type }: SourceNoticeProps) {
  const { title, body } = NOTICES[type];

  return (
    <aside
      className={`source-notice source-notice--${type}`}
      role="alert"
      aria-label={title}
    >
      <strong className="source-notice-title">{title}</strong>
      <p className="source-notice-body">{body}</p>
    </aside>
  );
}

export default SourceNotice;
