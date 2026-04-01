import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaDatepickerComponent } from './dga-datepicker.component';

const meta: Meta<DgaDatepickerComponent> = {
  title: 'Components/Datepicker',
  component: DgaDatepickerComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaDatepickerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    dateChange: { action: 'dateChange' },
  },
};

export default meta;
type Story = StoryObj<DgaDatepickerComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
    disabled: false,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Date of birth',
    placeholder: 'DD/MM/YYYY',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Departure date',
    placeholder: 'Select a date',
    disabled: true,
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Booking date',
    placeholder: 'Select a date within range',
    disabled: false,
    minDate: new Date(2026, 0, 1),
    maxDate: new Date(2026, 11, 31),
  },
};
