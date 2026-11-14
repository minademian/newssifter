import { InfoNote } from './InfoNote';

const STEPS = [
  {
    title: 'Enter a source',
    text: 'Enter a news source or article.',
  },
  {
    title: 'We check the database',
    text: 'We’ll check whether it appears in the database.',
  },
  {
    title: 'See the original data',
    text: 'We’ll provide the original data for the source.',
  },
  {
    title: 'Get more context',
    text: 'We’ll add more nuanced context, especially for sources labelled “bias.” Those labels were predominantly applied to sources from the opposing political party.',
  },
];

export function StepsVariant1() {
  return (
    <div className="hero-copy-details hero-copy-details--ladder">
      <ol className="steps-ladder">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className={`steps-ladder-item steps-ladder-item--${index + 1}`}
          >
            <span className="steps-ladder-tab" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="steps-ladder-content">
              <h3 className="steps-ladder-title">{step.title}</h3>
              <p className="steps-ladder-text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <InfoNote />
    </div>
  );
}

export default StepsVariant1;
