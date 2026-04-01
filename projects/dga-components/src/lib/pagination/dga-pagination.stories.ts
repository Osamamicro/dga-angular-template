import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DgaPaginationComponent } from './dga-pagination.component';

const meta: Meta<DgaPaginationComponent> = {
  title: 'Components/Pagination',
  component: DgaPaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaPaginationComponent],
    }),
  ],
  argTypes: {
    totalItems: { control: 'number' },
    pageSize: { control: 'number' },
    currentPage: { control: 'number' },
    maxVisiblePages: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<DgaPaginationComponent>;

export const Default: Story = {
  args: {
    totalItems: 50,
    pageSize: 10,
    currentPage: 1,
    maxVisiblePages: 5,
  },
};

export const ManyPages: Story = {
  args: {
    totalItems: 500,
    pageSize: 10,
    currentPage: 15,
    maxVisiblePages: 7,
  },
};

export const SmallPageSize: Story = {
  args: {
    totalItems: 100,
    pageSize: 5,
    currentPage: 1,
    maxVisiblePages: 5,
  },
};
