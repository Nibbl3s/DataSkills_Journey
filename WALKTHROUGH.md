# 🚀 Data Skills Journey — Build Walkthrough

A commit-by-commit story of how the app grew from a static roadmap into an interactive student tool.

---

## Commit 1: `fix: remove unused React import (TS6133)`

The journey begins with a deployment blocker. The original `App.tsx` imported `React` as a default import — a leftover from pre-React 17. TypeScript strict mode (with `noUnusedLocals: true`) rightfully rejected it.

```diff
-import React, { useState } from 'react';
+import { useState } from 'react';
```

**Lesson**: Modern React's JSX transform doesn't need the `React` import. Only import what you use.

---

## Commit 2: `fix: set Vite base path for GitHub Pages`

After deploying, all assets returned **404** errors. The site lives at `/DataSkills_Journey/` but Vite was building paths relative to `/`.

```diff
 export default defineConfig({
   plugins: [react()],
+  base: '/DataSkills_Journey/',
 })
```

**Lesson**: Always set `base` in Vite when deploying to a subpath.

---

## Commit 3: `refactor: extract architecture — types, hooks, data`

Before adding features, the monolithic 307-line `App.tsx` needed structure. Three foundational files were created:

| File | Purpose |
|------|---------|
| `src/types.ts` | All TypeScript interfaces — `WeekData`, `ProgressState`, `DeadlineState`, `NotesState`, `AssessmentState` |
| `src/hooks/useLocalStorage.ts` | Generic hook for typed localStorage persistence with JSON serialization |
| `src/data.tsx` | Course data extracted from App.tsx + new resource links + skills data |

**Lesson**: Invest in architecture before features — it pays dividends in every component that follows.

---

## Commit 4: `feat: Progress Tracker with completion rings`

**File**: `src/components/ProgressTracker.tsx`

Students can now check off deliverables per week. The UI shows:
- ✅ Clickable checkbox rows per task (checked = strikethrough + green)
- 📊 Animated progress bar with percentage
- 🔘 SVG completion ring around each timeline node (renders in App.tsx)

All state persists in `localStorage` under key `dsj-progress`.

---

## Commit 5: `feat: Deadline Planner with urgency indicators`

**File**: `src/components/DeadlinePlanner.tsx`

Students set personal deadlines per task using native date pickers. Color-coded urgency:
- 🟢 **Green**: >3 days remaining
- 🟡 **Amber**: 1–3 days remaining
- 🔴 **Red**: overdue or due today

Deadlines persist in `localStorage` under key `dsj-deadlines`.

---

## Commit 6: `feat: Notes & Reflection Journal with export`

**File**: `src/components/NotesJournal.tsx`

An auto-saving textarea per week with:
- 💾 Debounced save (400ms delay) to avoid excessive localStorage writes
- 📝 Character count display
- 📥 **"Export All Notes"** button — downloads all weeks' notes as a single `.md` file

Notes persist in `localStorage` under key `dsj-notes`.

---

## Commit 7: `feat: Self-Assessment Checklist with visual summary`

**File**: `src/components/SelfAssessment.tsx`

Skills derived from each week's learning objectives. Students rate each skill:
- 🔴 Not Yet → 🟡 Getting There → 🟢 Confident

The stacked progress bar shows the distribution at a glance. Ratings persist in `localStorage` under key `dsj-assessment`.

---

## Commit 8: `feat: Resource Hub with categorized links`

**File**: `src/components/ResourceHub.tsx`

Curated external links organized by type:
- 📚 Tutorials (purple)
- 🎬 Videos (rose)
- 📄 Templates (blue)
- 📖 References (amber)

Resources are defined in `src/data.tsx` — easy for instructors to customize.

---

## Commit 9: `feat: wire everything into App.tsx with tabbed panel`

**File**: `src/App.tsx`

The main app was rewritten to:
1. Import all 5 feature components
2. Add a **tabbed panel** below the week detail view
3. Pass persisted state hooks down to each feature
4. Render **SVG progress rings** on timeline nodes

A `FeaturePanel` switch component cleanly routes between tabs.

---

## Commit 10: `fix: TypeScript generic type annotations`

The build initially failed with 6 `TS2322` errors — the `useLocalStorage` calls for deadlines, notes, and assessment were missing explicit generics, causing TypeScript to infer `unknown`.

```diff
-const [deadlines, setDeadlines] = useLocalStorage('dsj-deadlines', {});
+const [deadlines, setDeadlines] = useLocalStorage<DeadlineState>('dsj-deadlines', {});
```

**Lesson**: Always be explicit with generics when TypeScript can't infer the shape you need.

---

## ✅ Final Build: SUCCESS

```
tsc -b && vite build
✓ 1714 modules transformed
✓ built in 2.69s
```

| Output File | Size | Gzipped |
|------------|------|---------|
| `index.html` | 0.52 kB | 0.31 kB |
| `index.css` | 19.04 kB | 4.05 kB |
| `index.js` | 224.48 kB | 70.57 kB |

---

## Architecture Summary

```
src/
├── App.tsx                    # Main layout + tab orchestration
├── types.ts                   # Shared TypeScript interfaces
├── data.tsx                   # Course data, resources, skills
├── hooks/
│   └── useLocalStorage.ts     # Generic localStorage hook
└── components/
    ├── ProgressTracker.tsx     # ✅ Checkboxes + progress bar
    ├── DeadlinePlanner.tsx     # 📅 Date inputs + urgency colors
    ├── NotesJournal.tsx        # 📝 Auto-save textarea + export
    ├── SelfAssessment.tsx      # 🎯 Confidence ratings + bar
    └── ResourceHub.tsx         # 🔗 Categorized external links
```
