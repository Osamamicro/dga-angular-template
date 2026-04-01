import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaTextareaComponent } from './dga-textarea.component';

const meta: Meta<DgaTextareaComponent> = {
  title: 'Components/Textarea',
  component: DgaTextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaTextareaComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    rows: { control: 'number' },
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    size: 'lg',
    rows: 3,
    placeholder: 'Enter text...',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<DgaTextareaComponent>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    errorMessage: 'This field is required.',
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 200,
    helperText: 'Maximum 200 characters.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};
