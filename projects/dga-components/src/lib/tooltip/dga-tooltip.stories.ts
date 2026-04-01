import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DgaTooltipDirective } from './dga-tooltip.directive';

const meta: Meta<DgaTooltipDirective> = {
  title: 'Components/Tooltip',
  component: DgaTooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [DgaTooltipDirective],
    }),
  ],
  argTypes: {
    dgaTooltip: { control: 'text' },
    dgaTooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end'],
    },
  },
};

export default meta;
type Story = StoryObj<DgaTooltipDirective>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center; padding: 80px;">
        <button dgaTooltip="This is a tooltip" dgaTooltipPosition="top">
          Hover me
        </button>
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; padding: 100px 60px;">
        <button dgaTooltip="Top tooltip" dgaTooltipPosition="top">
          Top
        </button>
        <button dgaTooltip="Bottom tooltip" dgaTooltipPosition="bottom">
          Bottom
        </button>
        <button dgaTooltip="Left tooltip" dgaTooltipPosition="left">
          Left
        </button>
        <button dgaTooltip="Right tooltip" dgaTooltipPosition="right">
          Right
        </button>
        <button dgaTooltip="Top-start tooltip" dgaTooltipPosition="top-start">
          Top Start
        </button>
        <button dgaTooltip="Top-end tooltip" dgaTooltipPosition="top-end">
          Top End
        </button>
      </div>
    `,
  }),
};
