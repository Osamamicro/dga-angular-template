import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaCheckboxComponent } from './dga-checkbox.component';

const meta: Meta<DgaCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: DgaCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaCheckboxComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    size: 'md',
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<DgaCheckboxComponent>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <dga-checkbox size="sm" label="Small checkbox" />
        <dga-checkbox size="md" label="Medium checkbox" />
        <dga-checkbox size="lg" label="Large checkbox" />
      </div>
    `,
  }),
};
