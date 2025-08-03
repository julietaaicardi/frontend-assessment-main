import { defineStore } from 'pinia'
import type { DirectusTranslation, FilterState } from '~/types/domain/translation'
import type { TranslationKeysResponse } from '~/types/api/responses'

export interface TranslationState {
  keys: DirectusTranslation[]
  filters: FilterState
  totalCount: number
  filterCount: number
}

export const useTranslationStore = defineStore('translation', {
  state: (): TranslationState => ({
    keys: [],
    filters: {
      searchValue: '',
      dateFrom: '',
      dateTo: '',
      pageSize: 10,
      page: 1
    },
    totalCount: 0,
    filterCount: 0
  }),

  getters: {
    hasKeys: (state) => state.keys.length > 0,
    hasFilters: (state) => {
      return state.filters.searchValue || state.filters.dateFrom || state.filters.dateTo
    },
    filteredKeys: (state) => {
      if (!state.filters.searchValue) return state.keys
      
      return state.keys.filter(key => 
        key.key.toLowerCase().includes(state.filters.searchValue.toLowerCase())
      )
    },
    totalPages: (state) => {
      return Math.ceil(state.totalCount / state.filters.pageSize)
    },
    currentPageRange: (state) => {
      const start = (state.filters.page - 1) * state.filters.pageSize + 1
      const end = Math.min(state.filters.page * state.filters.pageSize, state.totalCount)
      return { start, end }
    },
    hasNextPage: (state) => {
      return state.filters.page < Math.ceil(state.totalCount / state.filters.pageSize)
    },
    hasPreviousPage: (state) => {
      return state.filters.page > 1
    },
    paginationInfo: (state) => {
      const totalPages = Math.ceil(state.totalCount / state.filters.pageSize)
      const start = (state.filters.page - 1) * state.filters.pageSize + 1
      const end = Math.min(state.filters.page * state.filters.pageSize, state.totalCount)
      
      return {
        currentPage: state.filters.page,
        totalPages,
        totalItems: state.totalCount,
        itemsPerPage: state.filters.pageSize,
        start,
        end,
        hasNext: state.filters.page < totalPages,
        hasPrevious: state.filters.page > 1
      }
    }
  },

  actions: {
    setKeys(keys: DirectusTranslation[]) {
      this.keys = keys
    },

    setFilters(filters: Partial<FilterState>) {
      this.filters = { ...this.filters, ...filters }
    },

    updateSearchValue(searchValue: string) {
      this.filters.searchValue = searchValue
    },

    updateDateRange(dateFrom: string, dateTo: string) {
      this.filters.dateFrom = dateFrom
      this.filters.dateTo = dateTo
    },

    updatePageSize(pageSize: number) {
      this.filters.pageSize = pageSize
    },

    updatePage(page: number) {
      this.filters.page = page
    },

    setMeta(totalCount: number, filterCount: number) {
      this.totalCount = totalCount
      this.filterCount = filterCount
    },

    clearFilters() {
      this.filters = {
        searchValue: '',
        dateFrom: '',
        dateTo: '',
        pageSize: 10,
        page: 1
      }
    },

    async fetchKeys(filters?: Partial<FilterState>) {
      const { fetchTranslationKeys } = useTranslationKeysApi()
      const activeFilters = filters ?? this.filters

      try {
        const response = await fetchTranslationKeys({
          search: activeFilters.searchValue,
          dateFrom: activeFilters.dateFrom,
          dateTo: activeFilters.dateTo,
          page: activeFilters.page,
          pageSize: activeFilters.pageSize
        })
        
        this.setKeys(response.data)
        this.setMeta(
          response.meta?.total_count ?? 0,
          response.meta?.filter_count ?? 0
        )

        return response
      } catch (error) {
        console.error('Failed to fetch translation keys:', error)
        throw error
      }
    }
  }
}) 