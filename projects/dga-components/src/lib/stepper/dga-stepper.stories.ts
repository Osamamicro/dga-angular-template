import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DgaStepperComponent } from './dga-stepper.component';
import { DgaStepComponent } from './dga-step.component';

const meta: Meta<DgaStepperComponent> = {
  title: 'Components/Stepper',
  component: DgaStepperComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaStepperComponent, DgaStepComponent],
    }),
  ],
  argTypes: {
    activeStep: { control: 'number' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    clickable: { control: 'boolean' },
  },
  render: (args) => ({
    props: {
      ...args,
      onStepChange: (index: number) => console.log('Step changed to:', index),
    },
    template: `
      <dga-stepper
        [activeStep]="activeStep"
        [orientation]="orientation"
        [clickable]="clickable"
        (stepChange)="onStepChange($event)"
      >
        <dga-step label="Personal Info" description="Enter your details" icon="user"></dga-step>
        <dga-step label="Address" description="Provide your address" icon="home"></dga-step>
        <dga-step label="Payment" description="Payment method" icon="credit-card"></dga-step>
        <dga-step label="Review" description="Confirm your order" icon="check"></dga-step>
      </dga-stepper>
    `,
  }),
};

export default meta;
type Story = StoryObj<DgaStepperComponent>;

export const Default: Story = {
  args: {
    activeStep: 0,
    orientation: 'horizontal',
    clickable: false,
  },
};

export const Vertical: Story = {
  args: {
    activeStep: 1,
    orientation: 'vertical',
    clickable: false,
  },
};

export const Clickable: Story = {
  args: {
    activeStep: 0,
    orientation: 'horizontal',
    clickable: true,
  },
};

export const WithActiveStep: Story = {
  args: {
    activeStep: 2,
    orientation: 'horizontal',
    clickable: false,
  },
};
