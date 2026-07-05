# UI/UX Audit - Spotify Clone

A professional UI/UX evaluation of the Spotify Clone from the perspective of a Senior Product Designer, checking layout, design tokens, responsiveness, and interaction feedback.

---

## 1. Design Token Analysis

| Category | Finding | Severity | Proposed Fix |
| :--- | :--- | :--- | :--- |
| **Typography** | Font imports include `Lobster` (unused) and `Roboto`. General font-weights are locked globally to `700` (bold) via `* { font-weight: 700; }`. This breaks typographic hierarchy (subtitles look as thick as titles). | **Medium** | Remove global bold styling. Set standard line weights (Light 300, Regular 400, Medium 500, Bold 700) matching specific elements. |
| **Colors** | Background colors use raw hex values (#000000, #121212, #1f1f1f) that are close to Spotify but lack opacity adjustments. Text matches `#fff` and `#b3b3b3` correctly. | **Low** | Declare variables under `:root` to ensure styling consistency. |
| **Glassmorphism** | Completely absent. Panels use solid opaque background fills without modern backdrop-filter properties. | **Low** | Introduce glassmorphism attributes on floating widgets (such as dropdown headers and playing bars) by utilizing `backdrop-filter: blur(10px)`. |

---

## 2. Layout, Alignment & Spacing

| Area | Issue Description | Severity | Suggested Fix |
| :--- | :--- | :--- | :--- |
| **Header Section** | Search box alignment uses fixed widths (`width: 28vw;`). This causes the box to overlap or squeeze when screen sizes change. | **High** | Transition to a flexbox container using `flex-grow` with minimum/maximum pixel boundaries. |
| **Sidebar Padding** | Filter buttons use simple border margins without internal flex padding. The layout list overflows the container space. | **Medium** | Rebuild sidebar button grids using CSS Grid or flexbox containers with `gap` settings. |
| **Main Card Grids** | Card grids are hardcoded to wrap irregularly. Images are not proportioned correctly, causing text to spill out. | **High** | Standardize cards using `display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));`. |

---

## 3. Interactive States & Micro-interactions

| State | Issue Description | Severity | Suggested Fix |
| :--- | :--- | :--- | :--- |
| **Hover States** | Buttons and playlist elements lack smooth transitions. Hover actions occur instantly, giving a harsh feel to the user interface. | **Medium** | Add `transition: all 0.2s ease-in-out` on all interactive selectors. |
| **Active States** | Hard to identify which card or playlist item is active. No persistent outline or background indicator shows the current selection. | **Medium** | Apply a highlight styling class (e.g. `.active-card`) that changes the background color or text highlight when selected. |
| **Loading States** | When searching YouTube, the interface freezes or sits without feedback. If the API limits are reached, the browser hangs before showing a raw alert dialogue. | **High** | Implement animated skeletons or spinner states inside the display panels during fetching processes. |
| **Error States** | API failures and server streaming issues trigger raw browser alerts (`alert()`), which break the premium app aesthetic. | **High** | Create a custom modal toast overlay to display user error feedback gracefully. |
