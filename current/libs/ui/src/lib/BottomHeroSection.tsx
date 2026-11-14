import { InfoNote } from './InfoNote';

export function BottomHeroSection() {
  return (
    <div className="hero-copy-details">
      <ol className="steps-list">
        <li>
          <span className="step-number" aria-hidden="true">
            1
          </span>
          <span>Enter a news source or article.</span>
        </li>
        <li>
          <span className="step-number" aria-hidden="true">
            2
          </span>
          <span>We’ll check whether it appears in the database.</span>
        </li>
        <li>
          <span className="step-number" aria-hidden="true">
            3
          </span>
          <span>We’ll provide the original data for the source.</span>
        </li>
        <li>
          <span className="step-number" aria-hidden="true">
            4
          </span>
          <span>
            We’ll add more nuanced context, especially for sources labelled
            “bias.” Those labels were predominantly applied to sources from the
            opposing political party.
          </span>
        </li>
      </ol>
      <InfoNote />
    </div>
  );
}
