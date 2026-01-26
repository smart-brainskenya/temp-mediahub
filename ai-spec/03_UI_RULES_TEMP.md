# UI Rules (Temporary Static Media Hub)

**Purpose:** This document defines the User Interface behaviors, constraints, and styling rules.

**Derived from:** `00_Canonical_Overview_Temp_Mediahub.md`

---

## 1. General UI Principles

-   **Aesthetic:** Clean, intentional, and card-based.
-   **Navigation:** Simple, static routing (`/`, `/images`, `/videos`).
-   **Feedback:** Visual states for hover and click interactions.
-   **Responsive:** Usable on standard desktop resolutions (primary student context).

---

## 2. Image UI Rules

### 2.1 Image Cards (Gallery View)
-   Must display a thumbnail or scaled-down version of the image.
-   Must display the `title`.
-   Must be clickable to open the Preview.

### 2.2 Image Preview (Detail View)
-   **CRITICAL:** Must render the image using a standard HTML `<img>` tag.
-   **Context Menu:** Right-click **MUST NOT** be disabled or overridden. The browser's native context menu is the primary feature.
-   **Forbidden Implementation:**
    -   Do **NOT** use CSS `background-image` for the main preview (prevents "Copy image address").
    -   Do **NOT** use HTML `<canvas>` to render the image.
    -   Do **NOT** place transparent overlays `<div>` on top of the image (blocks right-click).

---

## 3. Video UI Rules

### 3.1 Video Cards (Library View)
-   Must display a thumbnail/poster.
-   Must display the `title`.
-   Must be clickable to open the Preview.

### 3.2 Video Preview (Detail View)
-   **CRITICAL:** Must render the video using the native HTML `<video controls>` tag.
-   **Source:** The `src` attribute must point directly to the media file.
-   **Forbidden Implementation:**
    -   Do **NOT** use `<iframe>` embeds (e.g., YouTube/Vimeo embeds are forbidden).
    -   Do **NOT** use custom JavaScript video players that obscure the native element structure.

---

## 4. Interaction Patterns

-   **Copying URLs:**
    -   **Primary Method:** Right-click -> Copy Address (Native Browser Behavior).
    -   **Secondary Method:** An optional "Copy Link" button may be placed *near* the media, but it must not obstruct the media itself.

---

## 5. Forbidden UI Patterns

-   **Infinite Scroll:** Do not implement complex pagination or infinite scroll. Use simple grids.
-   **Search Bars:** (Optional but discouraged) Keep it simple; browsing is preferred for small datasets.
-   **Modals:** While allowed, ensure they do not trap focus or break the "right-click" capability. Separate pages are safer for this temporary phase.
-   **Loading Spinners:** Since data is local/hardcoded, loading states should be minimal (only for actual network asset loading).
