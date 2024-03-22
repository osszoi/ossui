import React, { useRef, useState } from 'react';
import './style.css';

const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error(error);
  }
};

interface Props {
  value: string;
  tooltip?: string;
  onClick?: () => void;
}

export const Copy = ({ value, tooltip = '', onClick }: Props) => {
  const [copied, setCopied] = useState(false);
  const copyClear = useRef<any>(null);

  const copy = async () => {
    await copyToClipboard(value);

    setCopied(true);
    if (copyClear !== undefined) clearTimeout(copyClear as any);
    copyClear.current = setTimeout(() => setCopied(false), 5000);
    onClick?.();
  };

  return (
    <div data-copied={copied}>
      <button
        type="button"
        title={tooltip}
        onClick={copy}>
        <svg
          className="clipboard"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            className="clipboard__board"
            d="M15.666 3.888a2.25022 2.25022 0 0 0-.808-1.18262A2.25011 2.25011 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612a.74983.74983 0 0 1-.2197.53033A.74987.74987 0 0 1 15 5.25H9a.75001.75001 0 0 1-.75-.75c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5c0 .5967-.2371 1.169-.659 1.591a2.2504 2.2504 0 0 1-1.591.659H6.75a2.25023 2.25023 0 0 1-1.59099-.659A2.25015 2.25015 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.21804 48.21804 0 0 1 1.927-.184"
            stroke="currentColor"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            className="clipboard__paper"
            d="M10.75 8H7.9375C7.42 8 7 8.41067 7 8.91667v9.16663c0 .506.42.9167.9375.9167h8.125c.5175 0 .9375-.4107.9375-.9167v-1.5277M10.75 8h5.3125C16.58 8 17 8.41067 17 8.91667v7.63893"
            stroke="currentColor"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            className="clipboard__check"
            pathLength="1"
            d="m10.125 14.1146 1.25 1.2222 2.5-3.0556"
            stroke="currentColor"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="sr-only">Copy</span>
      </button>
    </div>
  );
};
