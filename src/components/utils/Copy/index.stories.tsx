import React from 'react';
import { HiddenField } from '../../entry/HiddenField/HiddenField';
import { Copy } from './Copy';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Utils/Copy',
  component: Copy,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {}
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = (args) => {
  const apiKey = 'iXThE0KZQHaYuXFZTJk0EkdO5NEuiawxdmx9UtfqdhAy6mb';

  return (
    <HiddenField
      value={apiKey}
      showLast={6}
      label="API Key">
      <Copy value={apiKey} />
    </HiddenField>
  );
};
