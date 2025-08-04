import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTranslationFiltersStore } from '~/stores/features/translation/filters'

describe('useTranslationFiltersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('state', () => {
    it('should initialize with default state', () => {
      const store = useTranslationFiltersStore()

      expect(store.searchValue).toBe('')
      expect(store.dateFrom).toBe('')
      expect(store.dateTo).toBe('')
      expect(store.pageSize).toBe(10)
      expect(store.page).toBe(1)
    })
  })

  describe('actions', () => {
    describe('setFilters', () => {
      it('should set all filters correctly', () => {
        const store = useTranslationFiltersStore()
        const filters = {
          searchValue: 'test search',
          dateFrom: '2024-01-01',
          dateTo: '2024-12-31',
          pageSize: 25,
          page: 3,
        }

        store.setFilters(filters)

        expect(store.searchValue).toBe('test search')
        expect(store.dateFrom).toBe('2024-01-01')
        expect(store.dateTo).toBe('2024-12-31')
        expect(store.pageSize).toBe(25)
        expect(store.page).toBe(3)
      })

      it('should set partial filters correctly', () => {
        const store = useTranslationFiltersStore()

        // Set initial state
        store.setFilters({
          searchValue: 'initial',
          pageSize: 20,
        })

        // Update only some filters
        store.setFilters({
          dateFrom: '2024-01-01',
          page: 2,
        })

        expect(store.searchValue).toBe('initial')
        expect(store.dateFrom).toBe('2024-01-01')
        expect(store.dateTo).toBe('')
        expect(store.pageSize).toBe(20)
        expect(store.page).toBe(2)
      })
    })

    describe('updateSearchValue', () => {
      it('should update search value correctly', () => {
        const store = useTranslationFiltersStore()

        store.updateSearchValue('new search term')

        expect(store.searchValue).toBe('new search term')
      })

      it('should handle empty search value', () => {
        const store = useTranslationFiltersStore()
        store.searchValue = 'previous search'

        store.updateSearchValue('')

        expect(store.searchValue).toBe('')
      })
    })

    describe('updateDateRange', () => {
      it('should update date range correctly', () => {
        const store = useTranslationFiltersStore()

        store.updateDateRange('2024-01-01', '2024-12-31')

        expect(store.dateFrom).toBe('2024-01-01')
        expect(store.dateTo).toBe('2024-12-31')
      })

      it('should handle empty dates', () => {
        const store = useTranslationFiltersStore()

        store.updateDateRange('', '')

        expect(store.dateFrom).toBe('')
        expect(store.dateTo).toBe('')
      })
    })

    describe('updatePageSize', () => {
      it('should update page size correctly', () => {
        const store = useTranslationFiltersStore()

        store.updatePageSize(25)

        expect(store.pageSize).toBe(25)
      })

      it('should reset page to 1 when changing page size', () => {
        const store = useTranslationFiltersStore()

        // Set initial page
        store.page = 5
        expect(store.page).toBe(5)

        // Change page size
        store.updatePageSize(50)

        expect(store.pageSize).toBe(50)
        expect(store.page).toBe(1)
      })

      it('should handle different page sizes', () => {
        const store = useTranslationFiltersStore()

        store.updatePageSize(10)
        expect(store.pageSize).toBe(10)
        expect(store.page).toBe(1)

        store.updatePageSize(25)
        expect(store.pageSize).toBe(25)
        expect(store.page).toBe(1)

        store.updatePageSize(50)
        expect(store.pageSize).toBe(50)
        expect(store.page).toBe(1)
      })
    })

    describe('updatePage', () => {
      it('should update page correctly', () => {
        const store = useTranslationFiltersStore()

        store.updatePage(3)

        expect(store.page).toBe(3)
      })

      it('should handle different page numbers', () => {
        const store = useTranslationFiltersStore()

        store.updatePage(1)
        expect(store.page).toBe(1)

        store.updatePage(5)
        expect(store.page).toBe(5)

        store.updatePage(10)
        expect(store.page).toBe(10)
      })
    })

    describe('clearFilters', () => {
      it('should reset all filters to default values', () => {
        const store = useTranslationFiltersStore()

        // Set some custom values
        store.setFilters({
          searchValue: 'test',
          dateFrom: '2024-01-01',
          dateTo: '2024-12-31',
          pageSize: 25,
          page: 5,
        })

        // Clear filters
        store.clearFilters()

        expect(store.searchValue).toBe('')
        expect(store.dateFrom).toBe('')
        expect(store.dateTo).toBe('')
        expect(store.pageSize).toBe(10)
        expect(store.page).toBe(1)
      })

      it('should work when filters are already at default values', () => {
        const store = useTranslationFiltersStore()

        store.clearFilters()

        expect(store.searchValue).toBe('')
        expect(store.dateFrom).toBe('')
        expect(store.dateTo).toBe('')
        expect(store.pageSize).toBe(10)
        expect(store.page).toBe(1)
      })
    })
  })

  describe('state updates', () => {
    it('should maintain state between actions', () => {
      const store = useTranslationFiltersStore()

      // Set initial state
      store.setFilters({
        searchValue: 'initial search',
        pageSize: 25,
        page: 3,
      })

      expect(store.searchValue).toBe('initial search')
      expect(store.pageSize).toBe(25)
      expect(store.page).toBe(3)

      // Update individual properties
      store.updateSearchValue('updated search')
      store.updateDateRange('2024-01-01', '2024-12-31')
      store.updatePage(5)

      expect(store.searchValue).toBe('updated search')
      expect(store.dateFrom).toBe('2024-01-01')
      expect(store.dateTo).toBe('2024-12-31')
      expect(store.pageSize).toBe(25)
      expect(store.page).toBe(5)
    })

    it('should handle multiple rapid updates', () => {
      const store = useTranslationFiltersStore()

      // Multiple search updates
      store.updateSearchValue('search 1')
      store.updateSearchValue('search 2')
      store.updateSearchValue('search 3')

      expect(store.searchValue).toBe('search 3')

      // Multiple page updates
      store.updatePage(1)
      store.updatePage(2)
      store.updatePage(3)

      expect(store.page).toBe(3)

      // Multiple page size updates
      store.updatePageSize(10)
      store.updatePageSize(25)
      store.updatePageSize(50)

      expect(store.pageSize).toBe(50)
      expect(store.page).toBe(1) // Should reset to 1
    })
  })
})
