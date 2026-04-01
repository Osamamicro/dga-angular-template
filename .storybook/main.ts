import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../projects/dga-components/src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular',
    options: {
      projectName: 'dga-components',
    },
  },
  docs: {},
};

export default config;
