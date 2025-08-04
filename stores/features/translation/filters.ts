import { defineStore } from 'pinia'
import type { FilterState } from '~/types/stores/translation'

export const useTranslationFiltersStore = defineStore('translationFilters', {
  state: (): FilterState => ({
    searchValue: '',
    dateFrom: '',
    dateTo: '',
    pageSize: 10,
    page: 1
  }),

  actions: {
    setFilters(filters: Partial<FilterState>) {
      Object.assign(this, filters)
    },

    updateSearchValue(searchValue: string) {
      this.searchValue = searchValue
    },

    updateDateRange(dateFrom: string, dateTo: string) {
      this.dateFrom = dateFrom
      this.dateTo = dateTo
    },

    updatePageSize(pageSize: number) {
      this.pageSize = pageSize
      // Reset to first page when changing page size
      this.page = 1
    },

    updatePage(page: number) {
      this.page = page
    },

    clearFilters() {
      this.searchValue = ''
      this.dateFrom = ''
      this.dateTo = ''
      this.pageSize = 10
      this.page = 1
    }
  }
}) 