import type { Meta, StoryObj } from '@storybook/angular';
import { DgaTagComponent } from './dga-tag.component';

const meta: Meta<DgaTagComponent> = {
  title: 'Components/Tag',
  component: DgaTagComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Color palette of the tag',
    },
    style: {
      control: 'select',
      options: ['subtle', 'outline', 'filled'],
      description: 'Visual style of the tag',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the tag',
    },
    removable: {
      control: 'boolean',
      description: 'Whether the tag shows a dismiss button',
    },
  },
};

export default meta;
type Story = StoryObj<DgaTagComponent>;

export const Default: Story = {
  args: {
    color: 'primary',
    style: 'subtle',
    size: 'md',
    removable: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-tag [color]="color" [style]="style" [size]="size" [removable]="removable">Default Tag</dga-tag>`,
  }),
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <dga-tag color="primary">Primary</dga-tag>
        <dga-tag color="secondary">Secondary</dga-tag>
        <dga-tag color="success">Success</dga-tag>
        <dga-tag color="warning">Warning</dga-tag>
        <dga-tag color="danger">Danger</dga-tag>
        <dga-tag color="info">Info</dga-tag>
      </div>
    `,
  }),
};

export const Styles: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <dga-tag color="primary" style="subtle">Subtle</dga-tag>
        <dga-tag color="primary" style="outline">Outline</dga-tag>
        <dga-tag color="primary" style="filled">Filled</dga-tag>
      </div>
    `,
  }),
};

export const Removable: Story = {
  args: {
    color: 'primary',
    style: 'subtle',
    size: 'md',
    removable: true,
  },
  render: (args) => ({
    props: args,
    template: `<dga-tag [color]="color" [style]="style" [size]="size" [removable]="removable" (removed)="onRemoved()">Removable Tag</dga-tag>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <dga-tag color="primary" size="sm">Small</dga-tag>
        <dga-tag color="primary" size="md">Medium</dga-tag>
      </div>
    `,
  }),
};
