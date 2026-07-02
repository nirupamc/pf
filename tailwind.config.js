/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', '"Courier New"', 'monospace'],
        ui: ['"Segoe WPC"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Aliases onto the VS Code CSS custom properties defined in vscode.css
        'vsc-editor': 'var(--vscode-editor-background)',
        'vsc-sidebar': 'var(--vscode-sideBar-background)',
        'vsc-activitybar': 'var(--vscode-activityBar-background)',
        'vsc-titlebar': 'var(--vscode-titleBar-activeBackground)',
        'vsc-statusbar': 'var(--vscode-statusBar-background)',
        'vsc-tab-active': 'var(--vscode-tab-activeBackground)',
        'vsc-tab-inactive': 'var(--vscode-tab-inactiveBackground)',
        'vsc-fg': 'var(--vscode-foreground)',
        'vsc-fg-dim': 'var(--vscode-descriptionForeground)',
        'vsc-border': 'var(--vscode-panel-border)',
        'vsc-input': 'var(--vscode-input-background)',
        'vsc-accent': 'var(--vscode-focusBorder)',
      },
    },
  },
  plugins: [],
}
