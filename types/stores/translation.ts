/**
 * Shared store types for translation functionality
 */

/**
 * Filter state for translation search
 */
export interface FilterState {
  searchValue: string
  dateFrom: string
  dateTo: string
  pageSize: number
  page: number
} 