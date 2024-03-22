import React from 'react';
import './style.css';

interface Props {
  fontSize?: string;
  n: number;
  maxDigits?: number;
}

export const AnimatedNumber = ({ n, fontSize = '72px', maxDigits }: Props) => {
  const digits = n.toString().split('').map(Number);

  if (maxDigits) {
    while (digits.length < maxDigits) {
      digits.unshift(0);
    }
  }

  const style = { fontSize, height: fontSize };

  return (
    <div className="number-container">
      {digits.map((digit, k) => (
        <div
          className="digit"
          style={style}>
          <div
            className="digit__track"
            style={{ transform: `translateY(-${digit}0%)` }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={{
                  visibility:
                    i === 0
                      ? (maxDigits || n.toString().length) - k <=
                        n.toString().length
                        ? 'visible'
                        : 'hidden'
                      : 'visible',
                  ...style,
                  ...(i === digit
                    ? {
                        opacity: 1
                      }
                    : { opacity: 0.4 })
                }}>
                {i}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
