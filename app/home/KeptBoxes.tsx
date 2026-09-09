const keptBoxes = [
  {
    title: 'Journey: The Quest Begins',
    label: 'Role-Play Chronicles',
    image: '/kept-boxes/journey.jpg',
  },
  {
    title: 'ZorkQuest II: The Crystal of Doom',
    label: 'Infocomics / No. 2',
    image: '/kept-boxes/zorkquest-2.jpg',
  },
  {
    title: 'The Lost Treasures of Infocom',
    label: 'Classic anthology / 20 games',
    image: '/kept-boxes/lost-treasures-1.jpg',
  },
  {
    title: 'The Lost Treasures of Infocom II',
    label: 'Classic anthology / 11 games',
    image: '/kept-boxes/lost-treasures-2.jpg',
  },
] as const;

// HOMEPAGE COPY: Edit the footnote and its four box captions here.
export function KeptBoxes() {
  return (
    <section className="survivors-note" aria-labelledby="survivors-heading">
      <div className="survivors-note-inner">
        <div>
          <p className="room-number">
            A PERSONAL FOOTNOTE / OUTSIDE THE GREY BOXES
          </p>
          <h2 id="survivors-heading">Four boxes that never left.</h2>
        </div>
        <p>
          Beyond the thirty-two worlds on the wall, I still have the original
          boxes of <em>Journey: The Quest Begins</em>,{' '}
          <em>ZorkQuest II: The Crystal of Doom</em>, and both{' '}
          <em>Lost Treasures of Infocom</em> anthologies—four more survivors
          from my Infocom years.
        </p>
      </div>
      <div
        className="kept-box-grid"
        aria-label="Other original Infocom boxes Michael still has"
      >
        {keptBoxes.map((box) => (
          <figure className="kept-box-card" key={box.title}>
            <div className="kept-box-photo">
              <img
                src={box.image}
                alt={box.title}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <span>{box.label}</span>
              <strong>{box.title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
