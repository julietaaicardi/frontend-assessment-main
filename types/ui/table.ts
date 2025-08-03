/**
 * UI table component types
 */

/**
 * Table column definition
 */
export interface Column {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  formatter?: (value: any) => string
}

/**
 * Table row data structure
 */
export interface Row {
  [key: string]: any
}

/**
 * Table component props
 */
export interface TableProps {
  columns: Column[]
  data: Row[]
  rowKey?: string
  pagination?: boolean
  loading?: boolean
  emptyMessage?: string
}

/**
 * Table context for child components
 */
export interface TableContext {
  columns: Column[]
  data: Row[]
  rowKey: string
  loading: boolean
  emptyMessage: string
  pagination: boolean
  currentPage: Ref<number>
  totalPages: ComputedRef<number>
  startIndex: ComputedRef<number>
  endIndex: ComputedRef<number>
  totalItems: ComputedRef<number>
  handlePrevPage: () => void
  handleNextPage: () => void
  handlePageChange: (page: number) => void
} 