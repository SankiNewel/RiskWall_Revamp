# RiskWall UI

RiskWall UI is a modern, high-performance web application designed for real-time risk monitoring and alert management. It features a clean, professional "white card" interface built according to the **Nuvama Design System**.

## 🚀 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS & Vanilla CSS (Custom Variable Theme)
- **Typography**: DM Sans (Google Fonts)
- **State Management**: React Query (TanStack Query)
- **Validation**: Zod
- **Type Safety**: Strict TypeScript

## 🎨 Design System

The application uses a refined palette for clarity and precision:
- **Primary Blue**: `#6374D4` (Actions, Headers, Navigation)
- **Destructive Red**: `#F04E45` (Deletions, Critical Alerts)
- **Success Green**: `#10B981` (Toggles, Success states)
- **Typography**: Focused on readability with DM Sans for all UI elements.
- **Aesthetic**: White cards with soft shadows on a subtle gray background.

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Development
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Build
Generate a production-ready build:
```bash
npm run build
```

## 📂 Project Structure

- `src/app/` - Main application logic and layout
- `src/app/components/` - Reusable UI components and feature-specific panels
- `src/styles/` - Global styles, theme variables, and Tailwind configuration
- `brain/` - Design system guidelines and implementation documentation

## 📝 Recent Updates

- **Tech Stack Upgrade**: Migrated to React 19 and implemented React Query for efficient data fetching.
- **Design Overhaul**: Transitioned from a legacy dark theme to the modern Nuvama "white card" design.
- **Improved UX**: Enhanced interactive states (hover, focus, transitions) across all buttons, inputs, and tables.
- **Layout Optimization**: Fixed component placement and ensured full-width responsiveness for all management panels.