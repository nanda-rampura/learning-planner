# Learning Planner — Project Status & Handoff

A weekly learning planner for kids. Solo 4-day learning project for picking up
**Next.js + TypeScript + FastAPI + MongoDB** (background: .NET/backend).

Full build plan: `/Users/nandarampura/Documents/claude-code/claude-plan/learning-planner-plan.md`
GitHub: https://github.com/nanda-rampura/learning-planner

> This file is the resume point. Read it first to continue where work left off.

## Progress against the 4-day plan

- ✅ **Day 1** — TypeScript interfaces, `useState`, `useEffect`, mock data
- ✅ **Day 2** — Next.js App Router, `ActivityCard`, `CategoryBadge`, Activities page, nav layout, `useContext`, shared types, multi-page state
- ✅ **Day 3** — API client (`lib/api.ts`), wired context to MongoDB, loading/error states, delete activity, SSL cert fix
- 🔲 **Day 4** — UX polish, deploy to Vercel + Render (YOU ARE HERE)

---

## Stack

| Layer    | Tech                                                              |
| -------- | ---------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4   |
| Backend  | FastAPI, Pydantic v2, Motor (async MongoDB driver)               |
| Database | MongoDB Atlas                                                    |
| Layout   | npm workspaces monorepo (`frontend` workspace + `backend` dir)    |

---

## How to run

```bash
# Frontend (http://localhost:3000)
npm run dev:frontend

# Backend (http://localhost:8000, docs at /docs)
#   first time: cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
#   set backend/.env from backend/.env.example (MONGODB_URI, DATABASE_NAME)
npm run dev:backend
```

⚠️ Next.js 16 here has breaking changes vs. older versions — see `frontend/AGENTS.md`.
Read the relevant guide in `frontend/node_modules/next/dist/docs/` before writing frontend code.

---

## Current state

### Frontend (working, mock data only)
- `src/app/layout.tsx` — root layout: nav bar (Weekly Plan / Activities links), wraps pages in `ActivitiesProvider`.
- `src/app/page.tsx` — home / "This Week's Activities" grid.
- `src/app/activities/page.tsx` — all activities + "Add Activity" form.
- `src/app/context/ActivitiesContext.tsx` — global state via `useContext`: `activities`, `addActivity`, `toggleComplete`.
- `src/app/components/ActivityCard.tsx` — single card (client, handles toggle).
- `src/app/components/CategoryBadge.tsx` — server component, category pill.
- `src/app/types.ts` — `Category`, `Activity`, `CATEGORY_EMOJIS`, `SAMPLE_ACTIVITIES`.

### Backend (built, not yet consumed by frontend)
- `main.py` — FastAPI app, CORS for `localhost:3000`, lifespan connects/closes Mongo.
- `database.py` — Motor client, `connect_db` / `close_db` / `get_db`.
- `models.py` — `Activity`, `ActivityCreate`, `DayPlan`, `WeeklyPlan` (Pydantic).
- `routers/activities.py` — `GET /activities`, `POST /activities`, `DELETE /activities/{id}`.
- `routers/plans.py` — `GET/PUT /plans/{week_id}`, `PATCH /plans/{week_id}/{day}/complete/{activity_id}`.

### Git history (learning cadence)
- Day 1: TypeScript interfaces, useState, useEffect with mock data
- Day 2: ActivityCard / CategoryBadge, Activities page, nav layout, useContext, shared types, multi-page state

---

## ⭐ Next step (where to resume)

**The frontend and backend are not connected.** The UI runs entirely on
`SAMPLE_ACTIVITIES` and in-memory context state; refreshing loses everything.
Backend CRUD exists but nothing calls it.

Suggested path:
1. Add a frontend API client (e.g. `src/app/lib/api.ts`) hitting `http://localhost:8000`.
2. Load activities from `GET /activities` in `ActivitiesProvider` (replace `SAMPLE_ACTIVITIES`).
3. Wire `addActivity` → `POST /activities`, add delete → `DELETE /activities/{id}`.
4. Reconcile field naming: frontend uses `durationMinutes` + `completed`;
   backend uses `duration_minutes` and has no per-activity `completed`
   (completion lives in `WeeklyPlan.completed_ids`). Decide one source of truth.
5. Later: build the actual weekly grid UI on top of the `/plans` endpoints.

### Known gaps / things to watch
- Field mismatch: `durationMinutes` (FE) vs `duration_minutes` (BE).
- "Completed" model differs: FE per-activity boolean vs BE per-day `completed_ids`.
- No tests yet on either side.
- Backend `.env` is git-ignored — needs a real `MONGODB_URI` to run.
