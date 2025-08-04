/**
 * API request types for translation endpoints
 */

/**
 * Query parameters for translation keys API
 */
export interface TranslationKeysQueryParams {
  search?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  pageSize?: number
}
