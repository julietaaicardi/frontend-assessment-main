/**
 * API response types for translation endpoints
 */

import type { DirectusTranslation } from '~/types/domain/translation'

/**
 * Response structure for translation keys API
 */
export interface TranslationKeysResponse {
  data: DirectusTranslation[]
  meta?: {
    total_count?: number
    filter_count?: number
  }
}
