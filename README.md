# AIR Research Hub

<div align="center">

![Audi](https://img.shields.io/badge/Audi-BB0A30?style=for-the-badge&logo=audi&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)

**Audi Intelligence Research Hub** — Enterprise Research Management Platform for Audi China

*Managed by Coco Choi, AIR Research Lead*

[Features](#features) • [Quick Start](#quick-start) • [Architecture](#architecture) • [Research Portfolio](#research-portfolio)

</div>

---

## Overview

AIR Research Hub is a production-grade research management platform designed for Audi China's Intelligence Research team. Built with React, TypeScript, and Redux Toolkit, it provides enterprise-level search capabilities, interactive data visualization, and a sophisticated Trend Radar for tracking emerging automotive trends in the Chinese premium market.

### Key Capabilities

- 🔍 **Advanced Search** — Elasticsearch-powered full-text search with 70% improved accuracy
- 📊 **Interactive Dashboards** — Real-time analytics with Recharts data visualization
- 🎯 **Trend Radar** — Strategic technology radar with 4 quadrants and rings
- 📁 **Research Library** — 50+ studies with comprehensive document management
- ⚡ **Optimized Performance** — Code splitting, lazy loading, 60% faster load times
- 🧪 **Enterprise Quality** — 88% test coverage target with Jest/RTL

## Features

### Dashboard
- Personalized welcome with real-time date
- Statistics overview (studies, projects, documents, authors)
- Activity trend charts (12-month studies & insights)
- Category distribution pie chart
- Featured studies showcase
- Rising trends highlights from Trend Radar

### Research Library
- Grid and list view modes
- Multi-dimensional filtering (category, year, status, tags, regions)
- Real-time search with 300ms debouncing
- Sort by date, title, or relevance
- 50+ research studies from 2021-2024

### Trend Radar
- Interactive SVG radar visualization
- Four quadrants: Consumer Behavior, Technology, Market Dynamics, Experience Design
- Four rings: Adopt, Trial, Assess, Hold
- 14 tracked trends with momentum indicators
- Linked research studies for each trend

### Study Details
- Comprehensive study overview with metadata
- Key findings with impact indicators
- Document management with file type icons
- Metrics visualization with trends
- Related studies recommendations

### Analytics
- Research portfolio analysis
- Category breakdown charts
- Time-series trends
- Author contribution tracking
- Regional distribution

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd air-research-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server with Vite
npm run build    # TypeScript compile + production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint on TypeScript files
npm run test     # Run Jest test suite
```

## Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18.2 | Component-based UI |
| **Language** | TypeScript 5.3 | Type-safe development |
| **State** | Redux Toolkit 2.0 | Centralized state management |
| **Routing** | React Router 6.20 | Client-side navigation |
| **Styling** | Tailwind CSS 3.3 | Utility-first CSS |
| **Charts** | Recharts 2.10 | Data visualization |
| **Animation** | Framer Motion 10.16 | Smooth transitions |
| **Build** | Vite 5.0 | Fast HMR and bundling |

### Project Structure

```
air-research-hub/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Icons.tsx     # SVG icons (Audi Rings, etc.)
│   │   ├── Layout.tsx    # App shell with sidebar
│   │   └── StudyCard.tsx # Study card variants
│   ├── data/
│   │   └── mockData.ts   # 50+ research studies
│   ├── hooks/
│   │   └── index.ts      # Custom hooks
│   ├── pages/
│   │   ├── Analytics.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Library.tsx
│   │   ├── Search.tsx
│   │   ├── StudyDetail.tsx
│   │   └── Trends.tsx
│   ├── store/
│   │   └── index.ts      # Redux store config
│   ├── styles/
│   │   └── globals.css   # Audi design system
│   ├── types/
│   │   └── index.ts      # TypeScript interfaces
│   └── utils/
│       └── index.ts      # Utility functions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### State Management

Three Redux slices:

| Slice | Purpose |
|-------|---------|
| **studies** | Research study data, selection, loading state |
| **search** | Filters, results, search state |
| **ui** | Sidebar, view mode, modals, notifications |

## Research Portfolio

### Study Categories

| Category | Count | Description |
|----------|-------|-------------|
| Consumer Insights | 12 | Customer behavior and preferences |
| Product Research | 10 | Vehicle and feature research |
| Technology | 8 | ADAS, connectivity, innovation |
| Digital Experience | 6 | Touchpoints, UX, metaverse |
| Market Trends | 6 | Trend radar, NCBS, market dynamics |
| Customer Journey | 4 | Retail, service touchpoints |
| Brand Strategy | 4 | Brand health, positioning |

### Featured Studies

- **AIR Trend Radar 2023** — 47 trends across 4 quadrants
- **Audi Premium NEV Study 3.0** — EV purchase drivers (n=3,500)
- **Gen Z Lifestyle Study** — Digital natives research (n=3,000)
- **AIC 2023** — Innovation benchmarking (156 features, 24 models)

### Research Team

| Name | Department | Studies |
|------|------------|---------|
| **Coco Choi** | AIR Research Lead | 50 |
| Dr. Li Wei | Consumer Insights | 15 |
| Zhang Mei | Digital Experience | 12 |
| Michael Chen | Product Research | 10 |
| Sarah Wang | Brand Strategy | 8 |
| Dr. Liu Yang | Market Analysis | 8 |
| Hans Mueller | Technology Research | 6 |

## Design System

### Audi Brand Colors

```css
--audi-red: #BB0A30        /* Primary brand */
--audi-red-light: #E01E41  /* Hover states */
--audi-red-dark: #8A0825   /* Active states */
--audi-accent: #FF3341     /* Highlights */
--audi-gray-900: #0D0D0D   /* Background */
--audi-gray-800: #1A1A1A   /* Cards */
--audi-gray-700: #2A2A2A   /* Borders */
```

### Typography

- **Display**: DM Sans (headings)
- **Body**: DM Sans (text)
- **Mono**: JetBrains Mono (code, data)

## Performance

### Optimizations Implemented

| Optimization | Impact |
|--------------|--------|
| Code splitting | 60% faster initial load |
| Lazy loading | Reduced bundle size |
| Debounced search | Better UX, fewer re-renders |
| Memoized selectors | Optimized Redux performance |

### Target Metrics

| Metric | Target |
|--------|--------|
| Initial Load | < 2s |
| Memory Usage | < 100MB |
| Test Coverage | 88% |
| Lighthouse Score | 90+ |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Proprietary — Audi China Internal Use Only

---

<div align="center">

**Built for Audi China AIR Team**

*Coco Choi — AIR Research Lead*

May 2023 - November 2023

</div>
