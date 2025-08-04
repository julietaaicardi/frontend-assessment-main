<script lang="ts" setup>
import type { Column } from '~/types'
import TranslationTooltip from '~/views/translation/components/TranslationTooltip.vue'

interface PaginationInfo {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
  hasNext: boolean
  hasPrevious: boolean
}

interface Props {
  columns: Column[]
  data: any[]
  pagination?: boolean
  paginationInfo?: PaginationInfo
}

const props = withDefaults(defineProps<Props>(), {
  pagination: false,
})

const emit = defineEmits<{
  prevPage: []
  nextPage: []
}>()

const handlePrevPage = () => {
  emit('prevPage')
}

const handleNextPage = () => {
  emit('nextPage')
}
</script>

<template>
  <Table
    :columns="columns"
    :data="data"
    row-key="key"
    :pagination="pagination"
    :external-pagination="
      paginationInfo
        ? {
            currentPage: paginationInfo.currentPage,
            totalPages: paginationInfo.totalPages,
            startIndex: paginationInfo.startIndex,
            endIndex: paginationInfo.endIndex,
            totalItems: paginationInfo.totalItems,
            hasNext: paginationInfo.hasNext,
            hasPrevious: paginationInfo.hasPrevious,
            handlePrevPage,
            handleNextPage,
          }
        : undefined
    "
  >
    <table class="data-table" role="table">
      <TableHeader />
      <TableBody>
        <!-- Business-specific cell rendering -->
        <template #cell-key="{ value }">
          <span class="key-text">{{ value }}</span>
        </template>

        <template #cell-translation="{ value, row }">
          <TranslationTooltip
            :translation="row.originalItem"
            position="bottom"
            width="md"
          >
            <template #trigger>
              <span class="translation-value">{{ value }}</span>
            </template>
          </TranslationTooltip>
        </template>

        <template #cell-updatedAt="{ value }">
          <span class="date-text">{{ value }}</span>
        </template>
      </TableBody>
    </table>
    <TablePagination />
  </Table>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.key-text {
  font-family:
    'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New',
    monospace;
  font-size: $font-size-sm;
  color: $color-text-primary;
  @include mix.text-truncate;
  display: block;
}

.translation-value {
  color: $color-text-primary;
  font-size: $font-size-sm;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
  max-width: 100%;
}

// Ensure table cells can truncate text
:deep(.table-cell) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Ensure overlay trigger doesn't interfere with truncation
:deep(.overlay-trigger) {
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: pointer; // Add cursor to indicate it's interactive
}

.date-text {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  display: block;
}

// Ensure table takes full width
:deep(.data-table) {
  width: 100%;
  table-layout: fixed;
}
</style>
