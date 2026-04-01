import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DgaBreadcrumbComponent } from './dga-breadcrumb.component';
import { DgaBreadcrumbItemComponent } from './dga-breadcrumb-item.component';

const meta: Meta<DgaBreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: DgaBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaBreadcrumbComponent, DgaBreadcrumbItemComponent],
    }),
  ],
  argTypes: {
    ariaLabel: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-breadcrumb [ariaLabel]="ariaLabel">
        <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
        <dga-breadcrumb-item href="/products">Products</dga-breadcrumb-item>
        <dga-breadcrumb-item [active]="true">Current Page</dga-breadcrumb-item>
      </dga-breadcrumb>
    `,
  }),
};

export default meta;
type Story = StoryObj<DgaBreadcrumbComponent>;

export const Default: Story = {
  args: {
    ariaLabel: 'Breadcrumb',
  },
};

export const ManyItems: Story = {
  args: {
    ariaLabel: 'Breadcrumb',
  },
  render: (args) => ({
    props: args,
    template: `
      <dga-breadcrumb [ariaLabel]="ariaLabel">
        <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
        <dga-breadcrumb-item href="/category">Category</dga-breadcrumb-item>
        <dga-breadcrumb-item href="/category/subcategory">Subcategory</dga-breadcrumb-item>
        <dga-breadcrumb-item href="/category/subcategory/section">Section</dga-breadcrumb-item>
        <dga-breadcrumb-item href="/category/subcategory/section/detail">Detail</dga-breadcrumb-item>
        <dga-breadcrumb-item [active]="true">Current Page</dga-breadcrumb-item>
      </dga-breadcrumb>
    `,
  }),
};
