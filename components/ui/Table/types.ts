import type { Column } from '~/types/ui/table'
import type { ComputedRef } from 'vue'

export interface TableContext {
  columns: ComputedRef<Column[]>
  data: ComputedRef<unknown[]>
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
