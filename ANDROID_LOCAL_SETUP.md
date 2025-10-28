# Running BlackJack21_L Locally on Android

This guide will help you run the game on your Android device (optimized for Samsung S25 Ultra and similar devices).

## 🎮 Quick Overview

This game is a pure HTML/CSS/JavaScript web game that runs in any browser. No installation needed - just open the HTML file!

## 📱 Method 1: Direct File Opening (Simplest)

### Steps:

1. **Download this entire project folder** to your Android device
   - You can download it as a ZIP from Replit
   - Or clone it using a Git app like Termux

2. **Extract the ZIP** (if downloaded as ZIP)
   - Use any file manager app (Files by Google, Solid Explorer, etc.)
   - Extract to a location you can remember, like `Downloads/BlackJack21_L`

3. **Open the game**:
   - Navigate to the extracted folder using your file manager
   - Tap on `index.html`
   - Select "Open with" → "Chrome" (or any browser)

4. **Play!** 🎲
   - The game should load and be fully playable
   - Note: Images won't load with this method unless you add them to the `assets` folder

## 📱 Method 2: Using a Local Web Server (Best for Full Experience)

For the best experience (especially if you add game assets), run a local web server.

### Option A: Using Termux (Recommended)

1. **Install Termux** from F-Droid or Google Play

2. **Install Python** in Termux:
   ```bash
   pkg install python
   ```

3. **Navigate to your game folder**:
   ```bash
   cd /storage/emulated/0/Download/BlackJack21_L
   ```

4. **Start the server**:
   ```bash
   python server.py
   ```
   
   Or alternatively:
   ```bash
   python -m http.server 5000
   ```

5. **Open in browser**:
   - Open Chrome or any browser
   - Go to: `http://localhost:5000`

6. **Play!** 🎲

### Option B: Using Simple HTTP Server App

1. Install "Simple HTTP Server" or "HTTP Server" from Google Play
2. Point it to your BlackJack21_L folder
3. Start the server
4. Open the URL shown in the app (usually `http://localhost:8080`)

## 🎨 Adding Game Assets (Images & Videos)

The game references character images and videos that aren't included in the base project.

### Where to Add Files:

- **Character portraits**: Place in `assets/img/`
  - Example: `OPONENTE_MARIA.png`, `OPONENTE_JESSICA.png`, etc.
  
- **Prize images**: Place in `assets/img/`
  - Example: `MARIA_PREMIO_1.png`, `JESSICA_REGALO_VINO.png`, etc.
  
- **Videos**: Place in `assets/video/`
  - Example: `MARIA_CITA_SECRETA.mp4`

See `assets/README.md` for the complete list of required files.

## 📱 Mobile Optimizations

This game is fully optimized for mobile devices, especially large-screen phones like the Samsung S25 Ultra:

✅ **Touch-friendly buttons** - All buttons are minimum 48x48px for easy tapping
✅ **Responsive layout** - Adapts to portrait and landscape modes
✅ **Optimized text sizes** - Easy to read on mobile screens
✅ **No zoom issues** - Viewport is locked to prevent accidental zooming
✅ **Fast performance** - Pure JavaScript, no heavy frameworks

## 🎯 Optimal Viewing

- **Best in portrait mode** for the main menu
- **Works great in landscape** too
- **Recommended**: Use fullscreen mode in your browser for the best experience

## 🚀 Performance Tips

1. **Close other apps** for best performance
2. **Use Chrome or Samsung Internet** for best compatibility
3. **Enable JavaScript** (should be on by default)
4. **Clear browser cache** if you update the game files

## 📂 Project Structure

```
BlackJack21_L/
├── index.html          # Main game file - OPEN THIS
├── style.css          # Styles (mobile-optimized)
├── server.py          # Python server script
├── js/                # Game logic
│   ├── config.js
│   ├── state.js
│   ├── game-core.js
│   └── ... (other files)
└── assets/            # Game assets
    ├── img/          # Character images
    └── video/        # Unlockable videos
```

## 🎮 Game Controls

- **Tap** to select opponents and make choices
- **Tap "Tirar Dado"** to roll the dice
- **Tap "Plantarse"** to stand
- **Tap buttons** to use special abilities
- All gestures are touch-optimized!

## ⚡ Troubleshooting

### Game won't load:
- Make sure JavaScript is enabled in your browser
- Try a different browser (Chrome, Firefox, Samsung Internet)
- Check that all files were extracted properly

### Images not showing:
- If using Method 1 (direct file), this is normal
- Use Method 2 (local server) for images to load
- Make sure image files are in `assets/img/`

### Game is laggy:
- Close other apps
- Clear browser cache
- Restart your device

### Text is too small/large:
- The game auto-adjusts to your screen
- Try rotating your device
- Use browser zoom controls if needed

## 💡 Pro Tips

- **Save to Home Screen**: In Chrome, tap the menu → "Add to Home Screen" for quick access
- **Fullscreen Mode**: Tap F11 in some browsers or use the browser's fullscreen option
- **Battery Saver**: The game is lightweight and shouldn't drain much battery

## 📝 Notes

- Game state saves automatically in your browser's localStorage
- You can play offline once loaded
- No internet connection required after downloading
- No personal data is collected or sent anywhere

---

Enjoy the game! 🎲🎰
