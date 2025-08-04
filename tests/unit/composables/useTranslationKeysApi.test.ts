import { describe, it, expect, vi } from 'vitest'
import { useTranslationKeysApi } from '~/composables/useTranslationKeysApi'

// Mock the API client
vi.mock('~/composables/api/client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('useTranslationKeysApi', () => {
  it('should provide translation keys API functionality', () => {
    const { fetchTranslationKeys } = useTranslationKeysApi()

    expect(fetchTranslationKeys).toBeDefined()
    expect(typeof fetchTranslationKeys).toBe('function')
  })
})
