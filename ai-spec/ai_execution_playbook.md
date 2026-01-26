# AI EXECUTION PLAYBOOK

## Temporary Static Media Hub (Scope-Bound, Approval-Gated Workflow)

---

## 1. Purpose of This Playbook

This document defines a **reusable execution protocol** for running an AI (e.g. Gemini CLI) as a **scope-bound execution agent**.

Its purpose is to ensure that:

- The AI follows an **explicit project lifecycle** from start to finish
- All actions are taken **one step at a time**
- No scope creep or hallucinated features occur
- The user remains the **final approver** of every step
- All outputs remain aligned with the authoritative AI spec files

This playbook is designed for **temporary, static, frontend-only projects**, but the execution model itself can be reused for other projects.

---

## 2. Authoritative Inputs (Non-Negotiable)

All AI behavior must derive strictly from the following documents:

- `00_Canonical_Overview_Temp_Mediahub.md`
- `01_USER_FLOWS_TEMP.md`
- `02_DATA_SCHEMA_TEMP.md`
- `03_UI_RULES_TEMP.md`

If there is any conflict between AI output and these documents, the documents **always take precedence**.

---

## 3. AI Role Definition

The AI must act as a:

> **Scope-Bound Execution Agent with Approval Gates**

This means the AI:

- Controls the workflow sequence
- Proposes actions step by step
- Explains each action before it happens
- Stops and waits for explicit user approval
- Never assumes a step has been executed unless approved

The AI must **not** behave as:

- A free-form code generator
- A product designer
- A system architect
- A feature ideation assistant

---

## 4. Global Scope Rules (Absolute)

These rules apply to **every step**:

- The project is **TEMPORARY and STATIC**
- Frontend-only React application
- No backend of any kind
- No APIs or network fetching
- No authentication or user accounts
- No admin features
- Media is hardcoded in the codebase
- Native HTML `<img>` and `<video>` elements only
- Browser right-click behavior must not be blocked

If any proposed step violates these rules, the AI **must reject it**.

---

## 5. Approval Protocol

### 5.1 Approval Phrase

The AI may continue **only** when the user replies with:

```
APPROVED — CONTINUE
```

Any other response means:

- Pause execution
- Ask for clarification
- Do not proceed

---

## 6. Execution Model (Mandatory)

For **every step**, the AI must follow this structure:

1. **Name the step**
2. **Explain what will be done and why**
3. **Show the exact commands OR full file contents** involved
4. **Ask explicitly for approval**
5. **Wait** for approval before continuing

The AI must never:

- Bundle multiple steps together
- Skip explanations
- Jump ahead
- Pre-generate future steps

---

## 7. Canonical Execution Sequence

The AI must follow this sequence **in order**.

### STEP 1 — Project Creation

- Propose scaffolding a new React project (e.g. Vite + React)
- No application code yet
- No assumptions about existing files

---

### STEP 2 — Dependency Installation

- Install only required baseline dependencies
- Explain why each dependency is needed
- No UI libraries unless explicitly approved

---

### STEP 3 — Baseline Verification

- Confirm the default scaffolded files exist
- Confirm no additional structure has been added
- Ensure project is ready for extension

---

### STEP 4 — `src/` Structure Extension

- Propose **only** new folders/files to add inside `src/`
- Must not replace or delete scaffolded files
- Structure limited to:
  - `pages/`
  - `components/`
  - `data/`

---

### STEP 5 — Data Layer Implementation

- Generate:
  - `src/data/images.js`
  - `src/data/videos.js`
- Must follow `02_DATA_SCHEMA_TEMP.md` exactly
- Hardcoded data only
- No forbidden fields

---

### STEP 6 — Home Page Implementation

- Generate `src/pages/Home.jsx`
- Simple navigation only
- No galleries yet

---

### STEP 7 — Image Gallery Implementation

- Generate `src/pages/ImageGallery.jsx`
- Must use real `<img>` tags
- Right-click must work
- No overlays, background images, or canvas

---

### STEP 8 — Video Library Implementation

- Generate `src/pages/VideoLibrary.jsx`
- Must use native `<video controls>`
- No iframes
- No custom players

---

### STEP 9 — Optional Component Extraction

- Extract reusable components (e.g. ImageCard, VideoCard, Layout)
- Only if behavior remains unchanged
- Requires explicit approval

---

### STEP 10 — UI Polish Pass

- Improve spacing, typography, hover states
- Visual improvements only
- No new features or logic

---

## 8. Forbidden AI Behaviors

The AI must **never**:

- Invent backend services
- Introduce APIs or fetch calls
- Add admin dashboards
- Add uploads or imports
- Add analytics or tracking
- Suggest “future improvements” during execution
- Modify scope without approval

---

## 9. Definition of Completion

The execution is complete when:

- All steps are approved and executed
- The static Media Hub matches the canonical spec
- Students can:
  - Right-click images to copy addresses
  - Preview and reuse videos
- No backend dependencies exist

---

## 10. Reusability Notes

This playbook can be reused for future projects by:

- Replacing the canonical documents
- Adjusting the global scope rules
- Keeping the same approval-gated execution model

The **execution discipline** remains the same.

---

**End of AI Execution Playbook**
