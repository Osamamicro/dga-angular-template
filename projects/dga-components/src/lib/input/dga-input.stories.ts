import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaInputComponent } from './dga-input.component';

const meta: Meta<DgaInputComponent> = {
  title: 'Components/Input',
  component: DgaInputComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaInputComponent],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'search'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
  args: {
    type: 'text',
    size: 'lg',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<DgaInputComponent>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@domain.com',
    helperText: 'We will never share your email.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@domain.com',
    errorMessage: 'Please enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Readonly Input',
    readonly: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <dga-input size="sm" label="Small" placeholder="Small input" />
        <dga-input size="md" label="Medium" placeholder="Medium input" />
        <dga-input size="lg" label="Large" placeholder="Large input" />
      </div>
    `,
  }),
};

export const WithMaxLength: Story = {
  args: {
    label: 'Username',
    placeholder: 'Max 20 characters',
    maxLength: 20,
    helperText: 'Maximum 20 characters allowed.',
  },
};
