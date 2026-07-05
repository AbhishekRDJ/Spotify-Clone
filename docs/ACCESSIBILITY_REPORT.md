# Accessibility (a11y) Report - Spotify Clone

Accessibility review checking compliance with WCAG standards, semantic elements, keyboard focus behavior, and screen reader support.

---

## 1. Compliance Audit

### Keyboard Navigation & Focus Ring Indicators
- **Issue**: Standard focus outlines are suppressed globally in the styling sheet. Most custom elements, like playlist items (`<li>`) and bottom media controls, cannot be focused using the `Tab` key, preventing users from navigating without a mouse.
- **Impact**: Severe blocker for motor-impaired or keyboard-only users.
- **Solution**: Re-enable focus outlines. Add `tabindex="0"` to list elements and bind keyboard listeners to trigger action callbacks on `Enter` or `Space` key presses.

### Missing ARIA Labels & Semantic Markup
- **Issue**: Media player buttons use FontAwesome icons inside raw `<button>` tags without text descriptors or `aria-label` properties. Screen readers only announce them as "button" without explaining their function.
- **Impact**: Screen reader users cannot identify playback controls.
- **Solution**: Add descriptive `aria-label` attributes to playback controls:
  ```html
  <button aria-label="Play Track"><i class="fa-circle-play fa-regular"></i></button>
  ```

### Low Color Contrast Ratio
- **Issue**: Playlist subtitle text (`.playlist_name` and `.card-subtitle`) uses the color `#b3b3b3` on a dark `#121212` background. This results in a contrast ratio of ~3.5:1, falling below the WCAG AA minimum standard of 4.5:1 for body copy.
- **Impact**: Hard to read for visually impaired users.
- **Solution**: Lighten grey text variables to `#d3d3d3` or `#ffffff` to meet WCAG standards.

### Unlinked Form Inputs
- **Issue**: The search input field in the top bar lacks a linked `<label>` element. This prevents screen readers from announcing what the text input is for.
- **Impact**: Form inputs lack accessibility context.
- **Solution**: Add an `aria-label="Search for a song"` attribute to the `<input>` element.

---

## 2. Accessibility Checklist (Target Compliance)

| Checkpoint | Target Level | Current Status | Remediation Action |
| :--- | :--- | :--- | :--- |
| **Keyboard Focusability** | Level AA | Fail | Add `tabindex="0"` to all interactive buttons and playlist items. |
| **Visual Focus States** | Level AA | Fail | Style elements with distinct `:focus-visible` borders. |
| **Control Descriptions** | Level A | Fail | Add `aria-label` text to all icon-only buttons. |
| **Color Contrast** | Level AA | Partial Fail | Lighten grey text colors to improve legibility. |
| **Language Attributes** | Level A | Pass | The page correctly sets `<html lang="en">`. |
