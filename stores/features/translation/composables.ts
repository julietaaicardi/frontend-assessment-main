import { computed } from 'vue'
import { useTranslationTableStore } from './table'
import { useTranslationFiltersStore } from './filters'
import { useRootStore } from '~/stores'

export const useTranslationCoordination = () => {
  const tableStore = useTranslationTableStore()
  const filtersStore = useTranslationFiltersStore()
  const rootStore = useRootStore()

  // Computed properties that combine data from both stores
  const paginationInfo = computed(() => {
    const totalPages = Math.ceil(tableStore.totalCount / filtersStore.pageSize)
    const startIndex = (filtersStore.page - 1) * filtersStore.pageSize + 1
    const endIndex = Math.min(
      filtersStore.page * filtersStore.pageSize,
      tableStore.totalCount
    )

    return {
      currentPage: filtersStore.page,
      totalPages,
      totalItems: tableStore.totalCount,
      startIndex,
      endIndex,
      hasNext: filtersStore.page < totalPages,
      hasPrevious: filtersStore.page > 1,
    }
  })

  // Actions that coordinate between stores
  const fetchKeys = async () => {
    rootStore.setLoading(true)
    rootStore.clearError()

    try {
      await tableStore.fetchKeys({
        searchValue: filtersStore.searchValue,
        dateFrom: filtersStore.dateFrom,
        dateTo: filtersStore.dateTo,
        page: filtersStore.page,
        pageSize: filtersStore.pageSize,
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch translation keys'
      rootStore.setError(errorMessage)
      throw error
    } finally {
      rootStore.setLoading(false)
    }
  }

  const updateSearchValue = async (searchValue: string) => {
    filtersStore.updateSearchValue(searchValue)
  }

  const updateDateRange = async (dateFrom: string, dateTo: string) => {
    filtersStore.updateDateRange(dateFrom, dateTo)
  }

  const updatePageSize = async (pageSize: number) => {
    filtersStore.updatePageSize(pageSize)
  }

  const updatePage = async (page: number) => {
    filtersStore.updatePage(page)
  }

  return {
    // Store references
    tableStore,
    filtersStore,
    rootStore,

    // Computed properties
    paginationInfo,

    // Actions
    fetchKeys,
    updateSearchValue,
    updateDateRange,
    updatePageSize,
    updatePage,
  }
}
