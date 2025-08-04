import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRootStore } from '~/stores/root'

describe('useRootStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('state', () => {
    it('should initialize with default state', () => {
      const store = useRootStore()

      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
    })
  })

  describe('getters', () => {
    it('should return false when error is null', () => {
      const store = useRootStore()
      store.error = null

      expect(store.hasError).toBe(false)
    })

    it('should return true when error is not null', () => {
      const store = useRootStore()
      store.error = 'Some error message'

      expect(store.hasError).toBe(true)
    })

    it('should return true when error is empty string', () => {
      const store = useRootStore()
      store.error = ''

      expect(store.hasError).toBe(true)
    })
  })

  describe('actions', () => {
    it('should set loading state correctly', () => {
      const store = useRootStore()

      // Initially false
      expect(store.isLoading).toBe(false)

      // Set to true
      store.setLoading(true)
      expect(store.isLoading).toBe(true)

      // Set to false
      store.setLoading(false)
      expect(store.isLoading).toBe(false)
    })

    it('should set error correctly', () => {
      const store = useRootStore()

      // Initially null
      expect(store.error).toBe(null)

      // Set error message
      const errorMessage = 'Something went wrong'
      store.setError(errorMessage)
      expect(store.error).toBe(errorMessage)
      expect(store.hasError).toBe(true)

      // Set to null
      store.setError(null)
      expect(store.error).toBe(null)
      expect(store.hasError).toBe(false)
    })

    it('should clear error correctly', () => {
      const store = useRootStore()

      // Set initial error
      store.setError('Some error')
      expect(store.error).toBe('Some error')
      expect(store.hasError).toBe(true)

      // Clear error
      store.clearError()
      expect(store.error).toBe(null)
      expect(store.hasError).toBe(false)
    })
  })

  describe('state updates', () => {
    it('should maintain state between actions', () => {
      const store = useRootStore()

      // Set initial state
      store.setLoading(true)
      store.setError('Initial error')

      expect(store.isLoading).toBe(true)
      expect(store.error).toBe('Initial error')
      expect(store.hasError).toBe(true)

      // Update state
      store.setLoading(false)
      store.clearError()

      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
      expect(store.hasError).toBe(false)
    })

    it('should handle multiple state changes', () => {
      const store = useRootStore()

      // Multiple loading changes
      store.setLoading(true)
      expect(store.isLoading).toBe(true)

      store.setLoading(false)
      expect(store.isLoading).toBe(false)

      store.setLoading(true)
      expect(store.isLoading).toBe(true)

      // Multiple error changes
      store.setError('Error 1')
      expect(store.error).toBe('Error 1')

      store.setError('Error 2')
      expect(store.error).toBe('Error 2')

      store.clearError()
      expect(store.error).toBe(null)
    })
  })
})
