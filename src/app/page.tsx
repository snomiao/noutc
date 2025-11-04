export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>No UTC - Time Conversion Service</h1>
      <p>Convert UTC timestamps to local time as SVG</p>

      <h2>Usage</h2>
      <p>Access: <code>/api/t.svg?t=&lt;timestamp&gt;&amp;f=&lt;format&gt;</code></p>

      <h3>Example</h3>
      <p>
        <code>/api/t.svg?t=2025-10-31T00:00:00Z&amp;f=YYYYMMDD-hhmmsss%20TZ</code>
      </p>

      <h3>Parameters</h3>
      <ul>
        <li><strong>t</strong>: ISO 8601 timestamp (required)</li>
        <li><strong>f</strong>: Date format string (optional, default: yyyy-MM-dd HH:mm:ss zzz)</li>
      </ul>

      <h3>Format Patterns</h3>
      <ul>
        <li>YYYY - 4-digit year</li>
        <li>MM - 2-digit month</li>
        <li>DD - 2-digit day</li>
        <li>hh - 2-digit hour (24-hour)</li>
        <li>mm - 2-digit minute</li>
        <li>sss - 2-digit second</li>
        <li>TZ - timezone abbreviation</li>
      </ul>

      <h3>Demo</h3>
      <img src="/api/t.svg?t=2025-10-31T00:00:00Z&f=YYYYMMDD-hhmmsss%20TZ" alt="Time display" />
    </div>
  );
}
