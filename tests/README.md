# Testing

This directory contains all the tests for the application, organized by type and feature.

## Directory Structure

```
tests/
├── setup.ts                    # Global test setup and configuration
├── utils/
│   └── test-utils.ts          # Common test utilities and helpers
└── unit/                       # Unit tests
    ├── components/             # Component tests
    │   ├── ui/                # UI component tests
    │   │   ├── Button.test.ts
    │   │   ├── Input.test.ts
    │   │   └── DatePicker.test.ts
    │   └── features/          # Feature component tests
    │       └── translation/
    ├── composables/            # Composable tests
    │   ├── useTranslationKeysApi.test.ts
    │   └── api/
    ├── stores/                 # Store tests
    │   └── features/
    │       └── translation-table.test.ts
    └── utils/                  # Utility function tests
        ├── date.test.ts
        └── language.test.ts
```

## Running Tests

### All Tests

```bash
npm test
```

### Tests with UI

```bash
npm run test:ui
```

### Run Tests Once

```bash
npm run test:run
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## Test Configuration

The test configuration is defined in `vitest.config.ts` at the root of the project. It includes:

- Vue plugin for component testing
- JSDOM environment for DOM testing
- Global setup file (`tests/setup.ts`)
- Path aliases for imports
- Coverage configuration

## Test Utilities

Common test utilities are available in `tests/utils/test-utils.ts`:

- `renderWithPinia()` - Render components with Pinia store
- `mockApiResponse` - Mock API response helpers
- `mockTranslationKeys` - Mock translation data
- `mockTranslationStore` - Mock store state
- `fireEvent` - Event firing helpers

## Writing Tests

### Component Tests

Use `@testing-library/vue` for component testing:

```typescript
import { render, fireEvent } from '@testing-library/vue'
import Button from '~/components/ui/Button.vue'

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button, {
      props: { label: 'Click me' },
    })

    expect(getByRole('button')).toBeInTheDocument()
  })
})
```

### Composable Tests

Test composables with mocked dependencies:

```typescript
import { useTranslationKeysApi } from '~/composables/useTranslationKeysApi'

vi.mock('~/composables/api/services/translationKeys', () => ({
  translationKeysService: { fetch: vi.fn() },
}))

describe('useTranslationKeysApi', () => {
  it('should fetch translation keys', async () => {
    // Test implementation
  })
})
```

### Store Tests

Test Pinia stores with proper setup:

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useTranslationTableStore } from '~/stores/features/translation/table'

describe('useTranslationTableStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default state', () => {
    const store = useTranslationTableStore()
    expect(store.keys).toEqual([])
  })
})
```

### Utility Tests

Test pure functions directly:

```typescript
import { formatRelativeTime } from '~/utils/date'

describe('formatRelativeTime', () => {
  it('should return "today" for current date', () => {
    const result = formatRelativeTime('2024-01-15')
    expect(result).toBe('today')
  })
})
```

## Best Practices

1. **Test Structure**: Use describe blocks to group related tests
2. **Naming**: Use descriptive test names that explain the expected behavior
3. **Mocking**: Mock external dependencies and APIs
4. **Coverage**: Aim for high test coverage, especially for critical paths
5. **Isolation**: Each test should be independent and not rely on other tests
6. **Cleanup**: Use `beforeEach` and `afterEach` for setup and cleanup

## Adding New Tests

When adding new tests:

1. Create the test file in the appropriate directory
2. Follow the existing naming convention (`*.test.ts`)
3. Import the necessary testing utilities
4. Write comprehensive tests covering all scenarios
5. Update this README if adding new test categories

## Test Coverage

The test coverage report shows:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

Run `npm run test:coverage` to generate a detailed coverage report.
