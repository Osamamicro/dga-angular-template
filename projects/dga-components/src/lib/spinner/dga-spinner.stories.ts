import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaSpinnerComponent } from './dga-spinner.component';

const meta: Meta<DgaSpinnerComponent> = {
  title: 'Components/Spinner',
  component: DgaSpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaSpinnerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'neutral'],
    },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DgaSpinnerComponent>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
    ariaLabel: 'Loading',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <dga-spinner size="sm" color="primary" ariaLabel="Small spinner"></dga-spinner>
        <dga-spinner size="md" color="primary" ariaLabel="Medium spinner"></dga-spinner>
        <dga-spinner size="lg" color="primary" ariaLabel="Large spinner"></dga-spinner>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: (args) => ({
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <dga-spinner size="md" color="primary" ariaLabel="Primary spinner"></dga-spinner>
        <dga-spinner size="md" color="secondary" ariaLabel="Secondary spinner"></dga-spinner>
        <dga-spinner size="md" color="danger" ariaLabel="Danger spinner"></dga-spinner>
        <dga-spinner size="md" color="neutral" ariaLabel="Neutral spinner"></dga-spinner>
      </div>
    `,
  }),
};
