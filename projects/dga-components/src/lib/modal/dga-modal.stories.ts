import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DgaModalComponent } from './dga-modal.component';

const meta: Meta<DgaModalComponent> = {
  title: 'Components/Modal',
  component: DgaModalComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaModalComponent],
    }),
  ],
  argTypes: {
    open: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'fullscreen'],
    },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    modalTitle: { control: 'text' },
  },
  render: (args) => ({
    props: {
      ...args,
      onClosed: () => console.log('Modal closed'),
    },
    template: `
      <dga-modal
        [open]="open"
        [size]="size"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
        [modalTitle]="modalTitle"
        (closed)="onClosed()"
      >
        <span modal-title>{{ modalTitle }}</span>
        <p>This is the modal body content. You can place any content here.</p>
        <div modal-footer>
          <button type="button">Cancel</button>
          <button type="button">Confirm</button>
        </div>
      </dga-modal>
    `,
  }),
};

export default meta;
type Story = StoryObj<DgaModalComponent>;

export const Default: Story = {
  args: {
    open: true,
    size: 'md',
    closeOnBackdrop: true,
    closeOnEscape: true,
    modalTitle: 'Default Modal',
  },
};

export const Small: Story = {
  args: {
    open: true,
    size: 'sm',
    closeOnBackdrop: true,
    closeOnEscape: true,
    modalTitle: 'Small Modal',
  },
};

export const Large: Story = {
  args: {
    open: true,
    size: 'lg',
    closeOnBackdrop: true,
    closeOnEscape: true,
    modalTitle: 'Large Modal',
  },
};

export const WithTitle: Story = {
  args: {
    open: true,
    size: 'md',
    closeOnBackdrop: true,
    closeOnEscape: true,
    modalTitle: 'Custom Modal Title',
  },
};
