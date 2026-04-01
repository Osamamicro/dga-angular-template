import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaAccordionComponent } from './dga-accordion.component';
import { DgaAccordionItemComponent } from './dga-accordion-item.component';

const meta: Meta<DgaAccordionComponent> = {
  title: 'Components/Accordion',
  component: DgaAccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DgaAccordionComponent, DgaAccordionItemComponent],
    }),
  ],
  argTypes: {
    multi: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded simultaneously',
    },
  },
};

export default meta;
type Story = StoryObj<DgaAccordionComponent>;

export const Default: Story = {
  args: {
    multi: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-accordion [multi]="multi">
        <dga-accordion-item title="Section 1" [expanded]="true">
          Content for the first section. This item is expanded by default.
        </dga-accordion-item>
        <dga-accordion-item title="Section 2">
          Content for the second section. Click the header to expand.
        </dga-accordion-item>
        <dga-accordion-item title="Section 3">
          Content for the third section. Only one item can be open at a time in single mode.
        </dga-accordion-item>
      </dga-accordion>
    `,
  }),
};

export const MultiExpand: Story = {
  args: {
    multi: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-accordion [multi]="multi">
        <dga-accordion-item title="Section 1" [expanded]="true">
          Content for the first section.
        </dga-accordion-item>
        <dga-accordion-item title="Section 2" [expanded]="true">
          Content for the second section. Multiple items can be open simultaneously.
        </dga-accordion-item>
        <dga-accordion-item title="Section 3">
          Content for the third section.
        </dga-accordion-item>
      </dga-accordion>
    `,
  }),
};

export const WithDisabledItem: Story = {
  args: {
    multi: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-accordion [multi]="multi">
        <dga-accordion-item title="Enabled Section">
          This section can be expanded and collapsed normally.
        </dga-accordion-item>
        <dga-accordion-item title="Disabled Section" [disabled]="true">
          This content is not accessible because the item is disabled.
        </dga-accordion-item>
        <dga-accordion-item title="Another Enabled Section">
          This section is also fully interactive.
        </dga-accordion-item>
      </dga-accordion>
    `,
  }),
};
