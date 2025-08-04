import { defineStore } from 'pinia'
import type { FilterState } from '~/types/stores/translation'
import type { DirectusTranslation } from '~/types/domain/translation'
import { useTranslationKeysApi } from '~/composables/useTranslationKeysApi'

export interface TranslationTableState {
  keys: DirectusTranslation[]
  totalCount: number
}

export const useTranslationTableStore = defineStore('translationTable', {
  state: (): TranslationTableState => ({
    keys: [],
    totalCount: 0,
  }),

  getters: {
    isEmpty: state => state.keys.length === 0,
  },

  actions: {
    setKeys(keys: DirectusTranslation[]) {
      this.keys = keys
    },

    setMeta(totalCount: number) {
      this.totalCount = totalCount
    },

    async fetchKeys(filters: FilterState) {
      const { fetchTranslationKeys } = useTranslationKeysApi()

      try {
        const response = await fetchTranslationKeys({
          search: filters.searchValue,
          dateFrom: filters.dateFrom,
          dateTo: filters.dateTo,
          page: filters.page,
          pageSize: filters.pageSize,
        })

        this.setKeys(response.data)
        this.setMeta(response.meta?.filter_count ?? 0)

        return response
      } catch (error) {
        console.error('Failed to fetch translation keys:', error)
        throw error
      }
    },
  },
})
