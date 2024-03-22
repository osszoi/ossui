import React, { useState } from 'react';
import { AnimatedNumber } from './AnimatedNumber';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Display/AnimatedNumber',
  component: AnimatedNumber,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    fontSize: { control: 'text' },
    maxDigits: { control: 'number' },
    n: { control: { type: 'range', min: 1, max: 99, step: 1 } }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    fontSize: '128px',
    maxDigits: 2
  }
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    n: 20
  }
};

export const Pricing = () => {
  const pricings = [
    { name: 'Monthly', price: 5 },
    { name: 'Yearly', price: 49 },
    { name: 'Lifetime', price: 199 }
  ];

  const [selected, setSelected] = useState(0);
  const fontSize = '72px';

  return (
    <div>
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          gap: '20px',
          marginBottom: '40px'
        }}>
        {pricings.map(({ name }, i) => (
          <li
            key={name}
            onClick={() => setSelected(i)}
            style={{
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '10px',
              ...(selected === i
                ? {
                    backgroundColor: 'hsl(0 0 80%)'
                  }
                : {})
            }}>
            {name}
          </li>
        ))}
      </ul>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end'
        }}>
        <AnimatedNumber
          fontSize={fontSize}
          n={pricings[selected].price}
          maxDigits={3}
        />
        <span style={{ fontSize: '42px', paddingBottom: '4px' }}>$</span>
      </div>
    </div>
  );
};
