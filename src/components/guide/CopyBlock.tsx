import { useState } from 'react';
import { LAND } from '../../lib/theme';

interface Props {
  name: string;
  text: string;
  copyLabel: string;
  copiedLabel: string;
  maxHeight?: number;
}

export default function CopyBlock({ name, text, copyLabel, copiedLabel, maxHeight }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access denied: the text is still selectable by hand.
    }
  };

  return (
    <div style={{ marginTop: 18, background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: LAND.rMd, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '8px 8px 8px 16px', borderBottom: `1px solid ${LAND.line}` }}>
        <span style={{ fontSize: 11.5, color: LAND.dim, fontFamily: LAND.mono, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          style={{
            minHeight: 32,
            padding: '6px 14px',
            borderRadius: 8,
            border: 'none',
            background: copied ? LAND.green : LAND.accent,
            color: '#fff',
            fontSize: 12.5,
            fontWeight: 700,
            fontFamily: LAND.sans,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '16px 18px',
          maxHeight,
          overflowY: maxHeight ? 'auto' : undefined,
          fontFamily: LAND.mono,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: LAND.muted,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {text}
      </pre>
    </div>
  );
}
