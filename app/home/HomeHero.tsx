import { ArrowDown } from 'lucide-react';

// HOMEPAGE COPY: Edit the collection introduction here.
export function HomeHero() {
  return (
    <section className="wall-intro" id="top">
      <div>
        <p className="eyebrow">Infocom · The Grey-Box Collection · 1980–1988</p>
        <h1>
          <span className="hero-type">
            <span className="hero-type-text">Thirty Two Worlds</span>
            <span className="hero-type-cursor" aria-hidden="true" />
          </span>
          <br />
          <em className="hero-unopened">Unopened.</em>
        </h1>
      </div>
      <div className="intro-copy">
        <p className="intro-orientation">
          In the 1980s, Infocom shipped worlds with no pictures in them. You
          typed a sentence in plain English, and the machine wrote back—in prose
          so good the pictures arrived anyway, assembled behind your eyes out of
          nothing but nouns, verbs, and nerve.
        </p>
        <p className="intro-collection">
          Between the ages of ten and twelve I had an Apple IIc, and I did not
          play these games so much as live in them. The drive would chatter, the
          screen would put me in an open field west of a white house, and the
          evening was gone.
        </p>
        <p className="intro-collection">
          Thirty-two grey boxes came out of that company. Every one of them is
          on this wall—thirty-one still sealed, one unsealed.
        </p>
        <p className="intro-live-note">
          <span /> Two of those original worlds are being brought back to life
          with AI.
        </p>
        <a href="#collection">
          <ArrowDown size={15} /> Enter the collection
        </a>
      </div>
    </section>
  );
}
