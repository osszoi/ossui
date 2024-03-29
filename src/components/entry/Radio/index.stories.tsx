import React from 'react';
import { Radio } from './Radio';

export default {
  title: 'Entry/Radio',
  component: Radio,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   children: { control: 'text' },
  //   open: { control: 'boolean' },
  //   animationType: {
  //     control: {
  //       type: 'select',
  //       options: ['width', 'fromTop']
  //     }
  //   }
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {}
};

export const Default = () => {
  const values = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  return (
    <div style={{ width: '300px' }}>
      <Radio values={values} />
    </div>
  );
};
