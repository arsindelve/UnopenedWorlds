import { LiveGameExhibit, type LiveGameExhibitConfig } from './LiveGameExhibit';

const planetfallConfig: LiveGameExhibitConfig = {
  api: 'https://6kvs9n5pj4.execute-api.us-east-1.amazonaws.com/Prod/Planetfall',
  sessionKey: 'UnopenedWorldsPlanetfallSessionId',
  className: 'live-exhibit--planetfall',
  title: 'Planetfall, re-imagined.',
  collapsedDescription: '',
  collapsedDuration: 'A five-minute assignment',
  collapsedScore: '',
  terminalName: 'PLANETFALL.AI',
  loadingLabel: 'reporting aboard',
  loadingTranscript: 'Checking in with the S.P.S. Feinstein…',
  errorCopy: 'The shipwide network flickers. Your place has been kept; try again.',
  explanationQuote: 'How could I make this incredible game feel richer, deeper, and more alive? My idea was to create an intelligent text parser and a "smart" narrator, one that understands everything you type. If your command advances the story, the original narrative remains intact. If not, the AI Narrator responds in a meaningful, often humorous way to keep you immersed. I preserved everything that makes Planetfall iconic: its characters, story, humor, and puzzles. Same game, more immersive.',
  firstPoint: { number: '', title: <>The original game, still on duty.</>, copy: 'The rooms, objects, inventory, scoring, saves, puzzles, and story logic have been rebuilt from scratch in a new, modern engine. When a command changes the game, the authored response and consequence remain exactly where they belong.' },
  secondPoint: { number: '', title: <>Meet a new, dynamic and responsive Floyd</>, copy: 'In the original game, Floyd was a static character. Now, he is a dynamic and responsive companion who understands everything you type. Talk to him. Ask him to dance. Watch him interact with his environment. ' },
  invitation: '',
  openingCta: 'Open the playable exhibit',
  fullExperienceLabel: 'Continue on Planetfall.ai',
  thresholdCopy: 'The shift has only just begun.',
  handoffTitle: '',
  handoffCopy: 'Resume the complete adventure on Planetfall.ai whenever you are ready.',
  commandPlaceholder: 'Try LOOK or EXAMINE BRUSH',
  continueUrl: 'https://planetfall.ai/',
};

export function PlanetfallExhibit() {
  return <LiveGameExhibit config={planetfallConfig} />;
}
