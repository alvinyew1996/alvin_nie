import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'gsap': ['gsap'],
          'howler': ['howler']
        }
      }
    }
  },
  assetsInclude: ['**/*.mp3', '**/*.mp4', '**/*.wav']
});