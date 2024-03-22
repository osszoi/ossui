import { HiddenField } from './HiddenField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Entry/HiddenField',
  component: HiddenField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: 'text' },
    width: { control: 'text' },
    value: { control: 'text' },
    noBorder: { control: 'boolean' }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    width: '300px',
    showLast: 0,
    noBorder: false,
    hideLabel: false,
    hideEye: false
  }
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    label: 'My super secret password',
    value: '12345678'
  }
};

export const CreditCard = {
  args: {
    label: 'Credit card',
    value: '1234 1234 1234 1234',
    showLast: 4
  }
};
