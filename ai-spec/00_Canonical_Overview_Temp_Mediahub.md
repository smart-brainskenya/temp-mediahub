# SMART BRAINS KENYA – TEMPORARY STATIC MEDIA HUB

## Canonical Overview (Authoritative – Temporary Phase)

---

## 1. Purpose of This Document

This document defines the **authoritative scope, intent, and constraints** of the **Temporary Static Smart Brains Media Hub**.

It exists to:

* Unblock student learning immediately
* Replace Google Images and basic video sourcing in zero-data environments
* Preserve the **existing student mental model** already taught in class
* Prevent AI tools (including Gemini CLI) from hallucinating backend, admin, or advanced features

If there is **any conflict** between this document and any other instruction, **this document takes precedence**.

This document **does not describe the final Media Hub**. It describes a **deliberate stop-gap solution**.

---

## 2. Status and Lifecycle

**Status:** Temporary / Stop-Gap / Static

**Expected Lifespan:** Short-term (days to weeks)

**Exit Plan:**

* This implementation will be replaced by the full Media Hub (React + Backend)
* Code may be archived or deleted
* UI concepts may be reused, but **architecture must not be extended**

This implementation must be treated as **throwaway-safe**.

---

## 3. What Is Being Built

The Temporary Static Media Hub is a **read-only, frontend-only React application** that:

* Displays a **small, curated set of images and videos**
* Uses **hardcoded media URLs** defined directly in the codebase
* Allows students to **reuse media exactly as they previously did with Google and YouTube**
* Requires **no backend, no database, and no authentication**

It is effectively a **controlled media shelf**, not a platform.

---

## 4. Who This Is For

### Primary Users: Students

Students:

* Access the site without logging in
* Browse images and videos
* Click media to preview
* Reuse media in their HTML projects

Students **do not**:

* Upload content
* Manage media
* Authenticate
* Interact with any backend system

---

## 5. Core Student Mental Model (Non-Negotiable)

This system must preserve the **exact behaviors students already know**.

### 5.1 Images (Google Images Replacement)

Students must be able to:

1. Open the Image Gallery
2. Click an image
3. See the image displayed clearly using a real `<img>` element
4. **Right-click the image**
5. Select **"Copy image address"**
6. Paste the URL into HTML and see it render

Rules:

* Images must use their **real public URLs**
* Images must NOT be rendered via background-image, canvas, blob URLs, or proxies
* Right-click behavior must remain enabled

Optional helper buttons (e.g. “Copy Image URL”) are allowed, but **must not replace right-click usage**.

---

### 5.2 Videos (Basic Video Reuse)

Students must be able to:

1. Open the Video Library
2. Click a video card
3. Watch the video using a native HTML `<video>` player
4. Reuse the video by:

   * Right-clicking to copy the video address, and/or
   * Using an explicit "Copy" button provided in the UI

Rules:

* Videos must be rendered using native `<video controls>`
* Video `src` must point directly to the real media URL (e.g. Publitio)
* Poster frames may be used if available
* No iframe logic is required in this temporary phase

---

## 6. Explicit Non-Goals (Critical)

The Temporary Static Media Hub must **NOT** include:

* Any backend or API
* Any authentication or user accounts
* Any admin dashboard
* Any upload or import functionality
* Any database or persistence layer
* Any server-side rendering
* Any claim of being the “final” Media Hub

If a feature requires a backend, it is **out of scope by definition**.

---

## 7. Data Source Rules

* All media (images and videos) must be defined in **plain JavaScript data files**
* Media must be hardcoded intentionally
* No dynamic fetching is allowed
* No environment variables are required

This is a **manual, curated dataset by design**.

---

## 8. Information Architecture

The application must use **simple, static routes** only:

* `/` – Home (choice between Images and Videos)
* `/images` – Image Gallery
* `/videos` – Video Library

No dynamic routes are required.

---

## 9. Visual and UX Expectations

Although temporary, the application must:

* Look clean and intentional
* Use card-based layouts
* Provide clear titles and navigation
* Be student-friendly (large click targets, simple language)

The application must **not** feel rushed, broken, or experimental.

---

## 10. Technical Constraints (Non-Negotiable)

* Frontend-only React application
* Builds with `npm run build`
* Deployable as static files (e.g. Vercel)
* No backend assumptions
* No hidden server logic

---

## 11. Definition of Success

This temporary system is successful if:

* Students can right-click images and copy image addresses
* Students can preview and reuse videos
* Lessons proceed without Google or YouTube
* The system cannot fail due to backend issues (because none exist)
* The scope remains intentionally limited

---

## 12. Authority Statement

This document is the **sole canonical authority** for the Temporary Static Media Hub.

All generated plans, code, or AI outputs must:

* Derive from this document
* Avoid introducing assumptions beyond this scope
* Prefer simplicity over completeness

**End of Canonical Overview (Temporary Phase)**
