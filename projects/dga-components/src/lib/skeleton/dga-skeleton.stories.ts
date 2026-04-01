import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaSkeletonComponent } from './dga-skeleton.component';

const meta: Meta<DgaSkeletonComponent> = {
  title: 'Components/Skeleton',
  component: DgaSkeletonComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaSkeletonComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'circle', 'rectangle', 'square'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DgaSkeletonComponent>;

export const Line: Story = {
  args: {
    type: 'line',
    width: '100%',
    height: '16px',
  },
};

export const Circle: Story = {
  args: {
    type: 'circle',
    width: '64px',
    height: '64px',
  },
};

export const Rectangle: Story = {
  args: {
    type: 'rectangle',
    width: '200px',
    height: '120px',
  },
};

export const Square: Story = {
  args: {
    type: 'square',
    width: '80px',
    height: '80px',
  },
};

export const CardPlaceholder: Story = {
  render: (args) => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <dga-skeleton type="rectangle" width="100%" height="160px"></dga-skeleton>
        <div style="display: flex; align-items: center; gap: 12px;">
          <dga-skeleton type="circle" width="40px" height="40px"></dga-skeleton>
          <div style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
            <dga-skeleton type="line" width="60%" height="14px"></dga-skeleton>
            <dga-skeleton type="line" width="40%" height="12px"></dga-skeleton>
          </div>
        </div>
        <dga-skeleton type="line" width="100%" height="12px"></dga-skeleton>
        <dga-skeleton type="line" width="100%" height="12px"></dga-skeleton>
        <dga-skeleton type="line" width="75%" height="12px"></dga-skeleton>
      </div>
    `,
  }),
};
