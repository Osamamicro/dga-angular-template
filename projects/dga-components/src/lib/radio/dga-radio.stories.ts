import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaRadioGroupComponent } from './dga-radio-group.component';
import { DgaRadioComponent } from './dga-radio.component';

const meta: Meta<DgaRadioGroupComponent> = {
  title: 'Components/Radio',
  component: DgaRadioGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaRadioGroupComponent, DgaRadioComponent],
    }),
  ],
  argTypes: {
    name: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    name: 'demo',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-radio-group [name]="name" [disabled]="disabled">
        <dga-radio value="1" label="Option 1" />
        <dga-radio value="2" label="Option 2" />
        <dga-radio value="3" label="Option 3" />
      </dga-radio-group>
    `,
  }),
};

export default meta;
type Story = StoryObj<DgaRadioGroupComponent>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  render: (args) => ({
    props: args,
    template: `
      <dga-radio-group name="disabled-option">
        <dga-radio value="1" label="Option 1" />
        <dga-radio value="2" label="Option 2 (disabled)" [disabled]="true" />
        <dga-radio value="3" label="Option 3" />
      </dga-radio-group>
    `,
  }),
};
