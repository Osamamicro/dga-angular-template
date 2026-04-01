import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaButtonComponent } from './dga-button.component';

const meta: Meta<DgaButtonComponent> = {
  title: 'Components/Button',
  component: DgaButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaButtonComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'icon-only', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    fullWidth: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    loading: false,
    type: 'button',
    fullWidth: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [type]="type" [fullWidth]="fullWidth" [ariaLabel]="ariaLabel">Click me</dga-button>`,
  }),
};

export default meta;
type Story = StoryObj<DgaButtonComponent>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <dga-button variant="primary">Primary</dga-button>
        <dga-button variant="secondary">Secondary</dga-button>
        <dga-button variant="outline">Outline</dga-button>
        <dga-button variant="ghost">Ghost</dga-button>
        <dga-button variant="danger">Danger</dga-button>
        <dga-button variant="tertiary">Tertiary</dga-button>
        <dga-button variant="icon-only" ariaLabel="Icon button">★</dga-button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <dga-button size="sm">Small</dga-button>
        <dga-button size="md">Medium</dga-button>
        <dga-button size="lg">Large</dga-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'icon-only',
    ariaLabel: 'Icon action',
  },
  render: (args) => ({
    props: args,
    template: `<dga-button [variant]="variant" [size]="size" [ariaLabel]="ariaLabel">★</dga-button>`,
  }),
};
