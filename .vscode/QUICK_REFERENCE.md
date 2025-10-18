# VS Code Quick Reference

## 🚀 Getting Started (3 Steps)
1. Open project in VS Code: `code .`
2. Install recommended extensions (click "Install All" when prompted)
3. Start dev server: Press `Ctrl+Shift+P` → "Tasks: Run Task" → "vite: dev"

## ⌨️ Essential Shortcuts

### Development
| Action | Shortcut |
|--------|----------|
| Start/Debug | `F5` |
| Format Document | `Shift+Alt+F` |
| Quick Open File | `Ctrl+P` |
| Command Palette | `Ctrl+Shift+P` |
| Toggle Terminal | `Ctrl+` ` |
| Save All Files | `Ctrl+K S` |

### Navigation
| Action | Shortcut |
|--------|----------|
| Go to Definition | `F12` |
| Find All References | `Shift+F12` |
| Go to Symbol | `Ctrl+Shift+O` |
| Go Back | `Alt+Left` |
| Go Forward | `Alt+Right` |

### Editing
| Action | Shortcut |
|--------|----------|
| Toggle Comment | `Ctrl+/` |
| Rename Symbol | `F2` |
| Multi-Cursor | `Alt+Click` |
| Select Next | `Ctrl+D` |
| Move Line | `Alt+Up/Down` |
| Copy Line | `Shift+Alt+Up/Down` |

### Git
| Action | Shortcut |
|--------|----------|
| Source Control | `Ctrl+Shift+G` |
| Commit | `Ctrl+Enter` (in SCM) |
| View Changes | Click file in SCM |

## 📋 Common Tasks

### Start Development
```bash
Method 1: Ctrl+Shift+P → "Tasks: Run Task" → "vite: dev"
Method 2: Ctrl+` (open terminal) → npm run dev
Method 3: Press F5 to debug
```

### Debug in Browser
1. Set breakpoints (click left of line numbers)
2. Press `F5`
3. Select browser (Chrome recommended)
4. Code will pause at breakpoints

### Format Code
- **Auto**: Automatically formats on save (enabled)
- **Manual**: `Shift+Alt+F`
- **Selection**: Select code → `Shift+Alt+F`

### Search & Replace
- **Search in File**: `Ctrl+F`
- **Search in Project**: `Ctrl+Shift+F`
- **Replace in File**: `Ctrl+H`
- **Replace in Project**: `Ctrl+Shift+H`

## 🎯 Quick Tips

### Multi-Cursor Magic
1. `Alt+Click` - Add cursor at click position
2. `Ctrl+Alt+Up/Down` - Add cursor above/below
3. `Ctrl+D` - Select next occurrence
4. `Ctrl+Shift+L` - Select all occurrences

### Emmet HTML
Type and press Tab:
- `div.container` → `<div class="container"></div>`
- `ul>li*3` → Creates ul with 3 li elements
- `div#app` → `<div id="app"></div>`

### IntelliSense
- Type to see suggestions
- `Ctrl+Space` to trigger manually
- Arrow keys to navigate
- `Tab` or `Enter` to accept

### Git Integration
- View changes: Click file in Source Control
- Stage file: Click `+` icon
- Commit: Type message, press `Ctrl+Enter`
- Push: Click `...` → Push

## 📦 Installed Extensions

### Essential (Auto-installed)
✅ **Prettier** - Auto-format code
✅ **ESLint** - Find code issues
✅ **Vite** - Vite integration
✅ **GitLens** - Git supercharged
✅ **Live Server** - Quick preview

### Three.js/WebGL
✅ **Shader** - GLSL syntax
✅ **WebGL GLSL Editor** - Shader highlighting

### Productivity
✅ **Path Intellisense** - Path completion
✅ **Auto Rename Tag** - HTML tag pairs
✅ **Error Lens** - Inline errors
✅ **TODO Highlight** - Highlight TODOs

## 🔧 Configuration Files

### What's Configured
- `.vscode/settings.json` - Editor settings
- `.vscode/extensions.json` - Recommended extensions
- `.vscode/launch.json` - Debug configurations
- `.vscode/tasks.json` - Task automation
- `.prettierrc` - Code formatting rules
- `.editorconfig` - Editor consistency

### Project Settings Applied
✅ Auto-format on save
✅ 2-space indentation
✅ Single quotes
✅ 100 character line width
✅ LF line endings
✅ Trim trailing whitespace

## 🐛 Debugging Features

### Set Breakpoints
- Click left of line number (red dot appears)
- Right-click → "Add Conditional Breakpoint"
- Right-click → "Add Logpoint" (logs without stopping)

### Debug Controls
- `F5` - Start/Continue
- `F10` - Step Over
- `F11` - Step Into
- `Shift+F11` - Step Out
- `Shift+F5` - Stop

### Watch Variables
1. Open Debug panel
2. Add variable to Watch
3. See value updates in real-time

## 💡 Pro Tips

### Zen Mode
- `Ctrl+K Z` - Distraction-free coding
- Press `Esc Esc` to exit

### Split Editor
- `Ctrl+\` - Split editor
- Drag file to split area
- `Ctrl+1/2/3` - Focus split

### Snippets
- Type `log` → `console.log()`
- Type `for` → for loop structure
- Type `func` → function structure

### Integrated Terminal
- `Ctrl+` ` - Toggle terminal
- `Ctrl+Shift+` ` - New terminal
- Right-click → Split Terminal

## 📚 Need More Help?

- **Full Guide**: See [VSCODE_SETUP.md](./VSCODE_SETUP.md)
- **VS Code Docs**: https://code.visualstudio.com/docs
- **Keyboard Shortcuts**: `Ctrl+K Ctrl+S`
- **Welcome Screen**: Help → Welcome

## 🎉 You're All Set!

Your VS Code is configured for:
- ✅ Automatic code formatting
- ✅ Browser debugging
- ✅ Task automation
- ✅ Git integration
- ✅ IntelliSense & auto-imports
- ✅ Three.js/WebGL support

**Start coding**: Press `F5` or run `npm run dev` to begin!
