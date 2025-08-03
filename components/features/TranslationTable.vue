<script lang="ts" setup>
import type { TranslationKey, Column } from '~/types'
import { useTranslationStore } from '~/stores'
import { formatRelativeTime } from '~/utils/date'

const translationStore = useTranslationStore()

interface Props {
  pagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pagination: false
})

// Business-specific column definitions
const translationColumns: Column[] = [
  {
    key: 'key',
    label: 'Key',
    align: 'left'
  },
  {
    key: 'translation',
    label: 'Translation', 
    align: 'left'
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    align: 'right'
  }
]

// Business-specific data mapping from store
const tableData = computed(() => 
  translationStore.keys.map((item: any) => ({
    key: item.key,
    translation: item.translations?.length > 0 ? item.translations[0].value : '-',
    updatedAt: formatRelativeTime(item.updatedAt || item.createdAt)
  }))
)

// Use store pagination getters
const paginationInfo = computed(() => translationStore.paginationInfo)

const handlePrevPage = () => {
  if (translationStore.hasPreviousPage) {
    translationStore.updatePage(translationStore.filters.page - 1)
    translationStore.fetchKeys()
  }
}

const handleNextPage = () => {
  if (translationStore.hasNextPage) {
    translationStore.updatePage(translationStore.filters.page + 1)
    translationStore.fetchKeys()
  }
}
</script>

<template>
  <Table 
    :columns="translationColumns"
    :data="tableData"
    row-key="key"
    :pagination="pagination"
    :external-pagination="{
      currentPage: paginationInfo.currentPage,
      totalPages: paginationInfo.totalPages,
      startIndex: paginationInfo.start,
      endIndex: paginationInfo.end,
      totalItems: paginationInfo.totalItems,
      hasNext: paginationInfo.hasNext,
      hasPrevious: paginationInfo.hasPrevious,
      handlePrevPage,
      handleNextPage
    }"
  >
    <table class="data-table" role="table">
      <TableHeader />
      <TableBody>
        <!-- Business-specific cell rendering -->
        <template #cell-key="{ value }">
          <span class="key-text">{{ value }}</span>
        </template>
        
        <template #cell-translation="{ value }">
          <div class="translation-content">
            <span class="translation-value">{{ value }}</span>
          </div>
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
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.key-text {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: vars.$font-size-sm;
  color: vars.$color-text-primary;
  @include mix.text-truncate;
  display: block;
}

.translation-content {
  width: 100%;
  overflow: hidden;
  
  .translation-value {
    color: vars.$color-text-primary;
    font-size: vars.$font-size-sm;
    font-weight: 500;
    @include mix.text-truncate;
    display: block;
    width: 100%;
    max-width: 100%;
  }
}

// Ensure table cells can truncate text
:deep(.table-cell) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.date-text {
  font-size: vars.$font-size-sm;
  color: vars.$color-text-secondary;
  display: block;
}

// Ensure table takes full width
:deep(.data-table) {
  width: 100%;
  table-layout: fixed;
}
</style> 