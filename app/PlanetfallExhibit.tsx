'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronUp, LoaderCircle, RotateCcw } from 'lucide-react';

const PLANETFALL_API = 'https://6kvs9n5pj4.execute-api.us-east-1.amazonaws.com/Prod/Planetfall';
const SESSION_KEY = 'UnopenedWorldsPlanetfallSessionId';
const EXHIBIT_MOVE_LIMIT = 12;

type GameResponse = {
  response: string;
  locationName: string;
  moves: number;
  score: number;
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

export function PlanetfallExhibit() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [command, setCommand] = useState('');
  const [game, setGame] = useState<GameResponse | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'sending' | 'error'>('idle');
  const transcriptRef = useRef<HTMLDivElement>(null);
  const continueHref = useMemo(
    () => sessionId ? `https://planetfall.ai/#session=${encodeURIComponent(sessionId)}` : 'https://planetfall.ai/',
    [sessionId],
  );
  const exhibitComplete = (game?.moves ?? 0) >= EXHIBIT_MOVE_LIMIT;

  async function loadSession(id = getSessionId()) {
    setStatus('loading');
    setSessionId(id);
    try {
      const response = await fetch(`${PLANETFALL_API}?sessionId=${encodeURIComponent(id)}`);
      if (!response.ok) throw new Error('The ship did not answer.');
      const data = await response.json() as GameResponse;
      setGame(data);
      setEntries([{ output: data.response.trim() }]);
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
      const response = await fetch(PLANETFALL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ input, sessionId }),
      });
      if (!response.ok) throw new Error('The ship did not answer.');
      const data = await response.json() as GameResponse;
      setGame(data);
      setEntries((current) => [...current, { command: input, output: data.response.trim() }]);
      setStatus('ready');
    } catch {
      setEntries((current) => [...current, { command: input, output: 'The shipwide network flickers. Your place has been kept; try again.' }]);
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
    <article className="live-exhibit live-exhibit--planetfall" aria-labelledby="planetfall-exhibit-title">
      <div className="live-exhibit-heading">
        <div>
          <p className="live-kicker"><span /> Live interactive exhibit</p>
          <h3 id="planetfall-exhibit-title">Planetfall, re-imagined.</h3>
          <p>A faithful engine underneath; a narrator with room for the thought behind the command.</p>
        </div>
        <div className="live-score" aria-label={isExpanded ? 'Current game status' : 'Exhibit length'}>
          <span>{isExpanded ? game?.locationName ?? 'Connecting…' : 'A five-minute assignment'}</span>
          <b>{isExpanded ? `${game?.score ?? 0} pts · ${game?.moves ?? 0} moves` : '12 moves · the opening emergency'}</b>
        </div>
      </div>

      {!isExpanded ? (
        <div className="exhibit-explanation">
          <div className="explanation-statement">
            <p>&gt; WHY OPEN THIS WORLD?</p>
            <blockquote>Planetfall.ai is not an emulator, and it is not a generative retelling. It rebuilds Planetfall&rsquo;s authored world in a new engine, then gives that world a narrator capable of meeting you at the edge of the original parser.</blockquote>
          </div>

          <div className="explanation-points">
            <div>
              <span>01 / WHAT</span>
              <h4>The original game,<br />still on duty.</h4>
              <p>The rooms, objects, inventory, scoring, saves, puzzles, and story logic have been rebuilt from scratch. When a command changes the game, the authored response and consequence remain exactly where they belong.</p>
            </div>
            <div>
              <span>02 / WHY</span>
              <h4>Meet Floyd in a world<br />that can listen.</h4>
              <p>When the old parser would stop at a sentence it does not recognize, AI can interpret the intent or answer in character—without being allowed to make up a new plot. That is enhancement, not replacement.</p>
            </div>
          </div>

          <div className="explanation-actions">
            <div>
              <p>START HERE / CONTINUE THERE</p>
              <span>Try the opening emergency, then continue with the full game.</span>
            </div>
            <div>
              <button type="button" onClick={openExhibit} aria-expanded="false" aria-controls="planetfall-terminal"><ArrowDown size={14} /> Open the playable exhibit</button>
              <a href={continueHref}>Full experience <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      ) : (
        <div className="terminal-reveal" id="planetfall-terminal">
          <div className="terminal-frame">
            <div className="terminal-bar">
              <span>PLANETFALL.AI / GUEST SESSION</span>
              <div>
                <span className={`terminal-status terminal-status--${status}`}>
                  {status === 'sending' || status === 'loading' ? <LoaderCircle size={11} /> : <i />}
                  {status === 'error' ? 'connection interrupted' : status === 'loading' ? 'reporting aboard' : status === 'sending' ? 'the ship is responding' : 'ship online'}
                </span>
                <button type="button" className="terminal-collapse" onClick={() => setIsExpanded(false)} aria-expanded="true" aria-controls="planetfall-terminal">Collapse <ChevronUp size={11} /></button>
              </div>
            </div>

            <div className="terminal-transcript" ref={transcriptRef} role="log" aria-live="polite">
              {entries.map((entry, index) => (
                <div className="terminal-turn" key={`${entry.command ?? 'opening'}-${index}`}>
                  {entry.command && <p className="terminal-command">&gt; {entry.command}</p>}
                  <p>{entry.output}</p>
                </div>
              ))}
              {status === 'loading' && <p className="terminal-muted">&gt; Checking in with the S.P.S. Feinstein…</p>}
              {exhibitComplete && (
                <div className="terminal-threshold">
                  <p>The shift has only just begun.</p>
                  <a href={continueHref}>Continue on Planetfall.ai <ArrowUpRight size={13} /></a>
                </div>
              )}
            </div>

            <form className="terminal-input" onSubmit={submitCommand}>
              <label htmlFor="planetfall-command">&gt;</label>
              <input
                id="planetfall-command"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder={exhibitComplete ? 'Continue in the full experience…' : 'Try LOOK or EXAMINE BRUSH'}
                autoComplete="off"
                spellCheck={false}
                disabled={status === 'loading' || status === 'sending' || exhibitComplete}
                aria-label="Enter a Planetfall command"
              />
              <button type="submit" disabled={!command.trim() || status === 'loading' || status === 'sending' || exhibitComplete}>Enter</button>
            </form>
          </div>

          <div className="handoff-strip">
            <div>
              <p>YOUR SHIFT IS UNDERWAY</p>
              <span>Resume the complete adventure on Planetfall.ai whenever you are ready.</span>
            </div>
            <div className="handoff-actions">
              <button type="button" onClick={beginAgain} aria-label="Begin a new Planetfall session"><RotateCcw size={13} /> Begin again</button>
              <a href={continueHref}>Continue on Planetfall.ai <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
