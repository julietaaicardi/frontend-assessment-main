export interface TranslationKey {
  key: string
  translation: string
  updatedAt: string
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