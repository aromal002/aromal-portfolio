import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          metaAds: path.resolve(__dirname, 'case-meta-ads.html'),
          socialMedia: path.resolve(__dirname, 'case-social-media.html'),
          graphicDesign: path.resolve(__dirname, 'case-graphic-design.html'),
          aiVideos: path.resolve(__dirname, 'case-ai-videos.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
