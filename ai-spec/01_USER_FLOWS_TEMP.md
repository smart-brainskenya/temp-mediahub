# User Flows (Temporary Static Media Hub)

**Purpose:** This document defines the student-only user flows for the Temporary Static Media Hub. It serves as the interaction specification for the frontend application.

**Derived from:** `00_Canonical_Overview_Temp_Mediahub.md`

---

## 1. High-Level constraints

- **Student Only:** There are no other user roles.
- **No Login:** All flows start immediately upon visiting the site.
- **Read-Only:** Students consume content; they do not create or edit it.

---

## 2. Image Gallery Flow

This flow replaces the student's need to search Google Images for assets.

1.  **Start:** Student visits the Home Page (`/`).
2.  **Navigation:** Student selects the "Image Gallery" card or link.
3.  **Browse:** Student views a grid of curated image cards.
4.  **Preview:** Student clicks on a specific image card.
    -   *System Action:* Opens a larger preview of the image (modal or separate view).
    -   *Constraint:* The image must be displayed as a standard `<img>` tag.
5.  **Action (Primary):** Student **right-clicks** the image.
    -   *System Action:* Browser context menu appears.
6.  **Complete:** Student selects **"Copy image address"** from the browser menu.
    -   *Result:* The direct URL to the image is in the student's clipboard, ready for use in their HTML code.

---

## 3. Video Library Flow

This flow replaces the student's need to search YouTube for assets.

1.  **Start:** Student visits the Home Page (`/`).
2.  **Navigation:** Student selects the "Video Library" card or link.
3.  **Browse:** Student views a grid of curated video cards.
4.  **Preview:** Student clicks on a specific video card.
    -   *System Action:* Opens the video in a player view.
    -   *Constraint:* The video uses the native HTML `<video controls>` element.
5.  **Watch:** Student presses play to watch the video.
6.  **Action (Primary):** Student right-clicks the video OR clicks a visible "Copy Link" button.
7.  **Complete:** The direct URL to the video file is in the student's clipboard.

---

## 4. Navigation Flow

1.  **Global:** A consistent navigation bar or back button must be available.
2.  **Return:** From any Preview screen, the student can return to the respective Gallery/Library list.
3.  **Home:** From any screen, the student can return to the Landing Page.

---

## 5. Excluded Flows (Explicitly Forbidden)

To ensure this tool remains a "controlled media shelf":

-   **NO** User Registration / Login flows.
-   **NO** "Upload New Image" flow.
-   **NO** "Edit Metadata" flow.
-   **NO** Admin Dashboard access.
