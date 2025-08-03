import type { DirectusTranslationKey } from '~/types/translation'

// Types for query parameters
export interface TranslationKeysQueryParams {
  search?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  pageSize?: number
}

// Types for API response
export interface TranslationKeysResponse {
  data: DirectusTranslationKey[]
  meta?: {
    total_count?: number
    filter_count?: number
  }
}

// Types for errors
export interface ApiError {
  message: string
  status?: number
  code?: string
} 