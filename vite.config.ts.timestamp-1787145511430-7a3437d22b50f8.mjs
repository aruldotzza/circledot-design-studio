// vite.config.ts
import { defineConfig } from "file:///D:/Rajesh/Draft/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Rajesh/Draft/node_modules/@vitejs/plugin-react/dist/index.js";
import { ViteImageOptimizer } from "file:///D:/Rajesh/Draft/node_modules/vite-plugin-image-optimizer/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80
      },
      jpeg: {
        quality: 80
      },
      jpg: {
        quality: 80
      }
    })
  ],
  build: {
    // Split chunks for better caching and parallel loading
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "animation-vendor": ["gsap", "framer-motion"],
          "ui-vendor": ["lucide-react", "clsx", "tailwind-merge"]
        }
      }
    },
    // Optimize chunk size limit
    chunkSizeWarningLimit: 1e3,
    // Minify CSS and JS aggressively
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "gsap",
      "three",
      "@react-three/fiber",
      "@react-three/drei"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxSYWplc2hcXFxcRHJhZnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFJhamVzaFxcXFxEcmFmdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUmFqZXNoL0RyYWZ0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFZpdGVJbWFnZU9wdGltaXplcih7XG4gICAgICBwbmc6IHtcbiAgICAgICAgcXVhbGl0eTogODAsXG4gICAgICB9LFxuICAgICAganBlZzoge1xuICAgICAgICBxdWFsaXR5OiA4MCxcbiAgICAgIH0sXG4gICAgICBqcGc6IHtcbiAgICAgICAgcXVhbGl0eTogODAsXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIC8vIFNwbGl0IGNodW5rcyBmb3IgYmV0dGVyIGNhY2hpbmcgYW5kIHBhcmFsbGVsIGxvYWRpbmdcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgJ3RocmVlLXZlbmRvcic6IFsndGhyZWUnLCAnQHJlYWN0LXRocmVlL2ZpYmVyJywgJ0ByZWFjdC10aHJlZS9kcmVpJ10sXG4gICAgICAgICAgJ2FuaW1hdGlvbi12ZW5kb3InOiBbJ2dzYXAnLCAnZnJhbWVyLW1vdGlvbiddLFxuICAgICAgICAgICd1aS12ZW5kb3InOiBbJ2x1Y2lkZS1yZWFjdCcsICdjbHN4JywgJ3RhaWx3aW5kLW1lcmdlJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gT3B0aW1pemUgY2h1bmsgc2l6ZSBsaW1pdFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICAvLyBNaW5pZnkgQ1NTIGFuZCBKUyBhZ2dyZXNzaXZlbHlcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgLy8gT3B0aW1pemUgZGVwZW5kZW5jaWVzIHByZS1idW5kbGluZ1xuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAnZnJhbWVyLW1vdGlvbicsXG4gICAgICAnZ3NhcCcsXG4gICAgICAndGhyZWUnLFxuICAgICAgJ0ByZWFjdC10aHJlZS9maWJlcicsXG4gICAgICAnQHJlYWN0LXRocmVlL2RyZWknLFxuICAgIF0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcU8sU0FBUyxvQkFBb0I7QUFDbFEsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMEJBQTBCO0FBR25DLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLG1CQUFtQjtBQUFBLE1BQ2pCLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLGdCQUFnQixDQUFDLFNBQVMsc0JBQXNCLG1CQUFtQjtBQUFBLFVBQ25FLG9CQUFvQixDQUFDLFFBQVEsZUFBZTtBQUFBLFVBQzVDLGFBQWEsQ0FBQyxnQkFBZ0IsUUFBUSxnQkFBZ0I7QUFBQSxRQUN4RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLHVCQUF1QjtBQUFBO0FBQUEsSUFFdkIsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
