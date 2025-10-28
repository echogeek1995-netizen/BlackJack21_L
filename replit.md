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
- Seraphina (Very Hard)
- Miranda (Elite)
- Nagatoro (Trickster)

## Recent Changes
- 2025-10-28: Successfully imported from GitHub and configured for Replit
  - Organized file structure (moved JS files to js/ folder)
  - Created assets folder structure for game media
  - Set up Python HTTP server for local development on port 5000
  - Fixed JavaScript loading order (added config.js to index.html)
  - Removed duplicate constant declarations in state.js
  - Configured deployment settings for Autoscale
  - Game is fully functional (character images need to be added to assets/img/)

## User Preferences
None documented yet.

## Notes
- Game state resets on page load (as designed in init.js)
- All text is in Spanish
- Server runs on port 5000 with cache disabled for development
- Character images are expected in `assets/img/` with naming format: `OPONENTE_[NAME].png`
- Video assets are expected in `assets/video/`
- The game is fully functional even without images - all game mechanics work correctly
