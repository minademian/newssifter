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
                  We’ll add more nuanced context, especially for sources
                  labelled “bias.” Those labels were predominantly applied to
                  sources from the opposing political party.
                </span>
              </li>
            </ol>
            <div className="info-note">
              <span className="info-note-icon" aria-hidden="true">
                i
              </span>
              <p>
                <strong>Inspired by Melissa Zimdar's</strong>
                <em>
                <a
                  className="source-link"
                  href="https://docs.google.com/document/d/10eA5-mCZLSS4MQY5QGb5ewC3VAL6pLkT53V_81ZyitM/preview?tab=t.0"
                >
                  False, Misleading, Clickbait-y, and/or Satirical “News” Sources
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M9 2.5h4.5V7M13.2 2.8 7.5 8.5M11.5 8.5v4H3.5v-8h4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                </em>
              </p>
            </div>
          </div>
  )
}
