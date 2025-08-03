import { ref, readonly } from 'vue'
import { translationKeysService } from './api/services/translationKeys'
import type { TranslationKeysQueryParams, TranslationKeysResponse, ApiError } from './api/types'

/**
 * Composable for fetching translation keys from the API
 * Handles UI state (loading, data, error) and calls the service layer
 * @returns Object with fetchTranslationKeys method and reactive state
 */
export const useTranslationKeysApi = () => {
  const loading = ref(false)
  const data = ref<TranslationKeysResponse | null>(null)
  const error = ref<ApiError | null>(null)

  /**
   * Fetch translation keys with optional filtering and pagination
   * @param params - Optional query parameters for filtering and pagination
   * @returns Promise with typed response data
   * @throws ApiError if the request fails
   */
  const fetchTranslationKeys = async (
    params?: TranslationKeysQueryParams
  ): Promise<TranslationKeysResponse> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await translationKeysService.fetch(params)
      data.value = response
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    fetchTranslationKeys,
    loading: readonly(loading),
    data: readonly(data),
    error: readonly(error),
  }
} 