# Design System - Spotify Clone

A reference system detailing variables, components, and token specifications to ensure consistent styling across the application.

---

## 1. Color Palette

```css
:root {
  /* Spotify Brand Colors */
  --spotify-green: #1db954;
  --spotify-black-base: #000000;
  --spotify-black-card: #181818;
  --spotify-black-hover: #282828;
  --spotify-black-sidebar: #121212;
  --spotify-grey-text: #b3b3b3;
  --spotify-white: #ffffff;
  
  /* Accent Colors */
  --accent-blue: #0d84fa;
  --bg-gradient-top: rgba(255, 255, 255, 0.1);
  --bg-gradient-bottom: #121212;
}
```

---

## 2. Typography

- **Font Family**: Roboto, Sans-Serif (primary font).
- **Scale**:
  - `Title Large`: 32px (bold, letter-spacing -1.5px)
  - `Title Medium`: 24px (bold, letter-spacing -0.5px)
  - `Body Title`: 16px (semi-bold)
  - `Subtitle`: 14px (regular, letter-spacing 0)
  - `Caption`: 12px (regular)

---

## 3. Spacing Scale

We utilize a 4px/8px grid system for paddings and margins:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `xxl`: 48px

---

## 4. Border Radius

- `button-pill`: 50px
- `card-standard`: 8px
- `avatar`: 50%
- `badge`: 4px

---

## 5. Shadow & Glassmorphism

- **Card Hover Shadow**: `0 8px 16px rgba(0, 0, 0, 0.6)`
- **Header Glassmorphism**:
  ```css
  background: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  ```

---

## 6. Component Specs

### Buttons
- **Pill Button (White)**: Background `#ffffff`, text color `#000000`. Scales up to 1.04x on hover.
- **Icon Button**: Transparent, color `#b3b3b3`. Changes to `#ffffff` on hover.

### Card UI
- **Standard Card (`.card2`)**:
  - Rounded corners: `8px`
  - Background: `#181818` with a smooth transition: `background-color 0.3s ease`
  - Hover background: `#282828`
  - Image transition: slight vertical lift and play button overlay fade-in.

### Input Fields
- **Search Box**:
  - Background: `#1f1f1f`
  - Padding: `8px 16px`
  - Focus border: `1px solid #777777`
  - Typography: 14px, regular
