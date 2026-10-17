'use client';
import { useState } from 'react';

type Plan = { workflow: string; execution: string; humanApprovalRequired: boolean; steps: string[]; notice: string };
type InferenceResult = { answer?: string; error?: string; disclaimer?: string };

const shell = { maxWidth: 900, margin: 'auto', padding: '40px 20px', fontFamily: 'system-ui' };
const panel = { border: '1px solid #315466', borderRadius: 14, padding: 22, background: '#123040', marginTop: 24 };
const control = { background: '#071e2a', color: '#fff', border: '1px solid #648595', padding: 12, borderRadius: 8, width: '100%', boxSizing: 'border-box' as const };
const button = { background: '#7fe5cc', color: '#09212a', padding: '11px 16px', borderRadius: 8, border: 0, cursor: 'pointer', fontWeight: 700 as const };

export default function GeoMind() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [ownerToken, setOwnerToken] = useState('');
  const [answer, setAnswer] = useState('');
  const [aiError, setAiError] = useState('');
  const [busy, setBusy] = useState(false);

  async function show(workflow: 'earthscan' | 'geowater') {
    setError(''); setPlan(null);
    try {
      const r = await fetch('/api/agents/plan', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setPlan(data);
    } catch (e) { setError(e instanceof Error ? e.message : 'Failed to load plan'); }
  }

  async function ask() {
    setBusy(true); setAiError(''); setAnswer('');
    try {
      const response = await fetch('/api/geomind/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ownerToken}`
        },
        body: JSON.stringify({ question })
      });
      const result: InferenceResult = await response.json();
      if (!response.ok || !result.answer) throw new Error(result.error || 'Remote model did not answer');
      setAnswer(result.answer);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'Could not connect to the remote model');
    } finally {
      setBusy(false);
    }
  }

  return <main style={shell}>
    <a href="/" style={{ color: '#7fe5cc' }}>← Home</a>
    <h1>GeoMind — Cloud AI and Supervised Workflows</h1>
    <p>Plan scientific workflows, inspect the Kaggle research source and connect a privately hosted model. No dataset or model weights are downloaded to your device.</p>

    <section style={panel} aria-labelledby="kaggle-title">
      <h2 id="kaggle-title">Kaggle GeoNexa research source</h2>
      <p>The notebook is linked as a research and training source, <strong>not</strong> as an always-on inference API. Notebook contents, run outputs, and model readiness have not been independently verified.</p>
      <p><a href="/kaggle" style={{ color: '#7fe5cc' }}>Open Kaggle connection hub →</a> · <a href="https://www.kaggle.com/code/mabrigkorie/geonexa/edit/run/359001056" target="_blank" rel="noopener noreferrer" style={{ color: '#7fe5cc' }}>Open Kaggle run 359001056 ↗</a></p>
      <p><small>To run a trained LLM here, deploy its approved model artifacts to a cloud inference service and configure GeoNexa's server-side endpoint in Vercel. Datasets can remain remote.</small></p>
    </section>

    <section style={panel} aria-labelledby="ai-title">
      <h2 id="ai-title">Private remote-model test</h2>
      <p>The model runs on a cloud service, not Kaggle's notebook editor or your browser. This test is owner-only and disabled until server credentials and an inference endpoint are configured.</p>
      <form onSubmit={e => { e.preventDefault(); void ask(); }}>
        <label htmlFor="geomind-owner">Owner access token (not saved)</label>
        <input id="geomind-owner" type="password" autoComplete="off" value={ownerToken} onChange={e => setOwnerToken(e.target.value)} style={{ ...control, margin: '8px 0 16px' }} required minLength={32} />
        <label htmlFor="geomind-question">Research question</label>
        <textarea id="geomind-question" value={question} onChange={e => setQuestion(e.target.value)} minLength={3} maxLength={800} rows={4} style={{ ...control, display: 'block', margin: '8px 0 16px' }} placeholder="Explain what a resistivity survey can and cannot establish..." required />
        <button type="submit" style={button} disabled={busy || question.trim().length < 3 || ownerToken.length < 32}>{busy ? 'Contacting model…' : 'Ask hosted GeoMind model →'}</button>
      </form>
      {aiError && <p role="alert" style={{ color: '#ffc4bc' }}>{aiError}</p>}
      {answer && <section aria-live="polite"><h3>Experimental model response</h3><p style={{ whiteSpace: 'pre-wrap' }}>{answer}</p><small>Not professional geological advice; verify with independent data and qualified experts.</small></section>}
    </section>

    <section style={panel} aria-labelledby="plan-title">
      <h2 id="plan-title">Supervised scientific workflows</h2>
      <p>These deterministic planning workflows remain available without AI credentials. They do not execute geological predictions.</p>
      <button style={button} onClick={() => void show('earthscan')}>EarthScan plan</button>{' '}
      <button style={button} onClick={() => void show('geowater')}>GeoWater plan</button>
      {error && <p role="alert">{error}</p>}
      {plan && <section aria-live="polite"><h3>{plan.workflow} workflow</h3><p>{plan.notice}</p><ol>{plan.steps.map(s => <li key={s}>{s.replaceAll('_', ' ')}</li>)}</ol><p>Human approval required: {plan.humanApprovalRequired ? 'Yes' : 'No'}</p></section>}
    </section>
  </main>;
}
