# Type Organization

This directory contains all TypeScript types used throughout the application, organized by their purpose and scope.

## Structure

```
types/
├── api/                    # API-related types
│   ├── requests.ts        # Request payloads and query parameters
│   ├── responses.ts       # Response types and data structures
│   └── errors.ts          # Error types and error handling
├── domain/                # Domain/business logic types
│   └── translation.ts     # Translation domain types and entities
├── ui/                    # UI component types
│   └── table.ts          # Table component types and interfaces
└── index.ts              # Main type exports (barrel exports)
```

## Type Categories

### Domain Types (`domain/`)
- **Purpose**: Business logic and domain entities
- **Scope**: Application-wide domain concepts
- **Examples**: `TranslationKey`, `DirectusTranslation`, `PaginationState`

### API Types (`api/`)
- **Purpose**: API communication and data transfer
- **Scope**: Request/response structures and error handling
- **Examples**: `TranslationKeysQueryParams`, `TranslationKeysResponse`, `ApiError`

### UI Types (`ui/`)
- **Purpose**: UI component interfaces and props
- **Scope**: Component-specific types and UI state
- **Examples**: `Column`, `Row`, `TableProps`

## Usage

### Importing Types

Use the barrel export for most cases:
```typescript
import type { TranslationKey, Column, ApiError } from '~/types'
```

For specific categories:
```typescript
import type { TranslationKeysQueryParams } from '~/types/api/requests'
import type { DirectusTranslation } from '~/types/domain/translation'
import type { TableProps } from '~/types/ui/table'
```

### Adding New Types

1. **Domain Types**: Add to `domain/` directory
2. **API Types**: Add to appropriate `api/` file
3. **UI Types**: Add to appropriate `ui/` file
4. **Update exports**: Add to `index.ts` if needed across modules

### Best Practices

- Keep types **cohesive** and **single-purpose**
- Use **composition** over inheritance
- **Export types** that are used across multiple modules
- **Keep internal types** private to their modules
- Use **descriptive names** that indicate the type's purpose
- Add **JSDoc comments** for complex types 