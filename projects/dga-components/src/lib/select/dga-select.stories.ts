import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaSelectComponent } from './dga-select.component';

interface DgaSelectOption {
  value: any;
  label: string;
  group?: string;
}

const sampleOptions: DgaSelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

const groupedOptions: DgaSelectOption[] = [
  { value: 'riyadh', label: 'Riyadh', group: 'Central' },
  { value: 'qassim', label: 'Qassim', group: 'Central' },
  { value: 'jeddah', label: 'Jeddah', group: 'Western' },
  { value: 'madinah', label: 'Madinah', group: 'Western' },
  { value: 'dammam', label: 'Dammam', group: 'Eastern' },
  { value: 'khobar', label: 'Khobar', group: 'Eastern' },
];

const meta: Meta<DgaSelectComponent> = {
  title: 'Components/Select',
  component: DgaSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaSelectComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
  args: {
    size: 'lg',
    placeholder: 'اختر...',
    options: sampleOptions,
    disabled: false,
    required: false,
    searchable: false,
  },
};

export default meta;
type Story = StoryObj<DgaSelectComponent>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'City',
    placeholder: 'Select a city',
    options: sampleOptions,
  },
};

export const Searchable: Story = {
  args: {
    label: 'Searchable Select',
    placeholder: 'Type to search...',
    searchable: true,
    options: sampleOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'Select an option',
    errorMessage: 'Please select a value.',
    options: sampleOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    options: sampleOptions,
  },
};

export const WithGroups: Story = {
  args: {
    label: 'City by Region',
    placeholder: 'Select a city',
    options: groupedOptions,
  },
};
