import { ArrowDown } from 'lucide-react';

// HOMEPAGE COPY: Edit the two active-world introductions here.
export function LivingWorlds() {
  return (
    <section
      className="work-room"
      id="living-worlds"
      aria-labelledby="work-title"
    >
      <div className="work-heading">
        <div>
          <p className="room-number">THE WORK / PRESERVATION IN MOTION</p>
          <h2 id="work-title">
            The boxes stay closed.
            <br />
            <em>The worlds do not.</em>
          </h2>
        </div>
        <p>
          Collecting preserves the things Infocom made. NewZork and
          Planetfall.ai are my attempt to preserve something harder: the feeling
          that a world on the other side of a prompt is listening.
        </p>
      </div>
      <div className="work-grid">
        <article className="work-card work-card--zork">
          <div>
            <p className="work-number">EXPERIMENT 01 / NEWZORK.AI</p>
            <h3>
              The world that
              <br />
              <em>started it all.</em>
            </h3>
            <p className="work-copy">
              Zork I opened Infocom’s first door. Its authored rooms, objects,
              puzzles, and consequences remain intact while an intelligent
              narrator understands your intent, describes what happens, and
              keeps the world alive around you.
            </p>
          </div>
          <div className="work-invitation">
            <p>Preserve the astonishing feeling—not only the source.</p>
            <a href="#game-zork-i">
              Find Zork I on the wall <ArrowDown size={14} />
            </a>
          </div>
        </article>
        <article className="work-card work-card--planetfall">
          <div>
            <p className="work-number">EXPERIMENT 02 / PLANETFALL.AI</p>
            <h3>
              A beloved world
              <br />
              <em>waiting to meet you again.</em>
            </h3>
            <p className="work-copy">
              Planetfall has been rebuilt room by room and object by object. Its
              intelligent narrator gives the completed world a voice—and lets
              you meet Floyd, Blather, and the Ambassador as characters who feel
              present, responsive, and alive.
            </p>
          </div>
          <div className="work-invitation">
            <p>Because Floyd deserves more than preservation.</p>
            <a href="#game-planetfall">
              Find Planetfall on the wall <ArrowDown size={14} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
