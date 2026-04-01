import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaFooterComponent } from './dga-footer.component';

interface DgaFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const sampleColumns: DgaFooterColumn[] = [
  {
    title: 'About GACA',
    links: [
      { label: 'Our Vision', href: '/about/vision' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Organizational Structure', href: '/about/structure' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Aviation Safety', href: '/services/safety' },
      { label: 'Air Transport', href: '/services/transport' },
      { label: 'Airport Operations', href: '/services/operations' },
      { label: 'Licensing', href: '/services/licensing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Regulations', href: '/resources/regulations' },
      { label: 'Publications', href: '/resources/publications' },
      { label: 'Statistics', href: '/resources/statistics' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Complaints', href: '/complaints' },
      { label: 'Media Center', href: '/media' },
      { label: 'Social Media', href: '/social' },
    ],
  },
];

const meta: Meta<DgaFooterComponent> = {
  title: 'Layout/Footer',
  component: DgaFooterComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaFooterComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object' },
    copyright: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DgaFooterComponent>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
  },
};

export const WithCopyright: Story = {
  args: {
    columns: sampleColumns,
    copyright: '\u00A9 2026 General Authority of Civil Aviation. All rights reserved.',
  },
};
