import type { TranslationKeysQueryParams, TranslationKeysResponse, ApiError } from '../types'

/**
 * Add search parameter if provided
 */
const addSearchParam = (params: TranslationKeysQueryParams, queryParams: Record<string, string | number>): void => {
  if (params.search) {
    queryParams.search = params.search
  }
}

/**
 * Add date filter parameters if provided
 */
const addDateFilters = (params: TranslationKeysQueryParams, queryParams: Record<string, string | number>): void => {
  if (params.dateFrom) {
    queryParams['filter[updatedAt][_gte]'] = params.dateFrom
  }
  
  if (params.dateTo) {
    queryParams['filter[updatedAt][_lte]'] = params.dateTo
  }
}

/**
 * Add pagination parameters if provided
 */
const addPaginationParams = (params: TranslationKeysQueryParams, queryParams: Record<string, string | number>): void => {
  if (params.page) {
    queryParams.page = params.page
  }
  
  if (params.pageSize) {
    queryParams.limit = params.pageSize
  }
}

/**
 * Build query parameters for the API request
 * @param params - Optional query parameters
 * @returns Object with query parameters
 */
const buildQueryParams = (params?: TranslationKeysQueryParams): Record<string, string | number> => {
  const queryParams: Record<string, string | number> = {}
  
  if (!params) {
    return queryParams
  }
  
  addSearchParam(params, queryParams)
  addDateFilters(params, queryParams)
  addPaginationParams(params, queryParams)

  return queryParams
}

/**
 * Create a standardized API error object
 * @param error - The caught error
 * @returns ApiError object
 */
const createApiError = (error: any): ApiError => ({
  message: error.data?.message || error.message || 'An error occurred while fetching translation keys',
  status: error.statusCode || error.status,
  code: error.code,
})

/**
 * Make the API request using server-side route (development) or direct call (production)
 */
const makeApiRequest = async (queryParams: Record<string, string | number>): Promise<TranslationKeysResponse> => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  if (isDevelopment) {
    // Use server-side proxy in development to avoid CORS issues
    const response = await $fetch<TranslationKeysResponse>('/api/translationKeys', {
      query: queryParams,
    })
    return response
  } else {
    // Use direct API call in production (assuming proper CORS setup)
    const { apiClient } = await import('../client')
    const response = await apiClient.get<TranslationKeysResponse>('/items/translationKeys', {
      params: queryParams,
    })
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
  async fetch(params?: TranslationKeysQueryParams): Promise<TranslationKeysResponse> {
    try {
      const queryParams = buildQueryParams(params)
      return await makeApiRequest(queryParams)
    } catch (error: any) {
      throw createApiError(error)
    }
  }
} 