import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaHeaderComponent } from './dga-header.component';

interface DgaNavItem {
  label: string;
  href: string;
  active?: boolean;
  children?: DgaNavItem[];
}

const sampleNavItems: DgaNavItem[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

const navItemsWithSubMenu: DgaNavItem[] = [
  { label: 'Home', href: '/', active: true },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Aviation Safety', href: '/services/safety' },
      { label: 'Air Transport', href: '/services/transport' },
      { label: 'Airport Operations', href: '/services/operations' },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Vision', href: '/about/vision' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

const meta: Meta<DgaHeaderComponent> = {
  title: 'Layout/Header',
  component: DgaHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaHeaderComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    logoSrc: { control: 'text' },
    logoAlt: { control: 'text' },
    siteTitle: { control: 'text' },
    navItems: { control: 'object' },
    showSearch: { control: 'boolean' },
    showLanguageSwitcher: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<DgaHeaderComponent>;

export const Default: Story = {
  args: {
    logoSrc: 'https://www.gaca.gov.sa/themes/gaca/logo.svg',
    logoAlt: 'GACA Logo',
    siteTitle: 'General Authority of Civil Aviation',
    navItems: sampleNavItems,
    showSearch: false,
    showLanguageSwitcher: false,
  },
};

export const WithSearch: Story = {
  args: {
    logoSrc: 'https://www.gaca.gov.sa/themes/gaca/logo.svg',
    logoAlt: 'GACA Logo',
    siteTitle: 'General Authority of Civil Aviation',
    navItems: sampleNavItems,
    showSearch: true,
    showLanguageSwitcher: false,
  },
};

export const WithLanguageSwitcher: Story = {
  args: {
    logoSrc: 'https://www.gaca.gov.sa/themes/gaca/logo.svg',
    logoAlt: 'GACA Logo',
    siteTitle: 'General Authority of Civil Aviation',
    navItems: sampleNavItems,
    showSearch: false,
    showLanguageSwitcher: true,
  },
};

export const WithSubMenu: Story = {
  args: {
    logoSrc: 'https://www.gaca.gov.sa/themes/gaca/logo.svg',
    logoAlt: 'GACA Logo',
    siteTitle: 'General Authority of Civil Aviation',
    navItems: navItemsWithSubMenu,
    showSearch: true,
    showLanguageSwitcher: true,
  },
};
