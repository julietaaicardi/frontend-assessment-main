<script lang="ts" setup>
import type { TranslationKey, Column } from '~/types'
import { useTranslationCoordination } from '~/stores'
import { formatRelativeTime } from '~/utils/date'
import { formatTranslationWithFlag } from '~/utils/language'
import TranslationTooltip from '~/components/features/translation/TranslationTooltip.vue'

const { tableStore, paginationInfo, updatePage } = useTranslationCoordination()

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
  tableStore.keys.map((item: any) => {
    const firstTranslation = item.translations?.length > 0 ? item.translations[0] : null
    return {
      key: item.key,
      translation: firstTranslation ? formatTranslationWithFlag(firstTranslation.value, firstTranslation.languages_code) : '-',
      updatedAt: formatRelativeTime(item.updatedAt || item.createdAt),
      // Store the original item for tooltip
      originalItem: item
    }
  })
)

const handlePrevPage = () => {
  if (paginationInfo.value.hasPrevious) {
    updatePage(paginationInfo.value.currentPage - 1)
  }
}

const handleNextPage = () => {
  if (paginationInfo.value.hasNext) {
    updatePage(paginationInfo.value.currentPage + 1)
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
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.key-text {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: vars.$font-size-sm;
  color: vars.$color-text-primary;
  @include mix.text-truncate;
  display: block;
}

.translation-value {
  color: vars.$color-text-primary;
  font-size: vars.$font-size-sm;
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

// Ensure tooltip trigger doesn't interfere with truncation
:deep(.tooltip-trigger) {
  display: block;
  width: 100%;
  overflow: hidden;
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