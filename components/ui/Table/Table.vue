<script lang="ts" setup>
import type { Column, Row, TableProps } from '~/types/ui/table'

interface Props extends TableProps {}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  pagination: false,
  loading: false,
  emptyMessage: 'No data available'
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed paginated data
const paginatedData = computed(() => {
  if (!props.pagination) return props.data
  
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.data.slice(start, end)
})

// Pagination handlers
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const totalPages = computed(() => 
  Math.ceil(props.data.length / itemsPerPage.value)
)

const startIndex = computed(() => 
  (currentPage.value - 1) * itemsPerPage.value + 1
)

const endIndex = computed(() => 
  Math.min(currentPage.value * itemsPerPage.value, props.data.length)
)

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Provide context to child components
provide('tableContext', {
  columns: props.columns,
  data: paginatedData,
  rowKey: props.rowKey,
  loading: props.loading,
  emptyMessage: props.emptyMessage,
  pagination: props.pagination,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems: computed(() => props.data.length),
  handlePrevPage,
  handleNextPage,
  handlePageChange
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