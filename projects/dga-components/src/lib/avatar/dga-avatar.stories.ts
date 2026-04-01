import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaAvatarComponent } from './dga-avatar.component';

const meta: Meta<DgaAvatarComponent> = {
  title: 'Components/Avatar',
  component: DgaAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaAvatarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['initials', 'image', 'icon'],
    },
    size: {
      control: 'select',
      options: [24, 32, 40, 48, 56, 64, 80, 96, 120],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DgaAvatarComponent>;

export const Initials: Story = {
  args: {
    type: 'initials',
    size: 48,
    shape: 'circle',
    initials: 'OA',
    ariaLabel: 'Osama Ahmed avatar',
  },
};

export const Image: Story = {
  args: {
    type: 'image',
    size: 64,
    shape: 'circle',
    src: 'https://i.pravatar.cc/120',
    alt: 'User profile photo',
    ariaLabel: 'User avatar',
  },
};

export const Icon: Story = {
  args: {
    type: 'icon',
    size: 48,
    shape: 'circle',
    ariaLabel: 'Default icon avatar',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
        <dga-avatar type="initials" [size]="24" initials="XS" ariaLabel="Extra small avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="32" initials="SM" ariaLabel="Small avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="40" initials="MD" ariaLabel="Medium avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="48" initials="LG" ariaLabel="Large avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="56" initials="XL" ariaLabel="Extra large avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="64" initials="2X" ariaLabel="2X large avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="80" initials="3X" ariaLabel="3X large avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="96" initials="4X" ariaLabel="4X large avatar"></dga-avatar>
        <dga-avatar type="initials" [size]="120" initials="5X" ariaLabel="5X large avatar"></dga-avatar>
      </div>
    `,
  }),
};

export const Square: Story = {
  args: {
    type: 'initials',
    size: 64,
    shape: 'square',
    initials: 'RQ',
    ariaLabel: 'Square shaped avatar',
  },
};
