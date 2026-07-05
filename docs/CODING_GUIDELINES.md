# Coding Guidelines - Spotify Clone

Coding standards inferred from the project codebase. These guidelines help maintain consistency across scripts, styles, and layouts.

---

## 1. JavaScript Standards

- **ES6 Syntax**: Use modern ES6 features (such as `const`/`let` instead of `var`, arrow functions, template literals, destructuring, and async/await).
- **Module System**: Organize scripts as ES Modules (`import`/`export`). Load JavaScript files with the type module tag:
  ```html
  <script type="module" src="script.js"></script>
  ```
- **Selectors**: Always cache DOM selections in descriptive variables. Prefer `querySelector` and `querySelectorAll` over old selector types:
  ```javascript
  const playPauseBtn = document.querySelector('#playing');
  ```

---

## 2. Naming Conventions

- **JavaScript Variables & Functions**: Use camelCase for variables, arrays, and general functions. Use PascalCase for configurations and imported classes.
  ```javascript
  let currentlyPlayingIndex = null;
  function formatTime(seconds) {}
  ```
- **CSS Classes**: Use lowercase, hyphen-separated notation (Kebab-case) for layout containers and UI components.
  ```css
  .music-player {}
  .image-container {}
  ```

---

## 3. Styling Standards (CSS)

- **Grouping**: Group CSS declarations logically (Positioning -> Layout/Flex/Grid -> Dimensions -> Margins/Paddings -> Visuals/Borders -> Fonts/Text -> Transitions).
- **Transitions**: Smooth visual changes on clickable components by applying standard transition animations:
  ```css
  transition: background-color 0.2s ease, transform 0.2s ease;
  ```
- **Responsiveness**: Always use relative sizing units (`rem`, `em`, `vh`, `vw`, `%`) instead of fixed pixel heights and widths for layouts, and define breakpoint media queries.

---

## 4. Error Handling

- **Asynchronous Calls**: Always wrap API queries and streaming operations inside `try/catch` blocks to prevent browser crashes.
- **Graceful Failure**: Avoid using raw browser alerts (`alert()`). Instead, report failures to users by updating UI text or showing dedicated toast notifications.
  ```javascript
  try {
    const data = await fetch(apiURL);
  } catch (error) {
    console.error("Search failed:", error);
    displayNotification("Search service is temporarily unavailable.");
  }
  ```
