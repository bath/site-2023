import { defineConfig } from 'astro/config';
import transitions from '@astrojs/transitions';

export default defineConfig({
  integrations: [transitions()],
  output: 'hybrid'
});