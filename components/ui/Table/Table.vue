<script lang="ts" setup>
import type { Column, Row, TableProps } from '~/types/ui/table'

interface Props extends TableProps {
  externalPagination?: {
    currentPage: number
    totalPages: number
    startIndex: number
    endIndex: number
    totalItems: number
    hasNext: boolean
    hasPrevious: boolean
    handlePrevPage: () => void
    handleNextPage: () => void
  }
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  pagination: false,
  loading: false,
  emptyMessage: 'No data available',
  externalPagination: undefined
})

// Use external pagination if provided, otherwise use local state
const currentPage = computed(() => 
  props.externalPagination?.currentPage ?? 1
)

const totalPages = computed(() => 
  props.externalPagination?.totalPages ?? Math.ceil(props.data.length / 10)
)

const startIndex = computed(() => 
  props.externalPagination?.startIndex ?? ((currentPage.value - 1) * 10 + 1)
)

const endIndex = computed(() => 
  props.externalPagination?.endIndex ?? Math.min(currentPage.value * 10, props.data.length)
)

const totalItems = computed(() => 
  props.externalPagination?.totalItems ?? props.data.length
)

const hasNext = computed(() => 
  props.externalPagination?.hasNext ?? (currentPage.value < totalPages.value)
)

const hasPrevious = computed(() => 
  props.externalPagination?.hasPrevious ?? (currentPage.value > 1)
)

const handlePrevPage = () => {
  if (props.externalPagination) {
    props.externalPagination.handlePrevPage()
  }
}

const handleNextPage = () => {
  if (props.externalPagination) {
    props.externalPagination.handleNextPage()
  }
}

// Calculate column widths based on number of columns
const columnsWithWidth = computed(() => {
  const columnCount = props.columns.length
  const widthPercentage = `${100 / columnCount}%`
  
  return props.columns.map(column => ({
    ...column,
    width: widthPercentage
  }))
})

// Provide context to child components
provide('tableContext', {
  columns: columnsWithWidth,
  data: computed(() => props.data),
  rowKey: props.rowKey,
  loading: props.loading,
  emptyMessage: props.emptyMessage,
  pagination: props.pagination,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  hasNext,
  hasPrevious,
  handlePrevPage,
  handleNextPage,
  handlePageChange: () => {} // Placeholder for external pagination
})
</script>

<template>
  <div class="table-wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;

.table-wrapper {
  background-color: vars.$color-background;
  border: 1px solid vars.$color-border;
  border-radius: vars.$border-radius-lg;
  overflow: hidden;
  box-shadow: vars.$shadow-sm;
  width: 100%;
  
  :deep(.data-table) {
    width: 100%;
    border-collapse: collapse;
  }
}
</style> 