import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaTabsComponent } from './dga-tabs.component';
import { DgaTabComponent } from './dga-tab.component';

const meta: Meta<DgaTabsComponent> = {
  title: 'Components/Tabs',
  component: DgaTabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DgaTabsComponent, DgaTabComponent],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab layout orientation',
    },
  },
};

export default meta;
type Story = StoryObj<DgaTabsComponent>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-tabs [orientation]="orientation">
        <dga-tab label="Overview">
          <p>Overview tab content. This is the first tab panel.</p>
        </dga-tab>
        <dga-tab label="Details">
          <p>Details tab content. This is the second tab panel.</p>
        </dga-tab>
        <dga-tab label="Settings">
          <p>Settings tab content. This is the third tab panel.</p>
        </dga-tab>
      </dga-tabs>
    `,
  }),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-tabs [orientation]="orientation">
        <dga-tab label="Profile">
          <p>Profile settings and personal information.</p>
        </dga-tab>
        <dga-tab label="Security">
          <p>Security settings including password and two-factor authentication.</p>
        </dga-tab>
        <dga-tab label="Notifications">
          <p>Notification preferences and email settings.</p>
        </dga-tab>
      </dga-tabs>
    `,
  }),
};

export const WithDisabledTab: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-tabs [orientation]="orientation">
        <dga-tab label="Active Tab">
          <p>This tab is active and accessible.</p>
        </dga-tab>
        <dga-tab label="Disabled Tab" [disabled]="true">
          <p>This content is not accessible because the tab is disabled.</p>
        </dga-tab>
        <dga-tab label="Another Active Tab">
          <p>This tab is also fully accessible.</p>
        </dga-tab>
      </dga-tabs>
    `,
  }),
};
