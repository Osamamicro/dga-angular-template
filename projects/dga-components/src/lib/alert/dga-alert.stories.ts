import type { Meta, StoryObj } from '@storybook/angular';
import { DgaAlertComponent } from './dga-alert.component';

const meta: Meta<DgaAlertComponent> = {
  title: 'Components/Alert',
  component: DgaAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'neutral'],
      description: 'Severity level of the alert',
    },
    type: {
      control: 'select',
      options: ['inline', 'toast', 'banner'],
      description: 'Display type of the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    autoDismiss: {
      control: 'number',
      description: 'Auto-dismiss timeout in milliseconds (minimum 5000ms)',
    },
  },
};

export default meta;
type Story = StoryObj<DgaAlertComponent>;

export const Default: Story = {
  args: {
    severity: 'info',
    type: 'inline',
    dismissible: false,
    autoDismiss: undefined,
  },
  render: (args) => ({
    props: args,
    template: `<dga-alert [severity]="severity" [type]="type" [dismissible]="dismissible" [autoDismiss]="autoDismiss">This is an informational alert message.</dga-alert>`,
  }),
};

export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <dga-alert severity="info">This is an info alert.</dga-alert>
        <dga-alert severity="success">This is a success alert.</dga-alert>
        <dga-alert severity="warning">This is a warning alert.</dga-alert>
        <dga-alert severity="error">This is an error alert.</dga-alert>
        <dga-alert severity="neutral">This is a neutral alert.</dga-alert>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  args: {
    severity: 'warning',
    type: 'inline',
    dismissible: true,
    autoDismiss: undefined,
  },
  render: (args) => ({
    props: args,
    template: `<dga-alert [severity]="severity" [type]="type" [dismissible]="dismissible" (dismissed)="onDismissed()">This alert can be dismissed by clicking the close button.</dga-alert>`,
  }),
};

export const Toast: Story = {
  args: {
    severity: 'success',
    type: 'toast',
    dismissible: true,
    autoDismiss: undefined,
  },
  render: (args) => ({
    props: args,
    template: `<dga-alert [severity]="severity" [type]="type" [dismissible]="dismissible">Operation completed successfully!</dga-alert>`,
  }),
};

export const Banner: Story = {
  args: {
    severity: 'warning',
    type: 'banner',
    dismissible: true,
    autoDismiss: undefined,
  },
  render: (args) => ({
    props: args,
    template: `<dga-alert [severity]="severity" [type]="type" [dismissible]="dismissible">System maintenance is scheduled for tonight at 11:00 PM.</dga-alert>`,
  }),
};
