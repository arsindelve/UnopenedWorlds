'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronUp, LoaderCircle, RotateCcw } from 'lucide-react';

const ZORK_API = 'https://bxqzfka0hc.execute-api.us-east-1.amazonaws.com/Prod/ZorkOne';
const SESSION_KEY = 'UnopenedWorldsZorkSessionId';
const EXHIBIT_MOVE_LIMIT = 12;

type GameResponse = {
  response: string;
  locationName: string;
  moves: number;
  score: number;
  inventory: string[];
};

type TranscriptEntry = {
  command?: string;
  output: string;
};

function createSessionId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const random = new Uint8Array(15);
  crypto.getRandomValues(random);
  return Array.from(random, (value) => characters[value % characters.length]).join('');
}

function getSessionId() {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing && /^[A-Za-z0-9]{15}$/.test(existing)) return existing;

  const created = createSessionId();
  localStorage.setItem(SESSION_KEY, created);
  return created;
}

function gameText(markup: string) {
  const withLineBreaks = markup
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div)>/gi, '\n');
  const document = new DOMParser().parseFromString(withLineBreaks, 'text/html');
  return (document.body.textContent ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function ZorkExhibit() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [command, setCommand] = useState('');
  const [game, setGame] = useState<GameResponse | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'sending' | 'error'>('idle');
  const transcriptRef = useRef<HTMLDivElement>(null);

  const continueHref = useMemo(
    () => sessionId ? `https://newzork.ai/#session=${encodeURIComponent(sessionId)}` : 'https://newzork.ai/',
    [sessionId],
  );
  const exhibitComplete = (game?.moves ?? 0) >= EXHIBIT_MOVE_LIMIT;

  async function loadSession(id = getSessionId()) {
    setStatus('loading');
    setSessionId(id);
    try {
      const response = await fetch(`${ZORK_API}?sessionId=${encodeURIComponent(id)}`);
      if (!response.ok) throw new Error('The world did not answer.');
      const data = await response.json() as GameResponse;
      setGame(data);
      setEntries([{ output: gameText(data.response) }]);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing && /^[A-Za-z0-9]{15}$/.test(existing)) setSessionId(existing);
  }, []);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' });
  }, [entries, status]);

  async function submitCommand(event: FormEvent) {
    event.preventDefault();
    const input = command.trim();
    if (!input || !sessionId || status === 'sending' || exhibitComplete) return;

    setCommand('');
    setStatus('sending');
    try {
      const response = await fetch(ZORK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ input, sessionId }),
      });
      if (!response.ok) throw new Error('The world did not answer.');
      const data = await response.json() as GameResponse;
      setGame(data);
      setEntries((current) => [...current, { command: input, output: gameText(data.response) }]);
      setStatus('ready');
    } catch {
      setEntries((current) => [...current, { command: input, output: 'The connection flickers. Your place in the world has been kept; try again.' }]);
      setStatus('error');
    }
  }

  function beginAgain() {
    const replacement = createSessionId();
    localStorage.setItem(SESSION_KEY, replacement);
    setEntries([]);
    setGame(null);
    void loadSession(replacement);
  }

  function openExhibit() {
    setIsExpanded(true);
    if (entries.length === 0) void loadSession(sessionId || getSessionId());
  }

  return (
    <article className="live-exhibit live-exhibit--zork" aria-labelledby="zork-exhibit-title">
      <div className="live-exhibit-heading">
        <div>
          <p className="live-kicker"><span /> Live interactive exhibit</p>
          <h3 id="zork-exhibit-title">Zork I, re-imagined.</h3>
          <p>Begin here. Continue the very same adventure on NewZork.ai.</p>
        </div>
        <div className="live-score" aria-label={isExpanded ? 'Current game status' : 'Exhibit length'}>
          <span>{isExpanded ? game?.locationName ?? 'Connecting…' : 'A five-minute doorway'}</span>
          <b>{isExpanded ? `${game?.score ?? 0} pts · ${game?.moves ?? 0} moves` : '12 moves · one continuous session'}</b>
        </div>
      </div>

      {!isExpanded ? (
        <div className="exhibit-explanation">
          <div className="explanation-statement">
            <p>&gt; WHY OPEN THIS WORLD?</p>
            <blockquote>Infocom made a computer feel less like a machine and more like a place. NewZork asks what that place can become when the parser finally understands you.</blockquote>
          </div>

          <div className="explanation-points">
            <div>
              <span>01 / WHAT</span>
              <h4>The original world,<br />newly listening.</h4>
              <p>The rooms, objects, puzzles, and consequences remain deliberately authored. A modern language layer makes the world more fluent without giving it permission to invent a different Zork.</p>
            </div>
            <div>
              <span>02 / WHY</span>
              <h4>Preserve the feeling,<br />not only the code.</h4>
              <p>The goal is not to replace Infocom’s writing. It is to recover the astonishing sensation that the machine on the other side of the prompt understands what you meant.</p>
            </div>
          </div>

          <div className="explanation-actions">
            <div>
              <p>START HERE / CONTINUE THERE</p>
              <span>Your session becomes the same adventure on NewZork.ai.</span>
            </div>
            <div>
              <button type="button" onClick={openExhibit} aria-expanded="false" aria-controls="zork-terminal"><ArrowDown size={14} /> Open the playable exhibit</button>
              <a href={continueHref}>Full experience <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      ) : (
        <div className="terminal-reveal" id="zork-terminal">
          <div className="terminal-frame">
            <div className="terminal-bar">
              <span>NEWZORK / GUEST SESSION</span>
              <div>
                <span className={`terminal-status terminal-status--${status}`}>
                  {status === 'sending' || status === 'loading' ? <LoaderCircle size={11} /> : <i />}
                  {status === 'error' ? 'connection interrupted' : status === 'loading' ? 'opening world' : status === 'sending' ? 'world is responding' : 'world online'}
                </span>
                <button type="button" className="terminal-collapse" onClick={() => setIsExpanded(false)} aria-expanded="true" aria-controls="zork-terminal">Collapse <ChevronUp size={11} /></button>
              </div>
            </div>

            <div className="terminal-transcript" ref={transcriptRef} role="log" aria-live="polite">
              {entries.map((entry, index) => (
                <div className="terminal-turn" key={`${entry.command ?? 'opening'}-${index}`}>
                  {entry.command && <p className="terminal-command">&gt; {entry.command}</p>}
                  <p>{entry.output}</p>
                </div>
              ))}
              {status === 'loading' && <p className="terminal-muted">&gt; Establishing a path to the Great Underground Empire…</p>}
              {exhibitComplete && (
                <div className="terminal-threshold">
                  <p>The passage continues into darkness.</p>
                  <a href={continueHref}>Continue this session on NewZork.ai <ArrowUpRight size={13} /></a>
                </div>
              )}
            </div>

            <form className="terminal-input" onSubmit={submitCommand}>
              <label htmlFor="zork-command">&gt;</label>
              <input
                id="zork-command"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder={exhibitComplete ? 'Continue in the full experience…' : 'Try OPEN MAILBOX or GO NORTH'}
                autoComplete="off"
                spellCheck={false}
                disabled={status === 'loading' || status === 'sending' || exhibitComplete}
                aria-label="Enter a Zork command"
              />
              <button type="submit" disabled={!command.trim() || status === 'loading' || status === 'sending' || exhibitComplete}>Enter</button>
            </form>
          </div>

          <div className="handoff-strip">
            <div>
              <p>YOUR ADVENTURE IS ALREADY UNDERWAY</p>
              <span>Your location, inventory, score, and transcript travel with you.</span>
            </div>
            <div className="handoff-actions">
              <button type="button" onClick={beginAgain} aria-label="Begin a new Zork session"><RotateCcw size={13} /> Begin again</button>
              <a href={continueHref}>Continue on NewZork.ai <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
