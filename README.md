<img src="assets/images/goose.png" class="goose" style="width: 128px; height: 128px"/>

# Translation Keys Manager

A scalable Nuxt 3 application for managing translation keys and their values across different locales.

## Project Structure

This project follows Nuxt 3 best practices for scalability and maintainability:

```
frontend-assessment-main/
├── assets/
│   └── scss/
│       ├── _variables.scss    # SCSS variables (colors, typography, spacing)
│       ├── _mixins.scss       # Responsive utilities and common patterns
│       ├── _tokens.scss       # CSS custom properties (theme tokens)
│       └── main.scss          # Global styles and imports
├── layouts/
│   └── default.vue           # Default layout with header, main, footer
├── pages/
│   └── index.vue             # Translation keys management page
├── public/                   # Static assets
├── types.d.ts               # TypeScript type definitions
└── nuxt.config.ts           # Nuxt configuration
```

## Features

### Current Implementation

- **Responsive Layout**: Mobile-first design with breakpoint-based responsive behavior
- **Modern SCSS Architecture**:
  - CSS custom properties for theming
  - Responsive mixins using `clamp()`, `min()`, `max()`
  - Semantic variable naming
- **Accessibility**: Proper ARIA labels, semantic HTML, focus management
- **TypeScript**: Full TypeScript support with proper type definitions

### Page Layout Structure

1. **Header Section**:
   - Search bar for filtering keys
   - Filter controls (Updated at, Page size)
   - Date range filter with From/To inputs
2. **Main Content**:
   - Total keys display (15.000 Keys)
   - Data table with Key, Translation, Updated At columns
   - 5 placeholder rows with sample data
3. **Footer**:
   - Pagination information
   - Navigation arrows (Previous/Next)

### Responsive Behavior

- **Large screens**: Filters display in one row
- **Small screens**: Filters stack vertically
- **Table**: Responsive with proper text truncation
- **Typography**: Fluid scaling using `clamp()` functions

## Technical Stack

- **Framework**: Nuxt 3
- **Styling**: SCSS with CSS custom properties
- **Language**: TypeScript
- **Build Tool**: Vite (via Nuxt)

## Environment Setup

1. **Copy environment file**:

   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables**:
   - `NUXT_PUBLIC_API_BASE_URL`: API base URL (default: https://directus.altura.io)
   - `NUXT_PUBLIC_API_TIMEOUT`: API timeout in milliseconds (default: 10000)
   - `NODE_ENV`: Environment (development/production)

## Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```
