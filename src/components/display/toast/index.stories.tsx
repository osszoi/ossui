import { Toast } from './Toast';

export default {
  title: 'Display/Toast',
  component: Toast,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: 'text' },
    open: { control: 'boolean' },
    animationType: {
      control: {
        type: 'select',
        options: ['width', 'fromTop']
      }
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: 'UMF Miami is live right now!',
    animationType: 'width',
    open: true
  }
};

export const Default = {};
