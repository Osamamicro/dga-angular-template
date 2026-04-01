import type { Meta, StoryObj } from '@storybook/angular';
import { DgaCardComponent } from './dga-card.component';

const meta: Meta<DgaCardComponent> = {
  title: 'Components/Card',
  component: DgaCardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'shadow', 'outlined'],
      description: 'Visual variant of the card',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive (clickable)',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the card is in a selected state',
    },
    expandable: {
      control: 'boolean',
      description: 'Whether the card content is expandable',
    },
  },
};

export default meta;
type Story = StoryObj<DgaCardComponent>;

export const Default: Story = {
  args: {
    variant: 'flat',
    interactive: false,
    selected: false,
    expandable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-card [variant]="variant" [interactive]="interactive" [selected]="selected" [expandable]="expandable">
        <div header>Card Header</div>
        <div body>This is the card body content. It can contain any HTML or Angular components.</div>
        <div footer>Card Footer</div>
      </dga-card>
    `,
  }),
};

export const Shadow: Story = {
  args: {
    variant: 'shadow',
    interactive: false,
    selected: false,
    expandable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-card [variant]="variant">
        <div header>Shadow Card</div>
        <div body>This card uses the shadow variant for a raised appearance.</div>
        <div footer>Footer content</div>
      </dga-card>
    `,
  }),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    interactive: false,
    selected: false,
    expandable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-card [variant]="variant">
        <div header>Outlined Card</div>
        <div body>This card uses the outlined variant with a visible border.</div>
        <div footer>Footer content</div>
      </dga-card>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    variant: 'shadow',
    interactive: true,
    selected: false,
    expandable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-card [variant]="variant" [interactive]="interactive" (cardClick)="onCardClick()">
        <div header>Interactive Card</div>
        <div body>Click this card to trigger the cardClick event. It is focusable and supports keyboard activation.</div>
      </dga-card>
    `,
  }),
};

export const Selectable: Story = {
  args: {
    variant: 'outlined',
    interactive: true,
    selected: true,
    expandable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-card [variant]="variant" [interactive]="interactive" [selected]="selected">
        <div header>Selected Card</div>
        <div body>This card is in a selected state. Toggle the selected control to see the difference.</div>
      </dga-card>
    `,
  }),
};

export const Expandable: Story = {
  args: {
    variant: 'flat',
    interactive: false,
    selected: false,
    expandable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-card [variant]="variant" [expandable]="expandable">
        <div header>Expandable Card</div>
        <div body>This card supports expandable content. The expandable modifier class is applied for collapsible behavior.</div>
        <div actions>
          <button>Expand</button>
        </div>
      </dga-card>
    `,
  }),
};
