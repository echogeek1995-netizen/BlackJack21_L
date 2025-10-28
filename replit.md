# BlackJack21_L

## Overview
This is a Spanish-language dice/blackjack web game featuring anime-style opponents. Players compete against various AI opponents in a game where they aim to reach 21 without going over, managing their chips through wins and losses.

## Project Architecture
- **Type**: Static frontend web application
- **Languages**: HTML, CSS, JavaScript (ES6)
- **Server**: Python HTTP server (for static file serving)
- **Data Persistence**: localStorage

## Structure
```
/
├── index.html          # Main game page
├── style.css          # Game styling
├── js/                # JavaScript modules
│   ├── config.js      # Game configuration
│   ├── state.js       # State management
│   ├── data.js        # Game data (items, trophies, dialogues)
│   ├── ui.js          # UI functions
│   ├── game-core.js   # Core game logic
│   ├── extras.js      # Special abilities
│   ├── tienda.js      # Shop system
│   ├── galeria.js     # Gallery/trophies
│   ├── citas.js       # Dating sim aspect
│   └── init.js        # Initialization
└── assets/            # Game assets
    ├── img/          # Character images and prizes
    └── video/        # Unlockable videos
```

## Features
1. **Blackjack Gameplay**: Dice-based blackjack against 7 different opponents
2. **Economy System**: Earn and spend chips on items and upgrades
3. **Special Abilities**: Use consumables and permanent upgrades
4. **Gallery System**: Unlock images and videos by winning streaks
5. **Shop**: Purchase items, abilities, and gifts for opponents
6. **Dating Sim Elements**: Unlock special scenes with opponents

## Opponents
- Maria (Easy)
- Lady Jessica (Medium)
- Mei (Medium-High)
- Chel (Hard)
- Marge Simpson (Very Hard) - Replaces Seraphina
- Miranda (Elite)
- Nagatoro (Trickster)

## Recent Changes
- 2025-10-28: Major UI overhaul and character replacement
  - **Character Change**: Replaced Seraphina with Marge Simpson
    - All dialogues, interactions, gifts, and trophies updated
    - Marge has unique personality: motherly yet seductive
  - **Mobile Game UI - Character-Centric Design**:
    - **Character is the focal point** - UI minimized to let background images dominate
    - **Top HUD**: Fully transparent (no backgrounds), only text visible
      - Chips counter: Transparent with strong text shadows (uppercase, 18px)
      - Score display: Transparent with bold shadows for visibility
      - Messages: Smaller (15px), uppercase, strong shadows
    - **Bottom Controls**: Iconic videogame-style buttons
      - **Circular icon-only buttons** (64px diameter)
      - Icons: Dice (🎲), Hand (✋), House (🏠), Forward (▶)
      - NO text on buttons - just pure icons
      - Positioned at absolute bottom (12px from edge)
      - Transparent background, only visible when needed
      - "Volver al Menú" moved to bottom-left corner
    - **Habilidades**: Minimal pill-shaped buttons (12px font)
    - **Dice**: Reduced to 100px for less obstruction
    - **Text Visibility**: Strong text-shadow (0 2px 8px black) on all UI text
    - **Design Philosophy**: Like modern mobile games (Genshin Impact style)
      - Iconic circular buttons like console games
      - Transparent overlays, character dominates screen
      - Minimal UI footprint, gamepad-safe spacing
      - All text legible despite no backgrounds
  - Background images now perfectly centered and use full viewport
  - Deployment configured for Autoscale (production-ready)
  - Game fully functional with mobile optimizations

## User Preferences
None documented yet.

## Notes
- Game state resets on page load (as designed in init.js)
- All text is in Spanish
- Server runs on port 5000 with cache disabled for development
- Character images are expected in `assets/img/` with naming format: `OPONENTE_[NAME].png`
- Video assets are expected in `assets/video/`
- The game is fully functional even without images - all game mechanics work correctly
- Fully optimized for mobile devices with responsive design
- Works great on Android phones (tested for Samsung S25 Ultra screen size)
- Can be run locally offline - see ANDROID_LOCAL_SETUP.md for instructions
