# NOLA BUILDS Remodel Estimator & Client Portal

A full-stack, enterprise-grade remodeling estimator, lead capture platform, and client operations hub designed specifically for **NOLA BUILDS**. Built on React, Node.js/Express, and Firebase with real-time AI capabilities powered by the Google Gemini API.

---

## 🏗️ System Architecture

This application employs a high-performance **Full-Stack (Vite + Express)** single-port container architecture:

```
┌────────────────────────────────────────────────────────┐
│                      Client (SPA)                      │
│             React / Vite / Tailwind CSS                │
└──────────────────────────┬─────────────────────────────┘
                           │ API Requests / Static Assets
┌──────────────────────────▼─────────────────────────────┐
│                   Express.js Server                    │
│            Port 3000 Ingress / REST Router             │
└───────┬──────────────────┬──────────────────────┬──────┘
        │                  │                      │
┌───────▼──────┐    ┌──────▼──────┐        ┌──────▼──────┐
│  Firebase    │    │  Cloud SQL  │        │  Google     │
│  Auth Engine │    │ (PostgreSQL)│        │  Gemini API │
└──────────────┘    └─────────────┘        └─────────────┘
```

- **Frontend Environment**: Client application runs single-page routing (React Router v7) styled using a custom-tailored Light-first, responsive theme powered by Tailwind CSS. Visual metrics, distributions, and analytics are rendered in high-definition SVG panels via Recharts.
- **Backend Service**: An Express.js backend serves as a highly performant API controller, secure proxy for the Gemini SDK, and host of static production assets.
- **Durable Storage**: Connected to a highly scalable PostgreSQL database (via Cloud SQL and managed with Drizzle ORM) for secure client registries, leads storage, interactive estimates, and revision tracking.
- **Authentication**: Powered by Firebase Auth, supporting both standard credential-based workflows and instant, secure Google Sign-In popups.

---

## ✨ Key Features

### 👤 1. Tailored Login Experience (Client vs. Staff)
We separate the entry points for clients and personnel to optimize usability:
- **Client Portal Login (`/login`)**: Built for prospective homeowners and project leads to access their custom calculations, view blueprints, and interact with the estimating engines.
- **Staff Portal Login (`/login?role=staff` or Footer link)**: Built exclusively for operations staff and estimators to view inbound leads, inspect interactive cost breakdowns, and manage client milestones.

### 📐 2. Interactive Modular Estimator
Provides real-time interactive calculations with custom granular controls:
- **Kitchens, Bathrooms, & Additions**: Dynamic sliders and choice cards calculate material grades, size options, cabinetry quality, layout complexities, and rough structural needs.
- **Interactive Budget Visualization**: Live Recharts charts divide allocations into cabinets, countertops, labor, flooring, and permits dynamically as choices change.

### 💬 3. Fully Functional AI Design Assistant
- Uses the server-side **Google Gemini API** (`@google/genai`) to provide expert context-aware remodel consultation.
- Homeowners can query style recommendations, inquire about material choices, and request structural configuration tips tailored to their current project metadata.

### 📊 4. Staff Operations Dashboard (`/admin`)
- Operations specialists can review all submitted estimates, evaluate client profiles, filter leads by status (e.g., Pending, In Progress, Scheduled), and record internal notes or budget alterations.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript 5
- **Build System**: Vite 6 + esbuild 0.25 (Bundling server TS code into optimized CommonJS `.cjs` output)
- **Database / Auth**: Firebase SDK v12 (Web) & Firebase Admin SDK v14 (Node)
- **UI & Iconography**: Tailwind CSS (Utility-first system), Lucide React
- **Animations**: Motion (formerly Framer Motion)

---

## ⚙️ Configuration & Environment Variables

Create a `.env` or configuration file based on `.env.example`. The following environment variables are supported:

```env
# Server-side Secret for Gemini AI Operations
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Web App client configuration is initialized through `firebase-applet-config.json`
# Database instances are managed directly via security rules (firestore.rules)
```

---

## 🚀 Running the Project

### Local Development

1. Ensure package dependencies are installed:
   ```bash
   npm install
   ```
2. Start the development server (runs full-stack Express + Vite):
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1. Compile the production assets and bundle the server:
   ```bash
   npm run build
   ```
   *Note: This command generates static assets inside `/dist` and compiles `/server` files into a single standalone server file `dist/server.cjs` using esbuild.*

2. Run the production server:
   ```bash
   npm run start
   ```

---

## 📁 Key File Structure

```
├── client/                      # Frontend Single-Page Application
│   ├── src/
│   │   ├── components/          # Common components (NavBar, layout structures)
│   │   ├── features/
│   │   │   ├── admin/           # Staff dashboard interfaces, review controls
│   │   │   ├── auth/            # LoginPage, Sign-Up, and state hooks
│   │   │   └── client/          # Modular Estimator, AI Design Assistant
│   │   └── pages/               # Top-level view layouts & LandingPage
├── server/                      # Express Backend API Services
│   ├── src/
│   │   ├── config/              # Admin SDK initialization & Firebase setup
│   │   ├── controllers/         # AI models, Estimates, and Project handlers
│   │   └── routes/              # Route definitions for all endpoints
├── package.json                 # Dependency definitions & Build script orchestrations
└── README.md                    # Core documentation (This file)
```

---

## 🛠️ Recent Production Improvements

- **Mock Data Decoupling**: Completely removed all static frontend mock data fallbacks for client profiles, notification dashboards, active projects, and past completed projects. 
- **User-Auth Persistence Isolation**: Reconfigured data routing controllers so that newly registered clients query only authentic, user-owned database records from the PostgreSQL database, guaranteeing absolute data privacy and starting new clients with a clean, empty state.
- **Robust Git Security**: Updated global `.gitignore` patterns to recursively protect and ignore all environment variable files (`.env`, `.env.*`, and `.env.local`) at any depth within the workspace during commits and pushes.

