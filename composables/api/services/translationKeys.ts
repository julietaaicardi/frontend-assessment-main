import type {
  TranslationKeysQueryParams,
  TranslationKeysResponse,
  ApiError,
} from '../types'

/**
 * Add search parameter if provided
 */
const addSearchParam = (
  params: TranslationKeysQueryParams,
  queryParams: Record<string, string | number>
): void => {
  if (params.search && params.search.trim()) {
    queryParams['filter[key][_contains]'] = params.search
  }
}

/**
 * Add date filter parameters if provided
 */
const addDateFilters = (
  params: TranslationKeysQueryParams,
  queryParams: Record<string, string | number>
): void => {
  if (params.dateFrom && params.dateFrom.trim()) {
    queryParams['filter[updatedAt][_gte]'] = params.dateFrom
  }

  if (params.dateTo && params.dateTo.trim()) {
    queryParams['filter[updatedAt][_lte]'] = params.dateTo
  }
}

/**
 * Add pagination parameters (always included with defaults)
 */
const addPaginationParams = (
  params: TranslationKeysQueryParams,
  queryParams: Record<string, string | number>
): void => {
  queryParams.page = params.page!
  queryParams.limit = params.pageSize!
  queryParams.meta = 'filter_count'
}

/**
 * Add fields parameter to specify which fields to retrieve
 */
const addFieldsParam = (queryParams: Record<string, string | number>): void => {
  queryParams.fields =
    'key,createdAt,updatedAt,translations.value,translations.languages_code'
}

/**
 * Default parameters for translation keys API
 */
const DEFAULT_PARAMS: Required<TranslationKeysQueryParams> = {
  search: '',
  dateFrom: '',
  dateTo: '',
  page: 1,
  pageSize: 10,
}

/**
 * Build query parameters for the API request with defaults
 * @param params - Optional query parameters
 * @returns Object with query parameters including defaults
 */
const buildQueryParams = (
  params?: TranslationKeysQueryParams
): Record<string, string | number> => {
  const queryParams: Record<string, string | number> = {}

  // Merge with defaults
  const mergedParams = { ...DEFAULT_PARAMS, ...params }

  addSearchParam(mergedParams, queryParams)
  addDateFilters(mergedParams, queryParams)
  addPaginationParams(mergedParams, queryParams)
  addFieldsParam(queryParams)

  return queryParams
}

/**
 * Create a standardized API error object
 * @param error - The caught error
 * @returns ApiError object
 */
const createApiError = (error: unknown): ApiError => ({
  message:
    (error as any)?.data?.message ||
    (error as any)?.message ||
    'An error occurred while fetching translation keys',
  status: (error as any)?.statusCode || (error as any)?.status,
  code: (error as any)?.code,
})

/**
 * Make the API request using server-side route (development) or direct call (production)
 */
const makeApiRequest = async (
  queryParams: Record<string, string | number>
): Promise<TranslationKeysResponse> => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  if (isDevelopment) {
    // Use server-side proxy in development to avoid CORS issues
    const response = await $fetch<TranslationKeysResponse>(
      '/api/translationKeys',
      {
        query: queryParams,
      }
    )
    return response
  } else {
    // Use direct API call in production (assuming proper CORS setup)
    const { apiClient } = await import('../client')
    const response = await apiClient.get<TranslationKeysResponse>(
      '/items/translationKeys',
      {
        params: queryParams,
      }
    )
    return response.data
  }
}

/**
 * Translation keys service - pure API logic
 */
export const translationKeysService = {
  /**
   * Fetch translation keys with optional filtering and pagination
   * @param params - Optional query parameters for filtering and pagination
   * @returns Promise with typed response data
   * @throws ApiError if the request fails
   */
  async fetch(
    params?: TranslationKeysQueryParams
  ): Promise<TranslationKeysResponse> {
    try {
      const queryParams = buildQueryParams(params)
      const response = await makeApiRequest(queryParams)
      return response
    } catch (error: unknown) {
      throw createApiError(error)
    }
  },
}
