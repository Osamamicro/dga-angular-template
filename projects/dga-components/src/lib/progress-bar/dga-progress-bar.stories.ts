import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaProgressBarComponent } from './dga-progress-bar.component';

const meta: Meta<DgaProgressBarComponent> = {
  title: 'Components/Progress Bar',
  component: DgaProgressBarComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaProgressBarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    indeterminate: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DgaProgressBarComponent>;

export const Default: Story = {
  args: {
    value: 45,
    indeterminate: false,
    showLabel: false,
    color: 'primary',
    ariaLabel: 'Progress',
  },
};

export const WithLabel: Story = {
  args: {
    value: 72,
    showLabel: true,
    color: 'primary',
    ariaLabel: 'Upload progress',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    color: 'primary',
    ariaLabel: 'Loading in progress',
  },
};

export const Colors: Story = {
  render: (args) => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <dga-progress-bar [value]="60" color="primary" [showLabel]="true" ariaLabel="Primary progress"></dga-progress-bar>
        <dga-progress-bar [value]="80" color="success" [showLabel]="true" ariaLabel="Success progress"></dga-progress-bar>
        <dga-progress-bar [value]="45" color="warning" [showLabel]="true" ariaLabel="Warning progress"></dga-progress-bar>
        <dga-progress-bar [value]="30" color="danger" [showLabel]="true" ariaLabel="Danger progress"></dga-progress-bar>
      </div>
    `,
  }),
};
