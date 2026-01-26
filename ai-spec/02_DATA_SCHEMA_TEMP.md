# Data Schema (Temporary Static Media Hub)

**Purpose:** This document defines the exact JavaScript data structures to be used for the hardcoded content.

**Derived from:** `00_Canonical_Overview_Temp_Mediahub.md`

---

## 1. Data Source Principles

-   **Source of Truth:** All data is stored in local `.js` or `.ts` files (e.g., `src/data/images.js`).
-   **Immutable:** The application treats this data as read-only.
-   **No Fetching:** There are no API calls to retrieve this data.
-   **Hardcoded URLs:** All media URLs must be fully qualified strings pointing to the public resource.

---

## 2. Image Data Schema

The image collection will be an array of objects.

### Fields

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer/String | **Yes** | Unique identifier for routing/keys. |
| `title` | String | **Yes** | Display name of the image. |
| `src` | String | **Yes** | Direct, public URL to the image file (JPG/PNG). |
| `alt` | String | **Yes** | Accessibility text. |
| `category` | String | No | Optional grouping tag. |

### Example Object

```javascript
const images = [
  {
    id: 1,
    title: "Nairobi Skyline",
    src: "https://example.com/assets/nairobi_skyline_01.jpg",
    alt: "A panoramic view of Nairobi city at sunset",
    category: "Cityscapes"
  },
  // ... more images
];
```

---

## 3. Video Data Schema

The video collection will be an array of objects.

### Fields

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer/String | **Yes** | Unique identifier for routing/keys. |
| `title` | String | **Yes** | Display name of the video. |
| `src` | String | **Yes** | Direct, public URL to the video file (MP4). |
| `poster` | String | No | URL to a thumbnail image for the video. |
| `duration` | String | No | Human-readable duration (e.g., "1:20"). |

### Example Object

```javascript
const videos = [
  {
    id: 101,
    title: "Introduction to HTML",
    src: "https://example.com/assets/videos/intro_html.mp4",
    poster: "https://example.com/assets/posters/intro_html_thumb.jpg",
    duration: "4:30"
  },
  // ... more videos
];
```

---

## 4. Forbidden Data Fields

To prevent scope creep and maintain the "static" nature:

-   **NO** `created_at` or `updated_at` (Implies database).
-   **NO** `uploaded_by` (Implies user accounts).
-   **NO** `views` or `likes` (Implies dynamic state).
-   **NO** `tags` arrays (Keep categorization simple/flat if used at all).
