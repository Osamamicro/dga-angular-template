import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DgaPopoverComponent } from './dga-popover.component';

const meta: Meta<DgaPopoverComponent> = {
  title: 'Components/Popover',
  component: DgaPopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaPopoverComponent],
    }),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  render: (args) => ({
    props: {
      ...args,
      onOpenChange: (isOpen: boolean) => console.log('Popover open:', isOpen),
    },
    template: `
      <div style="display: flex; justify-content: center; padding: 120px;">
        <dga-popover [position]="position" (openChange)="onOpenChange($event)">
          <button popover-trigger>Click to toggle popover</button>
          <div>
            <p><strong>Popover Content</strong></p>
            <p>This is the popover body. You can place any content here.</p>
          </div>
        </dga-popover>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<DgaPopoverComponent>;

export const Default: Story = {
  args: {
    position: 'bottom',
  },
};

export const Positions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 48px; justify-content: center; padding: 160px 80px;">
        <dga-popover position="top">
          <button popover-trigger>Top</button>
          <div>
            <p><strong>Top Popover</strong></p>
            <p>Content positioned above the trigger.</p>
          </div>
        </dga-popover>

        <dga-popover position="bottom">
          <button popover-trigger>Bottom</button>
          <div>
            <p><strong>Bottom Popover</strong></p>
            <p>Content positioned below the trigger.</p>
          </div>
        </dga-popover>

        <dga-popover position="left">
          <button popover-trigger>Left</button>
          <div>
            <p><strong>Left Popover</strong></p>
            <p>Content positioned to the left.</p>
          </div>
        </dga-popover>

        <dga-popover position="right">
          <button popover-trigger>Right</button>
          <div>
            <p><strong>Right Popover</strong></p>
            <p>Content positioned to the right.</p>
          </div>
        </dga-popover>
      </div>
    `,
  }),
};
