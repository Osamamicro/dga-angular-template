import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaSwitchComponent } from './dga-switch.component';

const meta: Meta<DgaSwitchComponent> = {
  title: 'Components/Switch',
  component: DgaSwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaSwitchComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<DgaSwitchComponent>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <dga-switch size="sm" label="Small switch" />
        <dga-switch size="md" label="Medium switch" />
        <dga-switch size="lg" label="Large switch" />
      </div>
    `,
  }),
};
