import type { Meta, StoryObj } from '@storybook/angular';
import { DgaTableComponent, DgaTableColumn } from './dga-table.component';

const sampleColumns: DgaTableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
];

const sampleData: Record<string, unknown>[] = [
  { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin' },
  { id: 2, name: 'Sara Mohammed', email: 'sara@example.com', role: 'Editor' },
  { id: 3, name: 'Omar Hassan', email: 'omar@example.com', role: 'Viewer' },
  { id: 4, name: 'Fatima Khalid', email: 'fatima@example.com', role: 'Editor' },
  { id: 5, name: 'Khalid Nasser', email: 'khalid@example.com', role: 'Admin' },
];

const meta: Meta<DgaTableComponent> = {
  title: 'Components/Table',
  component: DgaTableComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'compact', 'bordered'],
      description: 'Table visual variant',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows are selectable',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Whether the header is sticky',
    },
  },
};

export default meta;
type Story = StoryObj<DgaTableComponent>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    selectable: false,
    stickyHeader: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-table [columns]="columns" [data]="data" [variant]="variant" [selectable]="selectable" [stickyHeader]="stickyHeader"></dga-table>`,
  }),
};

export const Striped: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'striped',
    selectable: false,
    stickyHeader: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-table [columns]="columns" [data]="data" [variant]="variant"></dga-table>`,
  }),
};

export const Compact: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'compact',
    selectable: false,
    stickyHeader: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-table [columns]="columns" [data]="data" [variant]="variant"></dga-table>`,
  }),
};

export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'bordered',
    selectable: false,
    stickyHeader: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-table [columns]="columns" [data]="data" [variant]="variant"></dga-table>`,
  }),
};

export const Selectable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    selectable: true,
    stickyHeader: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-table [columns]="columns" [data]="data" [variant]="variant" [selectable]="selectable" (selectionChange)="onSelectionChange($event)"></dga-table>`,
  }),
};

export const Sortable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    selectable: false,
    stickyHeader: false,
  },
  render: (args) => ({
    props: args,
    template: `<dga-table [columns]="columns" [data]="data" [variant]="variant" (sortChange)="onSortChange($event)"></dga-table>`,
  }),
};
