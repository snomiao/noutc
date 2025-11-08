'use client';

import { useState } from 'react';

export default function Home() {
  const [datetime, setDatetime] = useState('2025-10-31T00:00:00Z');
  const [format, setFormat] = useState('yyyy-MM-dd HH:mm:ss zzz');
  const [relative, setRelative] = useState(false);
  const [bgColor, setBgColor] = useState('white');
  const [fgColor, setFgColor] = useState('black');

  const commonFormats = [
    { label: 'Default (yyyy-MM-dd HH:mm:ss zzz)', value: 'yyyy-MM-dd HH:mm:ss zzz' },
    { label: 'Short (yyyy-MM-dd HH:mm)', value: 'yyyy-MM-dd HH:mm' },
    { label: 'Long (MMMM dd, yyyy HH:mm:ss zzz)', value: 'MMMM dd, yyyy HH:mm:ss zzz' },
    { label: 'Full (EEEE, MMMM dd, yyyy HH:mm:ss zzz)', value: 'EEEE, MMMM dd, yyyy HH:mm:ss zzz' },
    { label: 'ISO Format (yyyy-MM-dd\'T\'HH:mm:ss)', value: 'yyyy-MM-dd\'T\'HH:mm:ss' },
    { label: 'US Format (MM/dd/yyyy hh:mm a)', value: 'MM/dd/yyyy hh:mm a' },
    { label: 'Relative Time (X ago)', value: 'relative' },
  ];

  const getCurrentUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://noutc.vercel.app';
    const params = new URLSearchParams();
    params.set('t', datetime);
    if (format !== 'relative') {
      params.set('f', format);
      if (relative) params.set('relative', 'true');
    } else {
      params.set('relative', 'true');
    }
    if (bgColor !== 'white') params.set('bg', bgColor);
    if (fgColor !== 'black') params.set('fg', fgColor);
    return `${baseUrl}/api/t.svg?${params.toString()}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const markdownCode = `![Time](${getCurrentUrl()})`;
  const htmlCode = `<img src="${getCurrentUrl()}" alt="Time display" />`;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>No UTC - Time Conversion Service</h1>
      <p>Convert UTC timestamps to local time as SVG images</p>

      {/* Interactive Demo Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem',
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ marginTop: 0 }}>🎨 Interactive Demo</h2>

        {/* Datetime Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="datetime" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            DateTime (ISO 8601):
          </label>
          <input
            id="datetime"
            type="text"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            placeholder="2025-10-31T00:00:00Z"
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}
          />
          <small style={{ color: '#6c757d' }}>
            Example: {new Date().toISOString()} (current time)
          </small>
        </div>

        {/* Format Selection */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="format" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Format:
          </label>
          <select
            id="format"
            value={format === 'relative' ? 'relative' : format}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'relative') {
                setFormat('yyyy-MM-dd HH:mm:ss zzz');
                setRelative(true);
              } else {
                setFormat(val);
                setRelative(false);
              }
            }}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}
          >
            {commonFormats.map((fmt) => (
              <option key={fmt.value} value={fmt.value}>
                {fmt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Format Input */}
        {!relative && (
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="custom-format" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Custom Format:
            </label>
            <input
              id="custom-format"
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              placeholder="yyyy-MM-dd HH:mm:ss zzz"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        )}

        {/* Color Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label htmlFor="bg-color" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Background Color:
            </label>
            <input
              id="bg-color"
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="white"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
            />
          </div>
          <div>
            <label htmlFor="fg-color" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Foreground Color:
            </label>
            <input
              id="fg-color"
              type="text"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              placeholder="black"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Preview:</h3>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
            <img src={getCurrentUrl()} alt="Time display" />
          </div>
        </div>

        {/* Copy Buttons */}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Copy Code:</h3>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong>Markdown:</strong>
              <button
                onClick={() => copyToClipboard(markdownCode)}
                style={{
                  padding: '0.4rem 1rem',
                  background: '#0d6efd',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                📋 Copy Markdown
              </button>
            </div>
            <pre style={{
              background: '#f8f9fa',
              padding: '0.75rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.85rem',
              margin: 0,
              border: '1px solid #dee2e6'
            }}>
              <code>{markdownCode}</code>
            </pre>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong>HTML:</strong>
              <button
                onClick={() => copyToClipboard(htmlCode)}
                style={{
                  padding: '0.4rem 1rem',
                  background: '#198754',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                📋 Copy HTML
              </button>
            </div>
            <pre style={{
              background: '#f8f9fa',
              padding: '0.75rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.85rem',
              margin: 0,
              border: '1px solid #dee2e6'
            }}>
              <code>{htmlCode}</code>
            </pre>
          </div>
        </div>

        {/* URL Display */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <strong>Direct URL:</strong>
            <button
              onClick={() => copyToClipboard(getCurrentUrl())}
              style={{
                padding: '0.4rem 1rem',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              📋 Copy URL
            </button>
          </div>
          <pre style={{
            background: '#f8f9fa',
            padding: '0.75rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.85rem',
            margin: 0,
            border: '1px solid #dee2e6',
            wordBreak: 'break-all'
          }}>
            <code>{getCurrentUrl()}</code>
          </pre>
        </div>
      </div>

      {/* Examples Section */}
      <div style={{ marginTop: '2rem' }}>
        <h2>📚 Examples</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Absolute Time (with timezone)</h3>
          <img src="/api/t.svg?t=2025-10-31T00:00:00Z&f=yyyy-MM-dd%20HH:mm:ss%20zzz" alt="Absolute time example" />
          <pre style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem' }}>
            <code>/api/t.svg?t=2025-10-31T00:00:00Z&f=yyyy-MM-dd%20HH:mm:ss%20zzz</code>
          </pre>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Relative Time ("X ago")</h3>
          <img src="/api/t.svg?t=2025-01-01T00:00:00Z&relative=true" alt="Relative time example" />
          <pre style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem' }}>
            <code>/api/t.svg?t=2025-01-01T00:00:00Z&relative=true</code>
          </pre>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Custom Format</h3>
          <img src="/api/t.svg?t=2025-12-25T15:30:00Z&f=MMMM%20dd,%20yyyy%20HH:mm%20zzz" alt="Custom format example" />
          <pre style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem' }}>
            <code>/api/t.svg?t=2025-12-25T15:30:00Z&f=MMMM%20dd,%20yyyy%20HH:mm%20zzz</code>
          </pre>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Long Format</h3>
          <img src="/api/t.svg?t=2025-07-04T12:00:00Z&f=EEEE,%20MMMM%20dd,%20yyyy%20HH:mm:ss%20zzz" alt="Long format example" />
          <pre style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem' }}>
            <code>/api/t.svg?t=2025-07-04T12:00:00Z&f=EEEE,%20MMMM%20dd,%20yyyy%20HH:mm:ss%20zzz</code>
          </pre>
        </div>
      </div>

      {/* API Documentation */}
      <div style={{ marginTop: '2rem' }}>
        <h2>📖 API Documentation</h2>

        <h3>Usage</h3>
        <p>Access: <code>/api/t.svg?t=&lt;timestamp&gt;&f=&lt;format&gt;&relative=&lt;true|false&gt;&bg=&lt;color&gt;&fg=&lt;color&gt;</code></p>

        <h3>Parameters</h3>
        <ul>
          <li><strong>t</strong> (optional): ISO 8601 timestamp - defaults to current time if not provided</li>
          <li><strong>f</strong> (optional): Date format string - default: <code>yyyy-MM-dd HH:mm:ss zzz</code></li>
          <li><strong>relative</strong> (optional): Set to <code>true</code> for relative time format (e.g., "5 minutes ago")</li>
          <li><strong>bg</strong> (optional): Background color - default: <code>white</code></li>
          <li><strong>fg</strong> (optional): Foreground/text color - default: <code>black</code></li>
        </ul>

        <h3>Format Patterns</h3>
        <p>Common patterns (case-sensitive):</p>
        <ul>
          <li><code>yyyy</code> - 4-digit year</li>
          <li><code>MM</code> - 2-digit month (01-12)</li>
          <li><code>dd</code> - 2-digit day (01-31)</li>
          <li><code>HH</code> - 2-digit hour, 24-hour format (00-23)</li>
          <li><code>hh</code> - 2-digit hour, 12-hour format (01-12)</li>
          <li><code>mm</code> - 2-digit minute (00-59)</li>
          <li><code>ss</code> - 2-digit second (00-59)</li>
          <li><code>a</code> - AM/PM</li>
          <li><code>zzz</code> - timezone abbreviation (e.g., EDT, PST)</li>
          <li><code>MMMM</code> - full month name (e.g., January)</li>
          <li><code>EEEE</code> - full day name (e.g., Monday)</li>
        </ul>

        <p>Legacy patterns (automatically converted):</p>
        <ul>
          <li><code>YYYY</code> - converted to <code>yyyy</code></li>
          <li><code>DD</code> - converted to <code>dd</code></li>
          <li><code>sss</code> - converted to <code>ss</code></li>
          <li><code>TZ</code> - converted to <code>zzz</code></li>
        </ul>
      </div>

      {/* Features */}
      <div style={{ marginTop: '2rem' }}>
        <h2>✨ Features</h2>
        <ul>
          <li>Automatically detects user's timezone from HTTP request headers</li>
          <li>Converts UTC timestamps to local time</li>
          <li>Returns formatted time as SVG image</li>
          <li>Supports custom date format strings</li>
          <li>Relative time format (e.g., "5 minutes ago", "2 hours ago")</li>
          <li>Built with Next.js and date-fns</li>
        </ul>
      </div>
    </div>
  );
}
