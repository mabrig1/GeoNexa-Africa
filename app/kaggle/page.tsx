export const metadata = {
  title: 'Kaggle Research Connection | GeoNexa Africa',
  description: 'Access the GeoNexa Kaggle notebook and the experimental cloud inference bridge.'
};

const notebook = 'https://www.kaggle.com/code/mabrigkorie/geonexa';
const run = 'https://www.kaggle.com/code/mabrigkorie/geonexa/edit/run/359001056';

const card: React.CSSProperties = {
  borderRadius: 16,
  border: '1px solid #32576a',
  background: '#123040',
  padding: 24
};

export default function KaggleConnectionPage() {
  return <main style={{ maxWidth: 900, margin: 'auto', padding: '40px 20px 70px', fontFamily: 'system-ui', lineHeight: 1.6 }}>
    <a href="/" style={{ color: '#7fe5cc' }}>← GeoNexa Home</a>
    <h1>GeoNexa ↔ Kaggle Research</h1>
    <p>Access the original Kaggle notebook and saved run remotely—without copying the notebook, dataset or model into your browser, PC or GeoNexa source repository.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
      <section style={card}>
        <h2>Linked Kaggle Notebook</h2>
        <p><strong>mabrigkorie/geonexa</strong></p>
        <p>Direct link established. Notebook contents and trained-model artifacts have not yet been independently verified.</p>
        <a href={notebook} target="_blank" rel="noopener noreferrer" style={{ color: '#7fe5cc' }}>Open Kaggle Notebook ↗</a>
      </section>
      <section style={card}>
        <h2>Requested Run</h2>
        <p><strong>Run 359001056</strong></p>
        <p>This Kaggle editor/run link may require signing into the notebook owner's Kaggle account.</p>
        <a href={run} target="_blank" rel="noopener noreferrer" style={{ color: '#7fe5cc' }}>Open Kaggle Run ↗</a>
      </section>
    </div>
    <section style={{ ...card, marginTop: 20 }}>
      <h2>AI model connection</h2>
      <p><strong>Prepared, not activated:</strong> GeoNexa includes an owner-protected server API for a separately hosted HTTPS model endpoint. Kaggle notebooks do not automatically offer a permanent public chat-inference API.</p>
      <p>Once the model has a supported hosted inference endpoint and server-side credentials are configured, the GeoMind bridge can send bounded queries to the remote model. The notebook remains your training and research workspace.</p>
      <p>No model files or dataset copies are shipped with this website.</p>
      <a href="/geomind" style={{ color: '#7fe5cc' }}>Return to GeoMind →</a>
    </section>
    <p style={{ color: '#bed4dc' }}>Scientific safeguard: generated geological interpretations must be checked against actual observations and original datasets before field decisions.</p>
  </main>;
}
