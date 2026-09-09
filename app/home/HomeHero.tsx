// oxlint-disable nextjs/no-html-link-for-pages -- Native navigation is required by the vinext static export.
import {ArrowDown} from 'lucide-react';

// HOMEPAGE COPY: Edit the collection introduction here.
export function HomeHero() {
    return (
        <section className="wall-intro" id="top">
            <div>
                <p className="eyebrow">Infocom · The Grey-Box Collection · 1980–1988</p>
                <h1>
          <span className="hero-type">
            <span className="hero-type-text">Thirty Two Worlds</span>
            <span className="hero-type-cursor" aria-hidden="true"/>
          </span>
                    <br/>
                    <em className="hero-unopened">Unopened.</em>
                </h1>
            </div>
            <div className="intro-copy">
                <p className="intro-orientation">
                    In the 1980s, Infocom elevated and popularized the genre of “interactive fiction.” You
                    typed a sentence in plain English, and the game responded by telling you what happened next. The
                    story
                    progressed as you explored and solved puzzles. Solving tricky puzzles took you deeper and deeper,
                    until you
                    were completely immersed in those worlds and their mysteries.
                    Even as computer graphics became more sophisticated, Infocom continued to focus on the narrative and
                    storytelling aspects of interactive fiction, creating stories, not just games.
                </p>
                <a className="intro-skip-link" href="#collection">
                    <ArrowDown size={15}/> Enter the collection
                </a>
                <p className="intro-collection">
                    Between the ages of about eight and twelve, I had an Apple IIc that was my portal to these
                    extraordinary games.
                    Even away from my computer, I was thinking
                    about the puzzles and trying to work out how to solve them. I recall sitting in the back of the room
                    in 7th grade
                    trying to work out how to get past the mutants in <a className="intro-game-link"
                                                                         href="/planetfall"><i>Planetfall</i></a>.
                    And when I finally did, it gave me a
                    sense of accomplishment and wonder
                    I’ll never forget.
                </p>
                <p className="intro-collection">
                    In the late 1980s, Infocom did eventually embrace graphics capabilities
                    to enhance the stories and pivoted away from purely word-based interactive fiction. This collection
                    celebrates
                    and honors the thirty games before that pivot, often called “grey boxes.” These include their early
                    games, such as Zork,
                    re-released after their initial “folio” releases, but do not include their graphical adventures,
                    such as Shogun and Journey.
                    The exceptions in my collection
                    are Zork Zero and Beyond Zork, both of which feature limited graphics that enhance rather than
                    compete
                    with the narrative. These are the thirty-two worlds of Infocom.
                </p>
                <p className="intro-collection">
                    Not very many games from the 1980s remain as rewarding to play today.
                    These do. The stories are just as compelling, the puzzles just as challenging, and the worlds just
                    as immersive. Games like <a className="intro-game-link"
                                                href="/trinity"><i>Trinity</i></a> and <a
                    className="intro-game-link" href="/amfv"><i>A Mind Forever Voyaging</i></a> carry messages that
                    remain just as poignant and relevant forty years on. Sadly, too few people remember Infocom today. I
                    want to change that. My collection and my work in
                    AI-enhanced interactive fiction aim to keep the games, their worlds and their characters alive.
                </p>
                <a className="intro-worlds-link" href="#living-worlds">
                    <ArrowDown size={15}/> Enter the New Worlds
                </a>

            </div>
        </section>
    );
}
