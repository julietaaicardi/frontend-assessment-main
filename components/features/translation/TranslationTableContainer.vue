<script lang="ts" setup>
import type { Column } from '~/types'
import { useTranslationCoordination } from '~/stores'
import { formatRelativeTime } from '~/utils/date'
import { formatTranslationWithFlag } from '~/utils/language'
import TranslationTable from './TranslationTable.vue'

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
  <TranslationTable
    :columns="translationColumns"
    :data="tableData"
    :pagination="pagination"
    :pagination-info="paginationInfo"
    @prev-page="handlePrevPage"
    @next-page="handleNextPage"
  />
</template> 