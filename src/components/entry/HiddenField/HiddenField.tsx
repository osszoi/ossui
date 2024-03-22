import React, { useEffect, useRef, useState } from 'react';
import './style.css';

interface Props {
  label?: string;
  hideLabel?: boolean;
  showLast?: number;
  width?: string | number;
  noBorder?: boolean;
  hideEye?: boolean;
  value: any;
  children?: React.ReactNode;
}

export const HiddenField = ({
  label = '',
  hideLabel,
  showLast = 4,
  width = '100%',
  noBorder,
  hideEye,
  value,
  children
}: Props) => {
  const eye = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element: any = eye.current;
    if (element) {
      element.style.transition = 'opacity 0.5s ease';
      element.style.opacity = 0;

      const timeoutId = setTimeout(() => {
        element.setAttribute(
          'mask',
          visible ? 'url(#eye-open)' : 'url(#eye-closed)'
        );
        element.style.opacity = 1;
      }, 250);

      return () => clearTimeout(timeoutId);
    }
  }, [visible]);

  useEffect(() => {
    const element: any = eye.current;
    if (element) {
      element.style.transition = 'opacity 0.5s ease';
      element.style.opacity = 0;

      setTimeout(() => {
        element.setAttribute(
          'mask',
          visible ? 'url(#eye-open)' : 'url(#eye-closed)'
        );
        element.style.opacity = 1;
      }, 100);
    }
  }, [visible]);

  return (
    <div
      className="credit-card"
      data-visible={visible}
      style={{ width, border: noBorder ? '' : '1px solid var(--color)' }}>
      {!hideLabel && <label htmlFor="number">{label}</label>}

      <div
        className="card"
        aria-hidden="true">
        {value.split('').map((char, index) => {
          return (
            <span
              className={`card__char ${
                index > value.split('').length - 1 - showLast
                  ? 'card__char--static'
                  : ''
              }`}
              key={`${char}--${index}`}>
              {index <= value.split('').length - 1 - showLast &&
              char !== ' ' ? (
                // @ts-expect-error: Its ok
                <span style={{ '--index': index }}>•</span>
              ) : null}

              {/* @ts-expect-error: Its ok */}
              <span style={{ '--index': index }}>{char}</span>
            </span>
          );
        })}
      </div>

      <input
        id="number"
        type={visible ? 'text' : 'password'}
        readOnly
        defaultValue={value}
        className="sr-only"
      />

      <div className="credit-card__actions">
        {!hideEye && (
          <button
            type="button"
            title={'Reveal'}
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}>
            <svg
              className="eye-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="eye-open">
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12V20H12H1V12Z"
                    fill="#D9D9D9"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </mask>
                <mask id="eye-closed">
                  <path
                    d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12V20H12H1V12Z"
                    fill="#D9D9D9"
                  />
                </mask>
              </defs>

              <path
                className={`lid lid--upper ${!visible ? 'hidden' : ''}`}
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                className="lid lid--lower"
                d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g mask="url(#eye-open)">
                <g
                  className="eye"
                  ref={eye}>
                  <circle
                    cy="12"
                    cx="12"
                    r="4"
                    fill="currentColor"
                  />
                  <circle
                    cy="11"
                    cx="13"
                    r="1"
                    fill="black"
                  />
                </g>
              </g>
            </svg>

            <span className="sr-only">Reveal</span>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
