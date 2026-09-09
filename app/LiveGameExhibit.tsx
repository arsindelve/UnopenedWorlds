'use client';

import { type ReactNode, type SyntheticEvent, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowDown, ArrowUpRight, ChevronUp, LoaderCircle, RotateCcw } from 'lucide-react';

const EXHIBIT_MOVE_LIMIT = 12;

type GameResponse = { response: string; locationName: string; moves: number; score: number };
type TranscriptEntry = { command?: string; output: string };
type ExplanationPoint = { number: string; title: ReactNode; copy: string };

export type LiveGameExhibitConfig = {
  api: string; sessionKey: string; className: string; title: string;
  collapsedDescription: string; collapsedDuration: string; collapsedScore: string; terminalName: string;
  loadingLabel: string; loadingTranscript: string; errorCopy: string;
  explanationQuote: string; firstPoint: ExplanationPoint; secondPoint: ExplanationPoint;
  invitation: string; openingCta: string; fullExperienceLabel: string; thresholdCopy: string;
  handoffTitle: string; handoffCopy: string; commandPlaceholder: string; continueUrl: string;
  responseText?: (response: string) => string;
};

function createSessionId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const random = new Uint8Array(15);
  crypto.getRandomValues(random);
  return Array.from(random, (value) => characters[value % characters.length]).join('');
}

function readSessionId(key: string) {
  const existing = localStorage.getItem(key);
  return existing && /^[A-Za-z0-9]{15}$/.test(existing) ? existing : '';
}

function getSessionId(key: string) {
  const existing = readSessionId(key);
  if (existing) return existing;
  const created = createSessionId();
  localStorage.setItem(key, created);
  return created;
}

function useStoredSessionId(key: string) {
  return useSyncExternalStore(() => () => undefined, () => readSessionId(key), () => '');
}

export function LiveGameExhibit({ config }: { config: LiveGameExhibitConfig }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const storedSessionId = useStoredSessionId(config.sessionKey);
  const [sessionId, setSessionId] = useState('');
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [command, setCommand] = useState('');
  const [game, setGame] = useState<GameResponse | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'sending' | 'error'>('idle');
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeSessionId = sessionId || storedSessionId;
  const continueHref = useMemo(() => activeSessionId ? `${config.continueUrl}#session=${encodeURIComponent(activeSessionId)}` : config.continueUrl, [activeSessionId, config.continueUrl]);
  const exhibitComplete = (game?.moves ?? 0) >= EXHIBIT_MOVE_LIMIT;
  const responseText = config.responseText ?? ((response: string) => response.trim());

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' });
  }, [entries, status]);

  async function loadSession(id = getSessionId(config.sessionKey)) {
    setStatus('loading');
    setSessionId(id);
    try {
      const response = await fetch(`${config.api}?sessionId=${encodeURIComponent(id)}`);
      if (!response.ok) throw new Error('The world did not answer.');
      const data = await response.json() as GameResponse;
      setGame(data);
      setEntries([{ output: responseText(data.response) }]);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }

  async function submitCommand(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = command.trim();
    if (!input || !activeSessionId || status === 'sending' || exhibitComplete) return;
    setCommand('');
    setStatus('sending');
    try {
      const response = await fetch(config.api, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ input, sessionId: activeSessionId }) });
      if (!response.ok) throw new Error('The world did not answer.');
      const data = await response.json() as GameResponse;
      setGame(data);
      setEntries((current) => [...current, { command: input, output: responseText(data.response) }]);
      setStatus('ready');
    } catch {
      setEntries((current) => [...current, { command: input, output: config.errorCopy }]);
      setStatus('error');
    }
  }

  function beginAgain() {
    const replacement = createSessionId();
    localStorage.setItem(config.sessionKey, replacement);
    setEntries([]);
    setGame(null);
    void loadSession(replacement);
  }

  function openExhibit() {
    setIsExpanded(true);
    if (entries.length === 0) void loadSession(activeSessionId || getSessionId(config.sessionKey));
  }

  return (
    <article className={`live-exhibit ${config.className}`} aria-labelledby={`${config.sessionKey}-title`}>
      <div className="live-exhibit-heading">
        <div><p className="live-kicker"><span /> Live interactive exhibit</p><h3 id={`${config.sessionKey}-title`}>{config.title}</h3><p>{config.collapsedDescription}</p></div>
        <div className="live-score" aria-label={isExpanded ? 'Current game status' : 'Exhibit length'}><span>{isExpanded ? game?.locationName ?? 'Connecting…' : config.collapsedDuration}</span><b>{isExpanded ? `${game?.score ?? 0} pts · ${game?.moves ?? 0} moves` : config.collapsedScore}</b></div>
      </div>
      {!isExpanded ? (
        <div className="exhibit-explanation">
          <div className="explanation-statement"><p>&gt; WHY OPEN THIS WORLD?</p><blockquote>{config.explanationQuote}</blockquote></div>
          <div className="explanation-points">{[config.firstPoint, config.secondPoint].map((point) => <div key={point.number}><span>{point.number}</span><h4>{point.title}</h4><p>{point.copy}</p></div>)}</div>
          <div className="explanation-actions"><div><p>START HERE / CONTINUE THERE</p><span>{config.invitation}</span></div><div><button type="button" onClick={openExhibit} aria-expanded="false" aria-controls={`${config.sessionKey}-terminal`}><ArrowDown size={14} /> {config.openingCta}</button><a href={continueHref}>Full experience <ArrowUpRight size={14} /></a></div></div>
        </div>
      ) : (
        <div className="terminal-reveal" id={`${config.sessionKey}-terminal`}>
          <div className="terminal-frame">
            <div className="terminal-bar"><span>{config.terminalName} / GUEST SESSION</span><div><span className={`terminal-status terminal-status--${status}`}>{status === 'sending' || status === 'loading' ? <LoaderCircle size={11} /> : <i />}{status === 'error' ? 'connection interrupted' : status === 'loading' ? config.loadingLabel : status === 'sending' ? 'the world is responding' : 'world online'}</span><button type="button" className="terminal-collapse" onClick={() => setIsExpanded(false)} aria-expanded="true" aria-controls={`${config.sessionKey}-terminal`}>Collapse <ChevronUp size={11} /></button></div></div>
            <div className="terminal-transcript" ref={transcriptRef} role="log" aria-live="polite">{entries.map((entry, index) => <div className="terminal-turn" key={`${entry.command ?? 'opening'}-${index}`}>{entry.command && <p className="terminal-command">&gt; {entry.command}</p>}<p>{entry.output}</p></div>)}{status === 'loading' && <p className="terminal-muted">&gt; {config.loadingTranscript}</p>}{exhibitComplete && <div className="terminal-threshold"><p>{config.thresholdCopy}</p><a href={continueHref}>{config.fullExperienceLabel} <ArrowUpRight size={13} /></a></div>}</div>
            <form className="terminal-input" onSubmit={submitCommand}><label htmlFor={`${config.sessionKey}-command`}>&gt;</label><input id={`${config.sessionKey}-command`} value={command} onChange={(event) => setCommand(event.target.value)} placeholder={exhibitComplete ? 'Continue in the full experience…' : config.commandPlaceholder} autoComplete="off" spellCheck={false} disabled={status === 'loading' || status === 'sending' || exhibitComplete} aria-label={`Enter a ${config.title} command`} /><button type="submit" disabled={!command.trim() || status === 'loading' || status === 'sending' || exhibitComplete}>Enter</button></form>
          </div>
          <div className="handoff-strip"><div><p>{config.handoffTitle}</p><span>{config.handoffCopy}</span></div><div className="handoff-actions"><button type="button" onClick={beginAgain} aria-label={`Begin a new ${config.title} session`}><RotateCcw size={13} /> Begin again</button><a href={continueHref}>{config.fullExperienceLabel} <ArrowUpRight size={15} /></a></div></div>
        </div>
      )}
    </article>
  );
}
