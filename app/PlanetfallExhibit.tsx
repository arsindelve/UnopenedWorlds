import { LiveGameExhibit, type LiveGameExhibitConfig } from './LiveGameExhibit';

const planetfallConfig: LiveGameExhibitConfig = {
  api: 'https://6kvs9n5pj4.execute-api.us-east-1.amazonaws.com/Prod/Planetfall',
  sessionKey: 'UnopenedWorldsPlanetfallSessionId',
  className: 'live-exhibit--planetfall',
  title: 'Planetfall, re-imagined.',
  collapsedDescription: 'A faithful engine underneath; a narrator with room for the thought behind the command.',
  collapsedDuration: 'A five-minute assignment',
  collapsedScore: '12 moves · the opening emergency',
  terminalName: 'PLANETFALL.AI',
  loadingLabel: 'reporting aboard',
  loadingTranscript: 'Checking in with the S.P.S. Feinstein…',
  errorCopy: 'The shipwide network flickers. Your place has been kept; try again.',
  explanationQuote: 'Planetfall.ai is not an emulator, and it is not a generative retelling. It rebuilds Planetfall’s authored world in a new engine, then gives that world a narrator capable of meeting you at the edge of the original parser.',
  firstPoint: { number: '01 / WHAT', title: <>The original game,<br />still on duty.</>, copy: 'The rooms, objects, inventory, scoring, saves, puzzles, and story logic have been rebuilt from scratch. When a command changes the game, the authored response and consequence remain exactly where they belong.' },
  secondPoint: { number: '02 / WHY', title: <>Meet Floyd in a world<br />that can listen.</>, copy: 'When the old parser would stop at a sentence it does not recognize, AI can interpret the intent or answer in character—without being allowed to make up a new plot. That is enhancement, not replacement.' },
  invitation: 'Try the opening emergency, then continue with the full game.',
  openingCta: 'Open the playable exhibit',
  fullExperienceLabel: 'Continue on Planetfall.ai',
  thresholdCopy: 'The shift has only just begun.',
  handoffTitle: 'YOUR SHIFT IS UNDERWAY',
  handoffCopy: 'Resume the complete adventure on Planetfall.ai whenever you are ready.',
  commandPlaceholder: 'Try LOOK or EXAMINE BRUSH',
  continueUrl: 'https://planetfall.ai/',
};

export function PlanetfallExhibit() {
  return <LiveGameExhibit config={planetfallConfig} />;
}
