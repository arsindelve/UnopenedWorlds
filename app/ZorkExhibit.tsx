'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, LoaderCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [sessionId, setSessionId] = useState('');
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [command, setCommand] = useState('');
  const [game, setGame] = useState<GameResponse | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'sending' | 'error'>('loading');
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
    void loadSession();
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

  return (
    <article className="live-exhibit live-exhibit--zork" aria-labelledby="zork-exhibit-title">
      <div className="live-exhibit-heading">
        <div>
          <p className="live-kicker"><span /> Live interactive exhibit</p>
          <h3 id="zork-exhibit-title">Zork I, re-imagined.</h3>
          <p>Begin here. Continue the very same adventure on NewZork.ai.</p>
        </div>
        <div className="live-score" aria-label="Current game status">
          <span>{game?.locationName ?? 'Connecting…'}</span>
          <b>{game?.score ?? 0} pts · {game?.moves ?? 0} moves</b>
        </div>
      </div>

      <div className="terminal-frame">
        <div className="terminal-bar">
          <span>NEWZORK / GUEST SESSION</span>
          <span className={`terminal-status terminal-status--${status}`}>
            {status === 'sending' || status === 'loading' ? <LoaderCircle size={11} /> : <i />}
            {status === 'error' ? 'connection interrupted' : status === 'loading' ? 'opening world' : status === 'sending' ? 'world is responding' : 'world online'}
          </span>
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
          <Input
            id="zork-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder={exhibitComplete ? 'Continue in the full experience…' : 'Try OPEN MAILBOX or GO NORTH'}
            autoComplete="off"
            spellCheck={false}
            disabled={status === 'loading' || status === 'sending' || exhibitComplete}
            aria-label="Enter a Zork command"
          />
          <Button type="submit" disabled={!command.trim() || status === 'loading' || status === 'sending' || exhibitComplete}>Enter</Button>
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
    </article>
  );
}
