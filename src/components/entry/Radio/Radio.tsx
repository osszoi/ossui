import React from 'react';
import './styles.css';

interface RadioProps {
  selected?: any;
  values: any[];
  valueFrom?: string;
  labelFrom?: string;
  group?: string;
}

export const Radio = ({
  values,
  selected,
  valueFrom = 'value',
  labelFrom = 'label',
  group = 'radio-group'
}: RadioProps) => {
  return (
    <div className="radio-box">
      {values.map((v, i) => {
        const value = typeof v === 'string' ? v : v[valueFrom];
        const label = typeof v === 'string' ? v : v[labelFrom];

        return (
          <>
            <input
              type="radio"
              id={`id-${i}`}
              value={value}
              name={group}
            />
            <label htmlFor={`id-${i}`}>{label}</label>
          </>
        );
      })}
    </div>
  );
};
