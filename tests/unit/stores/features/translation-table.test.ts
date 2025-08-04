import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTranslationTableStore } from '~/stores/features/translation/table'
import { mockTranslationKeys } from '~/tests/utils/test-utils'

// Mock the translation keys service
vi.mock('~/composables/api/services/translationKeys', () => ({
  translationKeysService: {
    fetch: vi.fn(),
  },
}))

// Mock the useTranslationKeysApi composable
vi.mock('~/composables/useTranslationKeysApi', () => ({
  useTranslationKeysApi: vi.fn(),
}))

describe('useTranslationTableStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('state', () => {
    it('should initialize with default state', () => {
      const store = useTranslationTableStore()

      expect(store.keys).toEqual([])
      expect(store.totalCount).toBe(0)
    })
  })

  describe('getters', () => {
    it('should return true when keys array is empty', () => {
      const store = useTranslationTableStore()
      store.keys = []

      expect(store.isEmpty).toBe(true)
    })

    it('should return false when keys array has items', () => {
      const store = useTranslationTableStore()
      store.keys = mockTranslationKeys

      expect(store.isEmpty).toBe(false)
    })
  })

  describe('actions', () => {
    it('should set keys correctly', () => {
      const store = useTranslationTableStore()
      const testKeys = mockTranslationKeys

      store.setKeys(testKeys)

      expect(store.keys).toEqual(testKeys)
    })

    it('should set meta correctly', () => {
      const store = useTranslationTableStore()
      const totalCount = 42

      store.setMeta(totalCount)

      expect(store.totalCount).toBe(totalCount)
    })
  })

  describe('state updates', () => {
    it('should update isEmpty getter when keys change', () => {
      const store = useTranslationTableStore()

      // Initially empty
      expect(store.isEmpty).toBe(true)

      // Add keys
      store.setKeys(mockTranslationKeys)
      expect(store.isEmpty).toBe(false)

      // Clear keys
      store.setKeys([])
      expect(store.isEmpty).toBe(true)
    })

    it('should maintain state between actions', () => {
      const store = useTranslationTableStore()

      // Set initial state
      store.setKeys(mockTranslationKeys)
      store.setMeta(5)

      expect(store.keys).toEqual(mockTranslationKeys)
      expect(store.totalCount).toBe(5)
      expect(store.isEmpty).toBe(false)

      // Update state
      const newKeys = [mockTranslationKeys[0]]
      store.setKeys(newKeys)
      store.setMeta(1)

      expect(store.keys).toEqual(newKeys)
      expect(store.totalCount).toBe(1)
      expect(store.isEmpty).toBe(false)
    })
  })
})
