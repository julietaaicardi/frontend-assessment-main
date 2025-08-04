# Translation Keys Manager

A scalable Nuxt 3 application for managing translation keys and their values across different locales. Built with modern web technologies and comprehensive testing.

## Project Structure

This project follows Nuxt 3 best practices for scalability and maintainability:

```
frontend-assessment-main/
├── assets/
│   ├── images/              # Static images and icons
│   └── scss/
│       ├── abstracts/       # SCSS variables, mixins, functions
│       ├── mixins/          # Responsive utilities and patterns
│       ├── tokens/          # CSS custom properties (theme tokens)
│       └── main.scss        # Global styles and imports
├── components/
│   ├── features/            # Feature-specific components
│   │   └── translation/     # Translation management components
│   ├── shared/              # Shared components across features
│   │   └── filters/         # Reusable filter components
│   └── ui/                  # Base UI components
│       └── Table/           # Table component system
├── composables/
│   ├── api/                 # API client and services
│   │   ├── client.ts        # Axios client configuration
│   │   └── services/        # API service modules
│   └── useTranslationKeysApi.ts  # Translation API composable
├── layouts/
│   └── default.vue          # Default layout with header, main, footer
├── pages/
│   ├── index.vue            # Translation keys management page
│   └── original.vue         # Original implementation page
├── server/
│   └── api/                 # Server-side API endpoints
├── stores/
│   ├── features/            # Feature-specific stores
│   │   └── translation/     # Translation state management
│   └── root.ts              # Root store configuration
├── tests/
│   ├── unit/                # Unit tests
│   │   ├── components/      # Component tests
│   │   ├── composables/     # Composable tests
│   │   └── stores/          # Store tests
│   └── utils/               # Test utilities
├── types/
│   ├── api/                 # API type definitions
│   ├── domain/              # Domain type definitions
│   ├── stores/              # Store type definitions
│   └── ui/                  # UI component types
├── views/
│   └── translation/         # Translation view components
├── public/                  # Static assets
├── nuxt.config.ts           # Nuxt configuration
├── vitest.config.ts         # Test configuration
├── eslint.config.js         # ESLint configuration
├── .prettierrc              # Prettier configuration
└── tsconfig.json            # TypeScript configuration
```

## Technical Stack

### Core Framework

- **Nuxt 3**: Full-stack Vue.js framework
- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Static type checking

### State Management & Data

- **Pinia**: Vue state management library
- **Axios**: HTTP client for API requests
- **VuePic DatePicker**: Advanced date handling

### Styling & UI

- **SCSS**: Advanced CSS preprocessor
- **CSS Custom Properties**: Theme tokens and variables
- **Responsive Design**: Mobile-first approach

### Testing & Quality

- **Vitest**: Fast unit testing framework
- **Vue Test Utils**: Vue component testing
- **Testing Library**: User-centric testing utilities
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality assurance

### Development Tools

- **Vite**: Fast build tool (via Nuxt)
- **Vue Router**: Client-side routing
- **Sass**: SCSS compilation

## Environment Setup

1. **Copy environment file**

   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables**:

   ```env
   # API Configuration
   NUXT_PUBLIC_API_BASE_URL=https://directus.altura.io
   NUXT_PUBLIC_API_TIMEOUT=10000

   # Environment
   NODE_ENV=development
   ```

## Setup

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```

**Run tests:**

```bash
npm test
```

**Build for production:**

```bash
npm run build
```

**Type checking:**

```bash
npm run type-check
```

**Linting:**

```bash
npm run lint
```

**Format code:**

```bash
npm run format
```

**Run all checks (type checking and linting):**

```bash
npm run check
```

### Pre-commit Hooks

The project uses Husky with lint-staged to ensure code quality:

- Automatic ESLint fixes
- Prettier formatting
- TypeScript type checking

> **Note**: Under normal circumstances, these quality checks (as well as running tests) would ideally be performed in a CI/CD pipeline before merging branches to ensure consistent validation across all team members and environments. For the purpose of this assessment, however, I’ve implemented these checks using Husky pre-commit hooks to demonstrate code quality practices and provide immediate feedback during development.
