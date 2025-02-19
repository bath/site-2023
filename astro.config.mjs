import { defineConfig } from 'astro/config';
import viewTransitions from '@astrojs/view-transitions';

export default defineConfig({
  integrations: [viewTransitions()],
  output: 'hybrid'
});