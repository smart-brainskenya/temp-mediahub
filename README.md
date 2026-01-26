# Smart Brains Kenya – Temporary Static Media Hub

## Overview
The **Temporary Static Media Hub** is a read-only, frontend-only React application designed to provide a curated set of images and videos for students. It serves as a reliable, zero-data friendly replacement for Google Images and YouTube during class sessions, preserving the existing student mental model for media reuse in HTML projects.

This project is a **deliberate stop-gap solution** and is treated as throwaway-safe, intended to be replaced by a full backend-integrated Media Hub in the future.

## Key Features
- **Image Gallery**: A collection of curated images that students can browse and preview.
- **Video Library**: A collection of native HTML5 videos with playback controls.
- **Student-Centric Design**: 
    - **Right-Click Friendly**: Students can right-click any image or video to "Copy image address" or "Copy video address" for use in their own projects.
    - **Native Preview**: Uses standard `<img>` and `<video>` tags to ensure compatibility and familiar behavior.
- **Static Content**: All media metadata is hardcoded in JavaScript data files, requiring no backend or database.

## Technical Requirements
- **Runtime**: Node.js (Latest LTS recommended)
- **Package Manager**: npm
- **Framework**: React 19 (Vite-based)
- **Routing**: React Router 7
- **Styling**: Standard CSS (Modular approach)
- **Deployment**: Optimized for Vercel or any static site hosting.

## Project Structure
- `src/components/`: Reusable UI components (Cards, Modals, Layout).
- `src/pages/`: Main application views (Home, Gallery, Library).
- `src/data/`: Static JavaScript files containing media metadata.
- `ai-spec/`: Authoritative project specifications and design rules.
- `public/assets/`: Local static assets like the project logo.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd temp-mediahub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment
This application is configured for deployment on **Vercel**. 
- The `vercel.json` file handles SPA routing redirects.
- Ensure the Build Command is `npm run build` and the Output Directory is `dist`.

## Specifications & Documentation
Detailed project specs, user flows, and UI rules can be found in the `ai-spec/` directory:
- [Canonical Overview](./ai-spec/00_Canonical_Overview_Temp_Mediahub.md)
- [User Flows](./ai-spec/01_USER_FLOWS_TEMP.md)
- [Data Schema](./ai-spec/02_DATA_SCHEMA_TEMP.md)
- [UI Rules](./ai-spec/03_UI_RULES_TEMP.md)

## Non-Goals
This project explicitly excludes:
- Backend or API integration.
- Authentication or user accounts.
- Admin dashboards or upload functionality.
- Databases or persistence layers.