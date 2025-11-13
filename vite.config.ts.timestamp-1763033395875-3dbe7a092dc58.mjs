// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "supabase-vendor": ["@supabase/supabase-js"],
          "crypto-vendor": ["crypto-js", "buffer"],
          "ui-vendor": ["lucide-react"],
          // Feature chunks - Banking & API modules
          "banking-modules": [
            "./src/components/AdvancedBankingDashboard.tsx",
            "./src/components/CoreBankingAPIModule.tsx",
            "./src/components/BankBlackScreen.tsx"
          ],
          // Feature chunks - API modules
          "api-modules": [
            "./src/components/APIGlobalModule.tsx",
            "./src/components/APIDigitalModule.tsx",
            "./src/components/APIDAESModule.tsx",
            "./src/components/APIVUSDModule.tsx",
            "./src/components/APIVUSD1Module.tsx",
            "./src/components/APIDAESPledgeModule.tsx"
          ],
          // Feature chunks - Custody & Analytics
          "custody-modules": [
            "./src/components/CustodyAccountsModule.tsx",
            "./src/components/CustodyBlackScreen.tsx"
          ],
          // Feature chunks - Analysis tools
          "analysis-modules": [
            "./src/components/DTC1BProcessor.tsx",
            "./src/components/DTC1BAnalyzer.tsx",
            "./src/components/LargeFileDTC1BAnalyzer.tsx",
            "./src/components/AdvancedBinaryReader.tsx",
            "./src/components/EnhancedBinaryViewer.tsx"
          ],
          // Feature chunks - Audit & Reports
          "audit-modules": [
            "./src/components/AuditBankWindow.tsx",
            "./src/components/AuditLogViewer.tsx",
            "./src/components/AuditBankReport.tsx"
          ],
          // Stores
          "stores": [
            "./src/lib/store.ts",
            "./src/lib/balances-store.ts",
            "./src/lib/custody-store.ts",
            "./src/lib/processing-store.ts"
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.debug"]
      },
      format: {
        comments: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiA1MTczLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzXG4gICAgICAgICAgJ3JlYWN0LXZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgJ3N1cGFiYXNlLXZlbmRvcic6IFsnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ10sXG4gICAgICAgICAgJ2NyeXB0by12ZW5kb3InOiBbJ2NyeXB0by1qcycsICdidWZmZXInXSxcbiAgICAgICAgICAndWktdmVuZG9yJzogWydsdWNpZGUtcmVhY3QnXSxcblxuICAgICAgICAgIC8vIEZlYXR1cmUgY2h1bmtzIC0gQmFua2luZyAmIEFQSSBtb2R1bGVzXG4gICAgICAgICAgJ2JhbmtpbmctbW9kdWxlcyc6IFtcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL0FkdmFuY2VkQmFua2luZ0Rhc2hib2FyZC50c3gnLFxuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQ29yZUJhbmtpbmdBUElNb2R1bGUudHN4JyxcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL0JhbmtCbGFja1NjcmVlbi50c3gnLFxuICAgICAgICAgIF0sXG5cbiAgICAgICAgICAvLyBGZWF0dXJlIGNodW5rcyAtIEFQSSBtb2R1bGVzXG4gICAgICAgICAgJ2FwaS1tb2R1bGVzJzogW1xuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQVBJR2xvYmFsTW9kdWxlLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9BUElEaWdpdGFsTW9kdWxlLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9BUElEQUVTTW9kdWxlLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9BUElWVVNETW9kdWxlLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9BUElWVVNEMU1vZHVsZS50c3gnLFxuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQVBJREFFU1BsZWRnZU1vZHVsZS50c3gnLFxuICAgICAgICAgIF0sXG5cbiAgICAgICAgICAvLyBGZWF0dXJlIGNodW5rcyAtIEN1c3RvZHkgJiBBbmFseXRpY3NcbiAgICAgICAgICAnY3VzdG9keS1tb2R1bGVzJzogW1xuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQ3VzdG9keUFjY291bnRzTW9kdWxlLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9DdXN0b2R5QmxhY2tTY3JlZW4udHN4JyxcbiAgICAgICAgICBdLFxuXG4gICAgICAgICAgLy8gRmVhdHVyZSBjaHVua3MgLSBBbmFseXNpcyB0b29sc1xuICAgICAgICAgICdhbmFseXNpcy1tb2R1bGVzJzogW1xuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvRFRDMUJQcm9jZXNzb3IudHN4JyxcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL0RUQzFCQW5hbHl6ZXIudHN4JyxcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL0xhcmdlRmlsZURUQzFCQW5hbHl6ZXIudHN4JyxcbiAgICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzL0FkdmFuY2VkQmluYXJ5UmVhZGVyLnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9FbmhhbmNlZEJpbmFyeVZpZXdlci50c3gnLFxuICAgICAgICAgIF0sXG5cbiAgICAgICAgICAvLyBGZWF0dXJlIGNodW5rcyAtIEF1ZGl0ICYgUmVwb3J0c1xuICAgICAgICAgICdhdWRpdC1tb2R1bGVzJzogW1xuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQXVkaXRCYW5rV2luZG93LnRzeCcsXG4gICAgICAgICAgICAnLi9zcmMvY29tcG9uZW50cy9BdWRpdExvZ1ZpZXdlci50c3gnLFxuICAgICAgICAgICAgJy4vc3JjL2NvbXBvbmVudHMvQXVkaXRCYW5rUmVwb3J0LnRzeCcsXG4gICAgICAgICAgXSxcblxuICAgICAgICAgIC8vIFN0b3Jlc1xuICAgICAgICAgICdzdG9yZXMnOiBbXG4gICAgICAgICAgICAnLi9zcmMvbGliL3N0b3JlLnRzJyxcbiAgICAgICAgICAgICcuL3NyYy9saWIvYmFsYW5jZXMtc3RvcmUudHMnLFxuICAgICAgICAgICAgJy4vc3JjL2xpYi9jdXN0b2R5LXN0b3JlLnRzJyxcbiAgICAgICAgICAgICcuL3NyYy9saWIvcHJvY2Vzc2luZy1zdG9yZS50cycsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIHB1cmVfZnVuY3M6IFsnY29uc29sZS5sb2cnLCAnY29uc29sZS5kZWJ1ZyddLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdDoge1xuICAgICAgICBjb21tZW50czogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUNyQyxtQkFBbUIsQ0FBQyx1QkFBdUI7QUFBQSxVQUMzQyxpQkFBaUIsQ0FBQyxhQUFhLFFBQVE7QUFBQSxVQUN2QyxhQUFhLENBQUMsY0FBYztBQUFBO0FBQUEsVUFHNUIsbUJBQW1CO0FBQUEsWUFDakI7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFVBR0EsZUFBZTtBQUFBLFlBQ2I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFVBR0EsbUJBQW1CO0FBQUEsWUFDakI7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBO0FBQUEsVUFHQSxvQkFBb0I7QUFBQSxZQUNsQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUE7QUFBQSxVQUdBLGlCQUFpQjtBQUFBLFlBQ2Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFVBR0EsVUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2QixjQUFjO0FBQUEsSUFDZCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsUUFDZixZQUFZLENBQUMsZUFBZSxlQUFlO0FBQUEsTUFDN0M7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
