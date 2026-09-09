import { LiveGameExhibit, type LiveGameExhibitConfig } from './LiveGameExhibit';

function gameText(markup: string) {
  const withLineBreaks = markup.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div)>/gi, '\n');
  const document = new DOMParser().parseFromString(withLineBreaks, 'text/html');
  return (document.body.textContent ?? '').replace(/\u00a0/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

const zorkConfig: LiveGameExhibitConfig = {
  api: 'https://bxqzfka0hc.execute-api.us-east-1.amazonaws.com/Prod/ZorkOne',
  sessionKey: 'UnopenedWorldsZorkSessionId',
  className: 'live-exhibit--zork',
  title: 'Zork I, re-imagined.',
  collapsedDescription: 'Begin here. Continue the very same adventure on NewZork.ai.',
  collapsedDuration: 'A five-minute doorway',
  collapsedScore: '12 moves · one continuous session',
  terminalName: 'NEWZORK',
  loadingLabel: 'opening world',
  loadingTranscript: 'Establishing a path to the Great Underground Empire…',
  errorCopy: 'The connection flickers. Your place in the world has been kept; try again.',
  explanationQuote: 'Infocom made a computer feel less like a machine and more like a place. NewZork asks what that place can become when an intelligent narrator understands your intent and brings the authored world to life.',
  firstPoint: { number: '01 / WHAT', title: <>The original world,<br />intelligently narrated.</>, copy: 'The rooms, objects, puzzles, and consequences remain deliberately authored. An intelligent narrator interprets intent, describes consequences, and gives the world a responsive voice without permission to invent a different Zork.' },
  secondPoint: { number: '02 / WHY', title: <>Preserve the feeling,<br />not only the code.</>, copy: 'The goal is not to replace Infocom’s writing. It is to recover the astonishing sensation that the machine on the other side of the prompt understands what you meant.' },
  invitation: 'Your session becomes the same adventure on NewZork.ai.',
  openingCta: 'Open the playable exhibit',
  fullExperienceLabel: 'Continue on NewZork.ai',
  thresholdCopy: 'The passage continues into darkness.',
  handoffTitle: 'YOUR ADVENTURE IS ALREADY UNDERWAY',
  handoffCopy: 'Your location, inventory, score, and transcript travel with you.',
  commandPlaceholder: 'Try OPEN MAILBOX or GO NORTH',
  continueUrl: 'https://newzork.ai/',
  responseText: gameText,
};

export function ZorkExhibit() {
  return <LiveGameExhibit config={zorkConfig} />;
}
