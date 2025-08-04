import type { Column } from '~/types/ui/table'

export interface TableContext {
  columns: ComputedRef<Column[]>
  data: ComputedRef<any[]>
  rowKey: string
  loading: boolean
  emptyMessage: string
  pagination: boolean
  currentPage: ComputedRef<number>
  totalPages: ComputedRef<number>
  startIndex: ComputedRef<number>
  endIndex: ComputedRef<number>
  totalItems: ComputedRef<number>
  hasNext: ComputedRef<boolean>
  hasPrevious: ComputedRef<boolean>
  handlePrevPage: () => void
  handleNextPage: () => void
  handlePageChange: () => void
} 