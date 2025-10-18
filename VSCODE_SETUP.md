# VS Code Setup Guide

This guide will help you set up and use Visual Studio Code with this project for the best development experience.

## 🚀 Quick Setup

### 1. Install VS Code
If you haven't already, download and install VS Code:
- Visit: https://code.visualstudio.com/
- Download for your operating system
- Follow installation instructions

### 2. Open Project in VS Code
```bash
# Navigate to project directory
cd /path/to/alvin_nie

# Open in VS Code
code .
```

### 3. Install Recommended Extensions
When you open the project, VS Code will show a notification:
> "This workspace has extension recommendations."

Click **"Install All"** to install all recommended extensions.

**Essential Extensions:**
- ✅ **Prettier** - Code formatter
- ✅ **ESLint** - JavaScript linter
- ✅ **Live Server** - Development server
- ✅ **Vite** - Vite integration
- ✅ **Shader** - GLSL syntax support for Three.js
- ✅ **GitLens** - Enhanced Git features

### 4. Start Development
Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac), then:
- Type: **"Tasks: Run Task"**
- Select: **"vite: dev"**

Your development server will start at http://localhost:3000

## 🎯 Key Features

### Auto-Formatting
- **On Save**: Code automatically formats when you save files
- **Manual**: Press `Shift+Alt+F` (or `Shift+Option+F` on Mac)
- **Settings**: Configured to use Prettier with single quotes, 2-space indentation

### Debugging
1. Press `F5` to start debugging
2. Choose your browser:
   - **Chrome** (recommended)
   - **Edge**
   - **Firefox**
3. Set breakpoints by clicking left of line numbers
4. Use debug controls to step through code

### IntelliSense & Auto-Complete
- **Auto-imports**: Type a module name, it will auto-import
- **Path completion**: Type paths and get suggestions
- **CSS class completion**: Get CSS class suggestions in HTML
- **Parameter hints**: See function parameters as you type

### Git Integration
- **Source Control Panel**: Click the Git icon in sidebar (or `Ctrl+Shift+G`)
- **GitLens**: See who changed code and when (inline annotations)
- **Git Graph**: Visualize commit history

## 📋 Common Tasks

### Start Development Server
**Option 1: Using Tasks**
1. `Ctrl+Shift+P` → "Tasks: Run Task" → "vite: dev"

**Option 2: Using Terminal**
1. `Ctrl+` ` (backtick) to open terminal
2. Type: `npm run dev`

### Build for Production
**Using Tasks:**
1. `Ctrl+Shift+P` → "Tasks: Run Task" → "vite: build"

**Using Terminal:**
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## ⌨️ Essential Keyboard Shortcuts

### Navigation
- `Ctrl+P` - Quick Open (find files)
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+B` - Toggle Sidebar
- `Ctrl+` ` - Toggle Terminal
- `Ctrl+Shift+E` - Focus on Explorer
- `Ctrl+Shift+F` - Search in Files

### Editing
- `Ctrl+/` - Toggle Line Comment
- `Shift+Alt+F` - Format Document
- `F2` - Rename Symbol
- `Ctrl+D` - Select Next Occurrence
- `Ctrl+Shift+L` - Select All Occurrences
- `Alt+Click` - Add Multiple Cursors
- `Alt+Up/Down` - Move Line Up/Down
- `Shift+Alt+Up/Down` - Copy Line Up/Down

### Debugging
- `F5` - Start Debugging
- `F9` - Toggle Breakpoint
- `F10` - Step Over
- `F11` - Step Into
- `Shift+F11` - Step Out
- `Shift+F5` - Stop Debugging

### Code Navigation
- `F12` - Go to Definition
- `Alt+F12` - Peek Definition
- `Shift+F12` - Find All References
- `Ctrl+Shift+O` - Go to Symbol in File
- `Ctrl+T` - Go to Symbol in Workspace

## 🔧 Workspace Configuration

### Settings (`settings.json`)
The project includes custom settings for:
- Auto-formatting on save
- 2-space indentation
- Single quote preference
- File associations
- Search exclusions (node_modules, dist)

### Extensions (`extensions.json`)
Recommended extensions for this project:
- **Core**: Prettier, ESLint, Vite
- **Three.js**: Shader language support
- **Git**: GitLens, Git Graph
- **Productivity**: Path Intellisense, Auto Rename Tag

### Launch Configuration (`launch.json`)
Pre-configured debugging for:
- Chrome (with Vite dev server)
- Edge (with Vite dev server)
- Firefox (with Vite dev server)
- Attach to Chrome (for existing browser)

### Tasks (`tasks.json`)
Quick access to common commands:
- Start dev server
- Build production
- Preview build
- Install dependencies

## 🎨 Code Style

### Prettier Configuration
Defined in `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### EditorConfig
Defined in `.editorconfig`:
- UTF-8 encoding
- LF line endings
- 2-space indentation
- Trim trailing whitespace

## 💡 Tips & Tricks

### 1. Multi-File Editing
- Open multiple files side-by-side: Drag tabs to split editor
- Switch between tabs: `Ctrl+Tab`
- Close tab: `Ctrl+W`

### 2. Integrated Terminal
- Open multiple terminals: Click `+` in terminal panel
- Split terminal: Click split icon
- Switch terminals: Use dropdown

### 3. Debugging Tips
- **Conditional Breakpoints**: Right-click breakpoint → Edit → Add condition
- **Logpoints**: Right-click line → Add Logpoint
- **Watch Variables**: Add expressions to Watch panel

### 4. Git Workflow
- **Stage Changes**: Click `+` next to file in Source Control
- **Commit**: Type message and click ✓
- **Push**: Click `...` → Push
- **View History**: Use GitLens or Git Graph

### 5. Productivity Boosters
- **Emmet**: Type abbreviations (e.g., `div.container>ul>li*3`) and press Tab
- **Snippets**: Type common patterns and use IntelliSense
- **Refactoring**: Select code → Right-click → Refactor

## 🐛 Troubleshooting

### Extensions Not Working
1. Open Command Palette: `Ctrl+Shift+P`
2. Type: "Developer: Reload Window"
3. Verify extensions are installed and enabled

### Debugging Not Starting
1. Ensure dev server is running: `npm run dev`
2. Check if port 3000 is available
3. Try different browser configuration

### Format on Save Not Working
1. Check Prettier extension is installed
2. Verify settings: File → Preferences → Settings
3. Search for "format on save" and ensure it's checked
4. Set Prettier as default formatter

### IntelliSense Not Working
1. Ensure JavaScript/TypeScript extension is enabled
2. Check for error messages in Output panel
3. Try reloading window

### Git Integration Issues
1. Ensure Git is installed on your system
2. Check Git executable path in settings
3. Try: `git config --global user.name "Your Name"`
4. Try: `git config --global user.email "your.email@example.com"`

## 📚 Additional Resources

### VS Code Documentation
- [Getting Started](https://code.visualstudio.com/docs)
- [JavaScript in VS Code](https://code.visualstudio.com/docs/languages/javascript)
- [Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Version Control](https://code.visualstudio.com/docs/editor/versioncontrol)

### Project-Specific
- [Vite Documentation](https://vitejs.dev/)
- [Three.js Manual](https://threejs.org/manual/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Howler.js Documentation](https://howlerjs.com/)

### Extension Documentation
- [Prettier](https://prettier.io/docs/en/)
- [ESLint](https://eslint.org/docs/latest/)
- [GitLens](https://github.com/gitkraken/vscode-gitlens)

## 🎓 Learning Resources

### VS Code Tips
- [VS Code Tips on YouTube](https://www.youtube.com/c/Code)
- [VS Code Can Do That?](https://vscodecandothat.com/)

### JavaScript & Three.js
- [JavaScript Info](https://javascript.info/)
- [Three.js Journey](https://threejs-journey.com/)
- [Three.js Fundamentals](https://threejsfundamentals.org/)

## ✅ Checklist

Setup completed when you can:
- [ ] Open project in VS Code
- [ ] See and install recommended extensions
- [ ] Auto-format code on save
- [ ] Start dev server using tasks
- [ ] Debug in browser with breakpoints
- [ ] Use IntelliSense for code completion
- [ ] Access Git features in Source Control panel
- [ ] Use terminal within VS Code

---

**Need Help?**
- Check the [.vscode/README.md](.vscode/README.md) for more details
- Visit [VS Code Documentation](https://code.visualstudio.com/docs)
- Open an issue in the repository

**Happy Coding with VS Code! 🚀**
