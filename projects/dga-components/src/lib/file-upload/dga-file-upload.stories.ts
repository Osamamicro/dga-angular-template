import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DgaFileUploadComponent } from './dga-file-upload.component';

const meta: Meta<DgaFileUploadComponent> = {
  title: 'Components/File Upload',
  component: DgaFileUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [DgaFileUploadComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    filesSelected: { action: 'filesSelected' },
    fileRemoved: { action: 'fileRemoved' },
  },
};

export default meta;
type Story = StoryObj<DgaFileUploadComponent>;

export const Default: Story = {
  args: {
    label: 'Upload file',
    multiple: false,
    disabled: false,
    maxSize: 10485760,
  },
};

export const ImagesOnly: Story = {
  args: {
    label: 'Upload image',
    accept: 'image/png,image/jpeg,image/webp',
    multiple: false,
    disabled: false,
    helperText: 'Accepted formats: PNG, JPEG, WebP',
    maxSize: 5242880,
  },
};

export const Multiple: Story = {
  args: {
    label: 'Upload documents',
    multiple: true,
    disabled: false,
    helperText: 'You can upload multiple files at once',
    maxSize: 10485760,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Upload file',
    disabled: true,
    multiple: false,
    maxSize: 10485760,
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Attachment',
    helperText: 'Maximum file size is 10 MB. Accepted formats: PDF, DOCX, PNG, JPEG.',
    accept: '.pdf,.docx,.png,.jpeg',
    multiple: false,
    disabled: false,
    maxSize: 10485760,
  },
};
