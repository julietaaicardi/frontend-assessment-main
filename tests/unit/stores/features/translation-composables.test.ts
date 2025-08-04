import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTranslationCoordination } from '~/stores/features/translation/composables'
import { mockTranslationKeys } from '~/tests/utils/test-utils'

// Mock the stores
vi.mock('~/stores/features/translation/table')
vi.mock('~/stores/features/translation/filters')
vi.mock('~/stores/root')

describe('useTranslationCoordination', () => {
  let mockTableStore: any
  let mockFiltersStore: any
  let mockRootStore: any

  beforeEach(async () => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    // Create mock stores with reactive properties
    mockTableStore = {
      keys: [],
      totalCount: 0,
      fetchKeys: vi.fn(),
    }

    mockFiltersStore = {
      searchValue: '',
      dateFrom: '',
      dateTo: '',
      pageSize: 10,
      page: 1,
      updateSearchValue: vi.fn(),
      updateDateRange: vi.fn(),
      updatePageSize: vi.fn(),
      updatePage: vi.fn(),
    }

    mockRootStore = {
      isLoading: false,
      error: null,
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearError: vi.fn(),
    }

    // Setup mocks
    const { useTranslationTableStore } = await import(
      '~/stores/features/translation/table'
    )
    const { useTranslationFiltersStore } = await import(
      '~/stores/features/translation/filters'
    )
    const { useRootStore } = await import('~/stores/root')

    vi.mocked(useTranslationTableStore).mockReturnValue(mockTableStore)
    vi.mocked(useTranslationFiltersStore).mockReturnValue(mockFiltersStore)
    vi.mocked(useRootStore).mockReturnValue(mockRootStore)
  })

  describe('store references', () => {
    it('should return store references', () => {
      const coordination = useTranslationCoordination()

      expect(coordination.tableStore).toBe(mockTableStore)
      expect(coordination.filtersStore).toBe(mockFiltersStore)
      expect(coordination.rootStore).toBe(mockRootStore)
    })
  })

  describe('paginationInfo computed', () => {
    it('should return pagination info object', () => {
      const coordination = useTranslationCoordination()

      expect(coordination.paginationInfo).toBeDefined()
      expect(typeof coordination.paginationInfo).toBe('object')
    })

    it('should access store properties for pagination calculation', () => {
      const coordination = useTranslationCoordination()

      // The computed property should access the store properties
      expect(coordination.tableStore.totalCount).toBe(0)
      expect(coordination.filtersStore.page).toBe(1)
      expect(coordination.filtersStore.pageSize).toBe(10)
    })
  })

  describe('fetchKeys action', () => {
    it('should fetch keys successfully', async () => {
      const mockResponse = {
        data: mockTranslationKeys,
        meta: { filter_count: 5 },
      }
      mockTableStore.fetchKeys.mockResolvedValue(mockResponse)

      const coordination = useTranslationCoordination()

      await coordination.fetchKeys()

      expect(mockRootStore.setLoading).toHaveBeenCalledWith(true)
      expect(mockRootStore.clearError).toHaveBeenCalled()
      expect(mockTableStore.fetchKeys).toHaveBeenCalledWith({
        searchValue: '',
        dateFrom: '',
        dateTo: '',
        page: 1,
        pageSize: 10,
      })
      expect(mockRootStore.setLoading).toHaveBeenCalledWith(false)
    })

    it('should handle API errors correctly', async () => {
      const error = new Error('API Error')
      mockTableStore.fetchKeys.mockRejectedValue(error)

      const coordination = useTranslationCoordination()

      await expect(coordination.fetchKeys()).rejects.toThrow('API Error')

      expect(mockRootStore.setLoading).toHaveBeenCalledWith(true)
      expect(mockRootStore.clearError).toHaveBeenCalled()
      expect(mockRootStore.setError).toHaveBeenCalledWith('API Error')
      expect(mockRootStore.setLoading).toHaveBeenCalledWith(false)
    })

    it('should handle non-Error objects', async () => {
      const error = 'String error'
      mockTableStore.fetchKeys.mockRejectedValue(error)

      const coordination = useTranslationCoordination()

      await expect(coordination.fetchKeys()).rejects.toBe(error)

      expect(mockRootStore.setError).toHaveBeenCalledWith(
        'Failed to fetch translation keys'
      )
    })

    it('should pass correct filters to fetchKeys', async () => {
      mockFiltersStore.searchValue = 'test search'
      mockFiltersStore.dateFrom = '2024-01-01'
      mockFiltersStore.dateTo = '2024-12-31'
      mockFiltersStore.page = 3
      mockFiltersStore.pageSize = 25

      mockTableStore.fetchKeys.mockResolvedValue({
        data: [],
        meta: { filter_count: 0 },
      })

      const coordination = useTranslationCoordination()

      await coordination.fetchKeys()

      expect(mockTableStore.fetchKeys).toHaveBeenCalledWith({
        searchValue: 'test search',
        dateFrom: '2024-01-01',
        dateTo: '2024-12-31',
        page: 3,
        pageSize: 25,
      })
    })
  })

  describe('filter update actions', () => {
    it('should update search value', async () => {
      const coordination = useTranslationCoordination()

      await coordination.updateSearchValue('new search')

      expect(mockFiltersStore.updateSearchValue).toHaveBeenCalledWith(
        'new search'
      )
    })

    it('should update date range', async () => {
      const coordination = useTranslationCoordination()

      await coordination.updateDateRange('2024-01-01', '2024-12-31')

      expect(mockFiltersStore.updateDateRange).toHaveBeenCalledWith(
        '2024-01-01',
        '2024-12-31'
      )
    })

    it('should update page size', async () => {
      const coordination = useTranslationCoordination()

      await coordination.updatePageSize(25)

      expect(mockFiltersStore.updatePageSize).toHaveBeenCalledWith(25)
    })

    it('should update page', async () => {
      const coordination = useTranslationCoordination()

      await coordination.updatePage(3)

      expect(mockFiltersStore.updatePage).toHaveBeenCalledWith(3)
    })
  })

  describe('error handling', () => {
    it('should ensure loading is set to false even if error occurs', async () => {
      const error = new Error('Test error')
      mockTableStore.fetchKeys.mockRejectedValue(error)

      const coordination = useTranslationCoordination()

      try {
        await coordination.fetchKeys()
      } catch (e) {
        // Expected to throw
      }

      expect(mockRootStore.setLoading).toHaveBeenCalledWith(true)
      expect(mockRootStore.setLoading).toHaveBeenCalledWith(false)
    })

    it('should clear error before making new request', async () => {
      mockTableStore.fetchKeys.mockResolvedValue({
        data: [],
        meta: { filter_count: 0 },
      })

      const coordination = useTranslationCoordination()

      await coordination.fetchKeys()

      expect(mockRootStore.clearError).toHaveBeenCalled()
    })
  })
})
