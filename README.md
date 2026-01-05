# INTAKE.ai  
**Pre-Intake Intelligence for Public Grievance Systems**

> Turning unstructured complaints into clean, prioritized signals — before governance begins.

---

## Why INTAKE.ai

Public authorities don’t fail at resolving issues.  
They fail **before that** — at intake.

Every day, thousands of grievances arrive as:
- free-text complaints
- mixed languages
- images, letters, videos
- no urgency signal
- no prioritization

Critical issues get buried.  
INTAKE.ai fixes this **one layer earlier**.

---

## What INTAKE.ai Is

INTAKE.ai is a **pre-intake civic intelligence system** that:

- structures incoming grievances
- assigns urgency and priority
- suggests responsible departments
- provides admin-first visibility
- optionally anchors complaint states on blockchain for auditability

It **does not** replace government portals.  
It **does not** enforce resolution.  
It makes intake sane.

---

## Product Philosophy

- **Authority-first**: Admin dashboard is the product.
- **Minimal citizen UX**: One box. One action.
- **Modular by design**: Features are toggles, not assumptions.
- **No overclaims**: Intake, not justice.

---

## Core Features

### Citizen Intake (Single Page)
- Minimal text input (Google-style)
- Optional attachments:
  - images
  - documents
  - short videos
- Auto / manual location tagging
- Instant receipt with complaint ID

---

### Intelligence Layer
- Complaint normalization
- Language detection
- Category & sub-category classification
- Urgency scoring (rule + LLM)
- Department suggestion
- Geo-tagging (ward / area)

---

### Admin Dashboard
- Priority-sorted complaint queue
- Filters: department, area, status, date
- Complaint detail view:
  - structured summary
  - original text
  - evidence preview
  - map pin
- Status updates & audit logs
- CSV export

---

### Modular Add-Ons (Toggleable)

| Module | Purpose |
|------|--------|
| Predictive Heatmap | Visualize complaint density & trends |
| Focus Mode | Lock system to a single civic issue |
| Multimodal Evidence | Attach images & documents |
| Blockchain Audit | Immutable hash of complaint states |

---

## Blockchain (Optional, Audit-Only)

INTAKE.ai can anchor complaint state hashes on Ethereum.

- append-only
- no enforcement
- no tokens
- no governance claims

Purpose:
> ensure complaint existence and state transitions cannot be silently altered.

---

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Firebase Hosting

### Backend
- Node.js + Express
- REST API (client–server architecture)
- Gemini API (LLM orchestration)

### Data & Infra
- Firestore (primary database)
- Firebase Storage (attachments)
- Firebase Auth (admin only)
- Google Maps Platform (location)

### Blockchain (Optional)
- Solidity (Ethereum, Sepolia testnet)
- ethers.js (backend interaction)

---

## Architecture Overview

Landing / Intake / Admin (Web)
↓
Backend API
↓
Firestore + Storage
↓
Gemini (LLM)

## What This Project Is Not

- ❌ Not a government portal  
- ❌ Not a legal system  
- ❌ Not a resolution engine  
- ❌ Not a blockchain governance product  

It is an **intelligence layer**, nothing more, nothing less.

---

## Demo Flow (90 seconds)

1. Open landing page  
2. Register a complaint in one text box  
3. Receive instant complaint ID  
4. Switch to admin dashboard  
5. See prioritized queue  
6. Open complaint → structured summary + map  
7. Toggle heatmap / audit hash  
8. Done

---

## Setup (Local)

```bash
# frontend
cd frontend
npm install
npm run dev

# backend
cd backend
npm install
npm run dev
