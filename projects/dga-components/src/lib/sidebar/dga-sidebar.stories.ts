import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaSidebarComponent } from './dga-sidebar.component';

interface DgaSidebarItem {
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  children?: DgaSidebarItem[];
}

const sampleItems: DgaSidebarItem[] = [
  { label: 'Dashboard', icon: 'home', href: '/dashboard', active: true },
  { label: 'Violations', icon: 'alert-triangle', href: '/violations' },
  { label: 'Committees', icon: 'users', href: '/committees' },
  { label: 'Reports', icon: 'bar-chart', href: '/reports' },
  { label: 'Settings', icon: 'settings', href: '/settings' },
];

const nestedItems: DgaSidebarItem[] = [
  { label: 'Dashboard', icon: 'home', href: '/dashboard', active: true },
  {
    label: 'Violations',
    icon: 'alert-triangle',
    children: [
      { label: 'All Violations', href: '/violations' },
      { label: 'Individual', href: '/violations/individual' },
      { label: 'Company', href: '/violations/company' },
      { label: 'Air Carrier', href: '/violations/air-carrier' },
    ],
  },
  {
    label: 'Committees',
    icon: 'users',
    children: [
      { label: 'Active Committees', href: '/committees/active' },
      { label: 'Meetings', href: '/committees/meetings' },
      { label: 'Members', href: '/committees/members' },
    ],
  },
  { label: 'Reports', icon: 'bar-chart', href: '/reports' },
  {
    label: 'Administration',
    icon: 'shield',
    children: [
      { label: 'Users', href: '/admin/users' },
      { label: 'Roles', href: '/admin/roles' },
      { label: 'Permissions', href: '/admin/permissions' },
    ],
  },
  { label: 'Settings', icon: 'settings', href: '/settings' },
];

const meta: Meta<DgaSidebarComponent> = {
  title: 'Layout/Sidebar',
  component: DgaSidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaSidebarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    collapsed: { control: 'boolean' },
    collapsedChange: { action: 'collapsedChange' },
  },
};

export default meta;
type Story = StoryObj<DgaSidebarComponent>;

export const Default: Story = {
  args: {
    items: sampleItems,
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    items: sampleItems,
    collapsed: true,
  },
};

export const WithNestedItems: Story = {
  args: {
    items: nestedItems,
    collapsed: false,
  },
};
