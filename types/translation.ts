export interface TranslationKey {
  key: string
  translation: string
  updatedAt: string
}

export interface DirectusTranslationKey {
  key: string
  createdAt: string
  updatedAt: string | null
  variables: readonly string[] | null
  translations: readonly number[]
}

export interface TranslationKeysResponse {
  data: DirectusTranslationKey[]
  meta?: {
    total_count?: number
    filter_count?: number
  }
}

export interface PaginationState {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
}

export interface FilterState {
  searchValue: string
  dateFrom: string
  dateTo: string
  pageSize: number
} 