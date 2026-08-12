import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-react"],
  manifest: ({ mode }) => ({
    name: mode === "development" ? "Glimpse Dev" : "Glimpse",
    description:
      "Privacy-first, local-AI Chrome extension for flow-state learning.",
    permissions: ["storage"],
    icons: {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "128": "icon/128.png"
    },
    action: {
      default_icon: {
        "16": "icon/16.png",
        "32": "icon/32.png",
        "48": "icon/48.png",
        "128": "icon/128.png"
      }
    },
    commands: {
      "toggle-scrapbook": {
        suggested_key: {
          default: "Alt+Shift+G",
          mac: "Alt+Shift+G",
        },
        description: "Open or close the Glimpse Scrapbook",
      },
    }
  }),
  vite: () => ({
    build: {
      minify: 'terser',
      terserOptions: {
        format: {
          ascii_only: true,
        },
      },
    },
  }),
});
