# Smart Brains Kenya – Temporary Static Media Hub

![Status: Temporary](https://img.shields.io/badge/Status-Temporary%20%2F%20StopGap-orange)
![Framework: React](https://img.shields.io/badge/Framework-React%2019-blue)
![Build Tool: Vite](https://img.shields.io/badge/Build-Vite-purple)
![Deployment: Vercel](https://img.shields.io/badge/Deployment-Vercel-black)

## 📖 Table of Contents
- [Project Overview](#project-overview)
- [Why This Exists](#why-this-exists)
- [Core Features](#core-features)
- [Student Workflow (Mental Model)](#student-workflow-mental-model)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Technical Constraints](#technical-constraints)
- [Documentation & Specs](#documentation--specs)

---

## Project Overview
The **Temporary Static Media Hub** is a lightweight, **read-only** React application designed to act as a "controlled media shelf" for students. 

It provides a curated collection of **Images** and **Videos** that students can browse, preview, and reuse in their HTML/CSS projects. It is built to function entirely without a backend, database, or user authentication.

---

## Why This Exists
This project serves as a critical **stop-gap solution** to:
1.  **Unblock Learning**: Allow lessons to proceed in zero-data or restricted internet environments.
2.  **Replace External Tools**: Substitute Google Images and YouTube with a safe, local-like alternative.
3.  **Preserve Habits**: Maintain the exact "Search -> Click -> Copy URL" workflow students have already learned.

> **Note**: This is a throwaway-safe implementation intended to be replaced by a full-stack version later.

---

## Core Features
| Feature | Description |
| :--- | :--- |
| **🖼️ Image Gallery** | Grid of high-quality, curated images organized by category. |
| **🎥 Video Library** | Native HTML5 video player with standard controls. |
| **⚡ Instant Search** | Client-side filtering of media assets. |
| **🖱️ Right-Click Ready** | Native browser context menu support (`Copy Image Address`). |
| **📱 Responsive Design** | Clean, card-based UI that works on various screen sizes. |

---

## Student Workflow (Mental Model)
The application strictly adheres to the following interactions to match standard web browsing:

### For Images
1.  Browse the **Image Gallery**.
2.  Click an image to preview it large.
3.  **Right-click** the image.
4.  Select **"Copy Image Address"**.
5.  Paste into HTML: `<img src="...">`.

### For Videos
1.  Browse the **Video Library**.
2.  Click a video to watch.
3.  **Right-click** or use the **Copy URL** button.
4.  Paste into HTML: `<video src="...">`.

---

## Getting Started

### Prerequisites
- Node.js (Latest LTS)
- npm

### Installation
```bash
# 1. Clone the repository
git clone <repository-url>
cd temp-mediahub

# 2. Install dependencies
npm install
```

### Development
```bash
# Start the local development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Deployment
This project is optimized for **Vercel**.

1.  **Configuration**: A `vercel.json` file is included to handle Single Page Application (SPA) routing (rewriting all paths to `/index.html`).
2.  **Build Command**: `npm run build`
3.  **Output Directory**: `dist`

---

## Project Structure
```text
/
├── ai-spec/              # 🔴 Authoritative Project Specifications
├── src/
│   ├── components/       # Reusable UI components (Cards, Modals)
│   ├── data/             # 💾 STATIC DATA (Hardcoded media lists)
│   ├── pages/            # Main Route Views (Home, Gallery, Library)
│   ├── App.jsx           # Main Application Entry
│   └── main.jsx          # React DOM mounting
├── public/               # Static assets (Favicons, Logos)
└── vercel.json           # Deployment config
```

---

## Technical Constraints
*   **No Backend**: Logic must be purely frontend.
*   **No Database**: Data is stored in `src/data/images.js` and `src/data/videos.js`.
*   **No Auth**: No login required.
*   **Hardcoded URLs**: Media links point directly to public content delivery networks (e.g., Publitio).

---

## Documentation & Specs
For deep-dive details, refer to the `ai-spec/` folder. These documents are the **source of truth**:

*   [📄 Canonical Overview](./ai-spec/00_Canonical_Overview_Temp_Mediahub.md)
*   [📄 User Flows](./ai-spec/01_USER_FLOWS_TEMP.md)
*   [📄 Data Schema](./ai-spec/02_DATA_SCHEMA_TEMP.md)
*   [📄 UI Rules](./ai-spec/03_UI_RULES_TEMP.md)
