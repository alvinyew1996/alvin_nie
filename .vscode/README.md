# VS Code Workspace Configuration

This project includes comprehensive VS Code configuration to enhance your development experience.

## 📦 Quick Setup

1. Open this project folder in VS Code
2. When prompted, install the recommended extensions
3. Reload VS Code to activate all extensions

## 🔧 Included Configurations

### 1. **Editor Settings** (`.vscode/settings.json`)
- Auto-formatting on save using Prettier
- Code actions for ESLint on save
- Consistent indentation (2 spaces)
- Smart imports and auto-completion
- File associations for proper syntax highlighting

### 2. **Recommended Extensions** (`.vscode/extensions.json`)
- **Prettier**: Code formatting
- **ESLint**: JavaScript linting
- **Live Server**: Quick development server
- **Shader Language Support**: For Three.js/WebGL GLSL shaders
- **GitLens**: Enhanced Git integration
- **Path Intellisense**: Path autocomplete
- **Vite**: Vite integration

### 3. **Debug Configurations** (`.vscode/launch.json`)
Multiple debug configurations available:
- **Chrome**: Launch Chrome with Vite dev server
- **Edge**: Launch Edge with Vite dev server
- **Firefox**: Launch Firefox with Vite dev server
- **Attach to Chrome**: Attach debugger to running Chrome instance

To debug:
1. Press `F5` or click "Run and Debug" in the sidebar
2. Select your preferred browser configuration
3. Set breakpoints in your JavaScript code

### 4. **Tasks** (`.vscode/tasks.json`)
Automated tasks for common operations:
- **vite: dev** - Start development server
- **vite: build** - Build for production
- **vite: preview** - Preview production build
- **npm: install** - Install dependencies

Run tasks:
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "Tasks: Run Task"
- Select the task you want to run

## 🎨 Code Formatting

This project uses **Prettier** for consistent code formatting:
- Auto-format on save is enabled
- Single quotes for strings
- 2-space indentation
- 100 character line width

**Manual formatting**: `Shift+Alt+F` (or `Shift+Option+F` on Mac)

## 🚀 Quick Start

### Using VS Code Tasks
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Tasks: Run Task"
3. Select "vite: dev"

### Using Keyboard Shortcuts
- **Start Debugging**: `F5`
- **Format Document**: `Shift+Alt+F`
- **Quick Open**: `Ctrl+P`
- **Command Palette**: `Ctrl+Shift+P`
- **Toggle Terminal**: `` Ctrl+` ``

## 📝 Recommended Workflow

1. **Open the project in VS Code**
   ```bash
   code /home/runner/work/alvin_nie/alvin_nie
   ```

2. **Install recommended extensions** when prompted

3. **Start the dev server**:
   - Press `Ctrl+Shift+P`
   - Type "Tasks: Run Task"
   - Select "vite: dev"
   - Or use terminal: `npm run dev`

4. **Start debugging**:
   - Press `F5`
   - Select browser configuration
   - Debug your code with breakpoints

## 🔍 Features

### IntelliSense
- Auto-import suggestions
- Path completion
- CSS class completion
- JavaScript/HTML/CSS snippets

### Git Integration
- Built-in Git support
- GitLens for enhanced history and blame
- Git Graph for visual commit history

### Live Reload
- Vite provides instant hot module replacement (HMR)
- Changes reflect immediately in browser
- No manual refresh needed

## 💡 Tips

1. **Multi-cursor editing**: Hold `Alt` and click to place multiple cursors
2. **Rename symbol**: `F2` on any variable/function to rename everywhere
3. **Find all references**: `Shift+F12` to see where something is used
4. **Quick Fix**: `Ctrl+.` to see available quick fixes
5. **Toggle sidebar**: `Ctrl+B`

## 🛠️ Additional Setup (Optional)

### ESLint (Recommended)
To add ESLint for code quality:
```bash
npm install --save-dev eslint
npx eslint --init
```

### Prettier (Already configured)
Prettier configuration is in `.prettierrc` file.

## 📚 Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)

## 🐛 Troubleshooting

### Extensions not loading
- Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"

### Debugging not working
- Ensure Vite dev server is running on port 3000
- Check browser console for errors

### Format on save not working
- Verify Prettier extension is installed and enabled
- Check that `editor.formatOnSave` is true in settings

---

**Happy Coding! 🎉**
